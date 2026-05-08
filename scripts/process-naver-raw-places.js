#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const RAW_DIR = path.join(ROOT_DIR, 'imports', 'naver', 'raw');
const OUT_FILE = path.join(ROOT_DIR, 'data', 'places', 'processed', 'miro_places.json');

const PLACE_SIGNAL_KEYS = new Set(['name', 'sid', 'bookmarkId', 'px', 'py', 'address']);
const PLACE_OBJECT_PATH_PATTERN = /(^|\.)(bookmark|bookmarks|place|places|placeInfo)$/i;

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJsonFile(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function hasPlaceSignal(value) {
  return isPlainObject(value) && Array.from(PLACE_SIGNAL_KEYS).some(key => {
    const fieldValue = value[key];
    return fieldValue !== undefined && fieldValue !== null && String(fieldValue).trim() !== '';
  });
}

function isPlaceObjectPath(pathName) {
  return !pathName || PLACE_OBJECT_PATH_PATTERN.test(pathName);
}

function collectRecords(value, options = {}) {
  const {
    pathName = '',
    records = [],
    skipped = [],
    allowSingleObject = true,
    fileName = '',
  } = options;

  if (Array.isArray(value)) {
    const objectItems = value
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => isPlainObject(item));
    const placeItems = objectItems.filter(({ item }) => hasPlaceSignal(item));

    if (placeItems.length > 0) {
      placeItems.forEach(({ item, index }) => {
        records.push({
          raw: item,
          index,
          pathName: pathName || '<root>',
        });
      });

      objectItems
        .filter(({ item }) => !hasPlaceSignal(item))
        .forEach(({ index }) => {
          skipped.push({
            sourceFile: fileName,
            pathName: pathName || '<root>',
            index,
            reason: 'Object in place-like array has no place signal fields',
          });
        });
      return { records, skipped };
    }

    objectItems.forEach(({ item, index }) => {
      collectRecords(item, {
        pathName: `${pathName || '<root>'}[${index}]`,
        records,
        skipped,
        allowSingleObject: false,
        fileName,
      });
    });

    return { records, skipped };
  }

  if (!isPlainObject(value)) {
    if (allowSingleObject) {
      skipped.push({
        sourceFile: fileName,
        pathName: pathName || '<root>',
        index: null,
        reason: 'Top-level JSON value is not an object or array',
      });
    }
    return { records, skipped };
  }

  let recordCountBeforeChildren = records.length;
  Object.entries(value).forEach(([key, child]) => {
    collectRecords(child, {
      pathName: pathName ? `${pathName}.${key}` : key,
      records,
      skipped,
      allowSingleObject: false,
      fileName,
    });
  });

  if (
    records.length === recordCountBeforeChildren &&
    allowSingleObject &&
    isPlaceObjectPath(pathName) &&
    hasPlaceSignal(value)
  ) {
    records.push({
      raw: value,
      index: 0,
      pathName: pathName || '<root>',
    });
  }

  return { records, skipped };
}

function stringValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function numberOrNull(value) {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function booleanOrNull(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') {
    if (value === 1) return true;
    if (value === 0) return false;
  }
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }
  return null;
}

function firstString(...values) {
  for (const value of values) {
    const normalized = stringValue(value);
    if (normalized) return normalized;
  }
  return '';
}

function toMiroPlace(record, sourceFile, fallbackIndex) {
  const raw = record.raw;
  const id = firstString(raw.bookmarkId) || `${sourceFile}:${fallbackIndex}`;
  const placeId = firstString(raw.sid, raw.placeId);
  const name = firstString(raw.name, raw.displayName, raw.title);
  const lng = numberOrNull(raw.px !== undefined ? raw.px : firstString(raw.lng, raw.lon, raw.longitude));
  const lat = numberOrNull(raw.py !== undefined ? raw.py : firstString(raw.lat, raw.latitude));
  const address = firstString(raw.address, raw.roadAddress, raw.fullAddress);
  const categoryCode = firstString(raw.mcid);
  const categoryName = firstString(raw.mcidName, raw.category, raw.categoryName);
  const type = firstString(raw.type) || 'place';

  return {
    id,
    source: 'naver',
    sourceFile,
    placeId,
    name,
    lat,
    lng,
    address,
    categoryCode,
    categoryName,
    type,
    available: hasOwn(raw, 'available') ? booleanOrNull(raw.available) : null,
    isMatched: isPlainObject(raw.bookmarkMismatchInfo) && hasOwn(raw.bookmarkMismatchInfo, 'isMatched')
      ? booleanOrNull(raw.bookmarkMismatchInfo.isMatched)
      : null,
    raw,
  };
}

function main() {
  if (!fs.existsSync(RAW_DIR)) {
    throw new Error(`Raw input directory does not exist: ${path.relative(ROOT_DIR, RAW_DIR)}`);
  }

  const rawFiles = fs.readdirSync(RAW_DIR)
    .filter(fileName => fileName.toLowerCase().endsWith('.json'))
    .sort((a, b) => a.localeCompare(b));

  const places = [];
  const skipped = [];

  console.log(`Raw files read: ${rawFiles.length}`);

  rawFiles.forEach(fileName => {
    const rawPath = path.join(RAW_DIR, fileName);
    let parsed;

    try {
      parsed = readJsonFile(rawPath);
    } catch (error) {
      skipped.push({
        sourceFile: fileName,
        pathName: '<root>',
        index: null,
        reason: `Unable to parse JSON: ${error.message}`,
      });
      console.log(`${fileName}: 0 raw records found`);
      return;
    }

    const result = collectRecords(parsed, { fileName });
    const filePlaces = result.records.map((record, index) => toMiroPlace(record, fileName, index));
    places.push(...filePlaces);
    skipped.push(...result.skipped);

    console.log(`${fileName}: ${filePlaces.length} raw records found`);
  });

  writeJsonFile(OUT_FILE, places);

  console.log(`Total processed places written: ${places.length}`);
  console.log(`Records skipped: ${skipped.length}`);
  skipped.forEach(item => {
    const index = item.index === null ? '' : `[${item.index}]`;
    console.log(`Skipped ${item.sourceFile}:${item.pathName}${index} - ${item.reason}`);
  });
  console.log(`Output written: ${path.relative(ROOT_DIR, OUT_FILE)}`);
}

main();
