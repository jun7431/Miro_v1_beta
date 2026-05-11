#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const RAW_DIR = path.join(ROOT_DIR, 'imports', 'naver', 'raw');
const PROCESSED_OUT_FILE = path.join(ROOT_DIR, 'data', 'places', 'processed', 'miro_places.json');
const APP_OUT_FILE = path.join(ROOT_DIR, 'v2-refined-main-app', 'data', 'miro_places.json');
const REPORT_FILE = path.join(ROOT_DIR, 'imports', 'naver', 'processed', 'import-report.json');

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

function arrayOrNull(value) {
  return Array.isArray(value) ? value : null;
}

function getBookmarkRecords(parsed, fileName, skipped) {
  if (Array.isArray(parsed?.bookmarkList)) {
    return parsed.bookmarkList
      .map((item, index) => {
        if (!isPlainObject(item)) {
          skipped.push({
            sourceFile: fileName,
            pathName: 'bookmarkList',
            index,
            reason: 'Bookmark item is not an object',
          });
          return null;
        }

        return {
          raw: item,
          index,
          pathName: 'bookmarkList',
        };
      })
      .filter(Boolean);
  }

  const result = collectRecords(parsed, { fileName });
  skipped.push(...result.skipped);
  return result.records;
}

function summarizeRawRecords(fileName, records) {
  const summary = {
    sourceFile: fileName,
    bookmarkListItems: records.length,
    placeItems: 0,
    availableTrue: 0,
    availableFalse: 0,
    availableMissing: 0,
    matched: 0,
    unmatched: 0,
    matchInfoMissing: 0,
  };

  records.forEach(record => {
    const raw = record.raw;
    if (raw.type === 'place') summary.placeItems += 1;

    if (raw.available === true) summary.availableTrue += 1;
    else if (raw.available === false) summary.availableFalse += 1;
    else summary.availableMissing += 1;

    if (
      isPlainObject(raw.bookmarkMismatchInfo) &&
      typeof raw.bookmarkMismatchInfo.isMatched === 'boolean'
    ) {
      if (raw.bookmarkMismatchInfo.isMatched) summary.matched += 1;
      else summary.unmatched += 1;
    } else {
      summary.matchInfoMissing += 1;
    }
  });

  return summary;
}

function sourceRecordSummary(record, sourceFile) {
  const raw = record.raw;
  return {
    sourceFile,
    pathName: record.pathName,
    index: record.index,
    bookmarkId: firstString(raw.bookmarkId),
    sid: firstString(raw.sid, raw.placeId),
    name: firstString(raw.name, raw.displayName, raw.title),
    available: hasOwn(raw, 'available') ? booleanOrNull(raw.available) : null,
    isMatched: isPlainObject(raw.bookmarkMismatchInfo) && hasOwn(raw.bookmarkMismatchInfo, 'isMatched')
      ? booleanOrNull(raw.bookmarkMismatchInfo.isMatched)
      : null,
  };
}

function toMiroPlace(record, sourceFile, fallbackIndex) {
  const raw = record.raw;
  const bookmarkId = firstString(raw.bookmarkId);
  const id = bookmarkId || `${sourceFile}:${fallbackIndex}`;
  const sid = firstString(raw.sid, raw.placeId);
  const name = firstString(raw.name, raw.displayName, raw.title);
  const displayName = firstString(raw.displayName);
  const lng = numberOrNull(raw.px !== undefined ? raw.px : firstString(raw.lng, raw.lon, raw.longitude));
  const lat = numberOrNull(raw.py !== undefined ? raw.py : firstString(raw.lat, raw.latitude));
  const address = firstString(raw.address, raw.roadAddress, raw.fullAddress);
  const categoryCode = firstString(raw.mcid);
  const categoryName = firstString(raw.mcidName, raw.category, raw.categoryName);
  const type = firstString(raw.type) || 'place';
  const mismatchDetails = isPlainObject(raw.bookmarkMismatchInfo)
    ? arrayOrNull(raw.bookmarkMismatchInfo.details)
    : null;
  const sourceRecord = sourceRecordSummary(record, sourceFile);

  return {
    id,
    bookmarkId,
    source: 'naver_bookmark',
    sourceFile,
    sourceFiles: [sourceFile],
    sourceRecords: [sourceRecord],
    placeId: sid,
    sid,
    name,
    displayName,
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
    mismatchDetails,
    raw,
  };
}

function normalizeDedupeText(value) {
  return stringValue(value).toLowerCase().replace(/\s+/g, '');
}

function makeDedupeKey(place) {
  if (place.sid) return `sid:${place.sid}`;
  if (place.bookmarkId) return `bookmark:${place.bookmarkId}`;

  if (place.name && Number.isFinite(place.lat) && Number.isFinite(place.lng)) {
    return `name-coords:${normalizeDedupeText(place.name)}:${place.lat.toFixed(6)},${place.lng.toFixed(6)}`;
  }

  return `source:${place.sourceFile}:${place.sourceRecords?.[0]?.index ?? place.id}`;
}

function mergeDuplicatePlace(existing, duplicate, dedupeKey) {
  existing.sourceFiles = Array.from(new Set([
    ...(existing.sourceFiles || [existing.sourceFile].filter(Boolean)),
    ...(duplicate.sourceFiles || [duplicate.sourceFile].filter(Boolean)),
  ]));
  existing.sourceRecords = [
    ...(existing.sourceRecords || []),
    ...(duplicate.sourceRecords || []),
  ];
  existing.rawDuplicates = [
    ...(existing.rawDuplicates || []),
    duplicate.raw,
  ];
  existing.duplicateCount = (existing.sourceRecords.length || 1) - 1;
  existing.duplicateDedupeKey = dedupeKey;
}

function dedupePlaces(places) {
  const byKey = new Map();
  const duplicates = [];

  places.forEach(place => {
    const dedupeKey = makeDedupeKey(place);
    const existing = byKey.get(dedupeKey);

    if (!existing) {
      byKey.set(dedupeKey, place);
      return;
    }

    duplicates.push({
      dedupeKey,
      kept: sourceRecordSummary({ raw: existing.raw, index: existing.sourceRecords?.[0]?.index, pathName: 'bookmarkList' }, existing.sourceFile),
      merged: duplicateSummary(place),
    });
    mergeDuplicatePlace(existing, place, dedupeKey);
  });

  return {
    places: Array.from(byKey.values()),
    duplicates,
  };
}

function duplicateSummary(place) {
  return {
    sourceFile: place.sourceFile,
    bookmarkId: place.id,
    sid: place.sid,
    name: place.name,
  };
}

function countByReason(items) {
  return items.reduce((counts, item) => {
    counts[item.reason] = (counts[item.reason] || 0) + 1;
    return counts;
  }, {});
}

function summarizeProcessedPlaces(places) {
  return {
    processedPlaces: places.length,
    processedTypePlaceItems: places.filter(place => place.type === 'place').length,
    withSid: places.filter(place => place.sid || place.placeId).length,
    withCoordinates: places.filter(place => Number.isFinite(place.lat) && Number.isFinite(place.lng)).length,
    withName: places.filter(place => place.name).length,
    rawPreserved: places.filter(place => isPlainObject(place.raw)).length,
    availableTrue: places.filter(place => place.available === true).length,
    availableFalse: places.filter(place => place.available === false).length,
    availableMissing: places.filter(place => place.available === null).length,
    matched: places.filter(place => place.isMatched === true).length,
    unmatched: places.filter(place => place.isMatched === false).length,
    matchInfoMissing: places.filter(place => place.isMatched === null).length,
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
  const fileSummaries = [];

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

    const records = getBookmarkRecords(parsed, fileName, skipped);
    const filePlaces = records.map((record, index) => toMiroPlace(record, fileName, index));
    places.push(...filePlaces);
    fileSummaries.push(summarizeRawRecords(fileName, records));

    console.log(`${fileName}: ${filePlaces.length} bookmark records found`);
  });

  const deduped = dedupePlaces(places);
  const processedPlaces = deduped.places;
  const rawBookmarkCount = fileSummaries.reduce((sum, item) => sum + item.bookmarkListItems, 0);
  const duplicateMergedCount = deduped.duplicates.length;
  const skippedCount = skipped.length;
  const invariant = {
    expression: 'rawBookmarkListCount = processedUniqueCount + duplicateMergedCount + skippedCount',
    rawBookmarkListCount: rawBookmarkCount,
    processedUniqueCount: processedPlaces.length,
    duplicateMergedCount,
    skippedCount,
    reconciled: rawBookmarkCount === processedPlaces.length + duplicateMergedCount + skippedCount,
  };

  if (!invariant.reconciled) {
    throw new Error(
      `Processed count does not reconcile: ${rawBookmarkCount} raw != ` +
      `${processedPlaces.length} processed + ${duplicateMergedCount} duplicates + ${skippedCount} skipped`
    );
  }

  writeJsonFile(PROCESSED_OUT_FILE, processedPlaces);
  writeJsonFile(APP_OUT_FILE, processedPlaces);

  const report = {
    generatedAt: new Date().toISOString(),
    rawDir: path.relative(ROOT_DIR, RAW_DIR),
    outputFiles: [
      path.relative(ROOT_DIR, PROCESSED_OUT_FILE),
      path.relative(ROOT_DIR, APP_OUT_FILE),
    ],
    fileSummaries,
    summary: {
      rawFilesRead: rawFiles.length,
      totalRawBookmarkListCount: rawBookmarkCount,
      totalRawPlaceItems: fileSummaries.reduce((sum, item) => sum + item.placeItems, 0),
      ...summarizeProcessedPlaces(processedPlaces),
      duplicateMergedCount,
      skippedCount,
      skippedReasons: countByReason(skipped),
      invariant,
    },
    duplicates: deduped.duplicates,
    skipped,
    notes: [
      'Original raw bookmark objects are preserved under raw.',
      'Duplicate raw objects merged into an existing place are preserved under rawDuplicates.',
      'Rating and review fields are not fabricated; they appear only if present in raw data.',
    ],
  };
  writeJsonFile(REPORT_FILE, report);

  console.log(`Total raw bookmark records: ${rawBookmarkCount}`);
  console.log(`Total processed unique places written: ${processedPlaces.length}`);
  console.log(`Duplicate records merged: ${duplicateMergedCount}`);
  console.log(`Records skipped: ${skippedCount}`);
  skipped.forEach(item => {
    const index = item.index === null ? '' : `[${item.index}]`;
    console.log(`Skipped ${item.sourceFile}:${item.pathName}${index} - ${item.reason}`);
  });
  console.log(`Output written: ${path.relative(ROOT_DIR, PROCESSED_OUT_FILE)}`);
  console.log(`Output written: ${path.relative(ROOT_DIR, APP_OUT_FILE)}`);
  console.log(`Report written: ${path.relative(ROOT_DIR, REPORT_FILE)}`);
}

main();
