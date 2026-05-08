#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MIRO_CATEGORIES = new Set([
  'eat',
  'cafe',
  'see',
  'walk',
  'shop',
  'activity',
  'night',
  'practical',
  'unknown',
]);

const SENSITIVE_KEYS = new Set([
  'accountId',
  'accountIds',
  'auth',
  'authorization',
  'cookie',
  'cookies',
  'encryptedUserIdNo',
  'headers',
  'idNo',
  'imageUrl',
  'nick',
  'placeUserProfile',
  'profileImageUrl',
  'reviewPageUrl',
  'shareId',
  'token',
  'userIdNo',
]);

function parseArgs(argv) {
  const options = {
    input: '',
    out: 'v2-refined-main-app/data/curatedPlaces.json',
    merge: false,
    sourcePriority: undefined,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--merge') {
      options.merge = true;
    } else if (arg === '--input') {
      options.input = argv[++i] || '';
    } else if (arg === '--out') {
      options.out = argv[++i] || '';
    } else if (arg === '--source-priority') {
      const rawValue = argv[++i];
      const value = Number(rawValue);
      if (!Number.isFinite(value)) {
        throw new Error(`Invalid --source-priority value: ${rawValue}`);
      }
      options.sourcePriority = value;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/import-naver-bookmarks.js --input imports/naver/raw/list.json --out v2-refined-main-app/data/curatedPlaces.json --merge',
    '  node scripts/import-naver-bookmarks.js --input imports/naver/raw/list.json --out v2-refined-main-app/data/curatedPlaces.json --source-priority 4 --merge',
  ].join('\n');
}

function readJsonFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(text);
}

function writeJsonFile(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(`${filePath}.tmp`, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(`${filePath}.tmp`, filePath);
}

function stringValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function optionalString(value) {
  const normalized = stringValue(value);
  return normalized ? normalized : undefined;
}

function numberValue(value) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : undefined;
}

function booleanValue(value) {
  return typeof value === 'boolean' ? value : false;
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) return undefined;
  const result = value
    .flatMap(item => String(item || '').split(','))
    .map(item => item.trim())
    .filter(Boolean);
  return result.length ? result : undefined;
}

function normalizeThumbnailUrls(value) {
  const urls = normalizeStringArray(value);
  if (!urls) return undefined;
  const publicUrls = urls.filter(url => /^https?:\/\//i.test(url));
  return publicUrls.length ? publicUrls : undefined;
}

function isSensitiveKey(key) {
  const normalized = String(key || '').trim();
  if (!normalized) return false;
  if (SENSITIVE_KEYS.has(normalized)) return true;
  const lower = normalized.toLowerCase();
  return lower.includes('cookie') ||
    lower.includes('token') ||
    lower.includes('authorization') ||
    lower.includes('secret') ||
    lower.includes('useridno') ||
    lower.includes('encrypteduseridno') ||
    lower.includes('accountid') ||
    lower === 'idno';
}

function sanitizeValue(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue).filter(item => item !== undefined);
  }

  if (!value || typeof value !== 'object') return value;

  const sanitized = {};
  Object.entries(value).forEach(([key, nestedValue]) => {
    if (isSensitiveKey(key)) return;
    const cleanValue = sanitizeValue(nestedValue);
    if (cleanValue !== undefined) sanitized[key] = cleanValue;
  });

  return sanitized;
}

function safeBookmarkUrl(value) {
  const url = optionalString(value);
  if (!url) return undefined;
  if (!/^https?:\/\//i.test(url)) return undefined;
  if (/cookie|token|authorization|secret|encryptedUserIdNo|userIdNo|idNo/i.test(url)) {
    return undefined;
  }
  return url;
}

function includesAny(value, needles) {
  const text = String(value || '');
  return needles.some(needle => text.includes(needle));
}

function inferMiroCategory(place) {
  const categoryCode = String(place.categoryCode || '').toUpperCase();
  const categoryName = String(place.categoryName || '');
  const categoryNameUpper = categoryName.toUpperCase();
  const sourceList = String(place.sourceList || '');

  let category = 'unknown';

  if (
    categoryCode === 'DINING' ||
    includesAny(categoryName, [
      '음식점',
      '한식',
      '양식',
      '일식',
      '중식',
      '돈가스',
      '피자',
      '베트남음식',
      '이탈리아음식',
      '일식당',
      '중식당',
      '한정식',
      '고기',
      '국밥',
      '냉면',
      '막국수',
      '칼국수',
      '파스타',
      '스시',
      '초밥',
      '라멘',
      '마라탕',
    ])
  ) {
    category = 'eat';
  } else if (
    categoryCode === 'CAFE' ||
    includesAny(categoryName, ['카페', '베이커리', '디저트', '커피', '로스터리', '찻집'])
  ) {
    category = 'cafe';
  } else if (
    categoryCode === 'BAR' ||
    categoryNameUpper.includes('BAR') ||
    includesAny(categoryName, ['바', '술집', '이자카야', '요리주점', '포차', '와인바', '펍'])
  ) {
    category = 'night';
  } else if (
    categoryCode === 'SHOPPING' ||
    includesAny(categoryName, ['쇼핑', '편집샵', '소품샵', '서점', '시장', '기념품'])
  ) {
    category = 'shop';
  } else if (
    categoryCode === 'TRAVEL' ||
    includesAny(categoryName, ['여행', '관광', '명소', '전시', '미술관', '박물관', '갤러리', '한옥'])
  ) {
    category = 'see';
  } else if (
    includesAny(categoryName, ['공방', '원데이', '체험', '사진관', '클래스', '클라이밍', '방탈출'])
  ) {
    category = 'activity';
  } else if (
    includesAny(categoryName, ['공원', '산책', '둘레길', '거리', '골목', '하천', '강변'])
  ) {
    category = 'walk';
  } else if (
    includesAny(categoryName, ['약국', '편의점', '역', '지하철', '환전', '짐보관', '아파트', '장소대여'])
  ) {
    category = 'practical';
  }

  if (category === 'unknown') {
    if (includesAny(sourceList, ['맛집', '식당'])) category = 'eat';
    else if (includesAny(sourceList, ['카페', '커피'])) category = 'cafe';
    else if (sourceList.includes('과외')) category = 'practical';
  }

  return MIRO_CATEGORIES.has(category) ? category : 'unknown';
}

function buildDedupeKey(place) {
  if (place.placeId) return `place:${place.placeId}`;
  if (place.id) return `bookmark:${place.id}`;
  return `name-address:${place.name.toLocaleLowerCase('ko-KR')}|${place.address.toLocaleLowerCase('ko-KR')}`;
}

function normalizePlace(rawPlace, source, stats, index) {
  const name = optionalString(rawPlace.name);
  if (!name) {
    stats.missingNameCount += 1;
    stats.warnings.push(`Skipped bookmark at index ${index}: missing name.`);
    return undefined;
  }

  const lng = numberValue(rawPlace.px);
  const lat = numberValue(rawPlace.py);
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
    stats.missingCoordinateCount += 1;
    stats.warnings.push(`Skipped "${name}": missing or invalid px/py.`);
    return undefined;
  }

  const id = stringValue(rawPlace.bookmarkId);
  const placeId = stringValue(rawPlace.sid);
  const categoryCode = stringValue(rawPlace.mcid);
  const categoryName = stringValue(rawPlace.mcidName);
  const type = stringValue(rawPlace.type) || 'place';

  const place = {
    id,
    placeId,
    name,
    lng,
    lat,
    type,
    address: stringValue(rawPlace.address),
    categoryCode,
    categoryName,
    available: booleanValue(rawPlace.available),
    isMatched: rawPlace.bookmarkMismatchInfo?.isMatched === true,
    source: 'naver-bookmark',
    sourceList: source.sourceList,
    sourceType: source.sourceType,
  };

  if (source.sourcePriority !== undefined) place.sourcePriority = source.sourcePriority;
  if (placeId) place.naverMapUrl = `https://map.naver.com/p/entry/place/${encodeURIComponent(placeId)}`;

  const displayName = optionalString(rawPlace.displayName);
  if (displayName) place.displayName = displayName;

  const categoryPath = normalizeStringArray(rawPlace.cidPath);
  if (categoryPath) place.categoryPath = categoryPath;

  const regionCode = optionalString(rawPlace.rcode);
  if (regionCode) place.regionCode = regionCode;

  const mismatchDetails = normalizeStringArray(rawPlace.bookmarkMismatchInfo?.details);
  if (mismatchDetails) place.mismatchDetails = mismatchDetails;

  if (rawPlace.memo !== undefined) {
    place.memo = rawPlace.memo === null ? null : String(rawPlace.memo);
  }

  const url = safeBookmarkUrl(rawPlace.url);
  if (url) place.url = url;

  const useTime = numberValue(rawPlace.useTime);
  if (useTime !== undefined) place.useTime = useTime;

  const createdAt = numberValue(rawPlace.creationTime);
  if (createdAt !== undefined) place.createdAt = createdAt;

  const updatedAt = numberValue(rawPlace.lastUpdateTime);
  if (updatedAt !== undefined) place.updatedAt = updatedAt;

  const order = numberValue(rawPlace.order);
  if (order !== undefined) place.order = order;

  if (rawPlace.isIndoor !== undefined) {
    place.isIndoor = rawPlace.isIndoor === true;
  }

  if (rawPlace.folderMappings !== undefined && rawPlace.folderMappings !== null) {
    place.folderMappings = sanitizeValue(rawPlace.folderMappings);
  }

  const thumbnailUrls = normalizeThumbnailUrls(rawPlace.placeInfo?.thumbnailUrls);
  if (thumbnailUrls) place.thumbnailUrls = thumbnailUrls;

  place.miroCategory = inferMiroCategory(place);

  stats.importedCount += 1;
  incrementCount(stats.countsByCategoryCode, place.categoryCode || '(missing)');
  incrementCount(stats.countsByCategoryName, place.categoryName || '(missing)');
  incrementCount(stats.countsByMiroCategory, place.miroCategory);

  return place;
}

function incrementCount(target, key) {
  target[key] = (target[key] || 0) + 1;
}

function extractBookmarkExports(input, inputPath) {
  if (Array.isArray(input.bookmarkList)) {
    return [input];
  }

  const sync = input?.my?.bookmarkSync;
  if (!sync || typeof sync !== 'object') return [];

  if (Array.isArray(sync.bookmarkList)) {
    return [{
      folder: sync.folder || sync.folderInfo || {
        name: 'MY',
        folderType: 'MY',
        bookmarkCount: sync.bookmarkList.length,
      },
      bookmarkList: sync.bookmarkList,
      unavailableCount: sync.unavailableCount,
      mismatchedCount: sync.mismatchedCount,
      removed: sync.removed,
    }];
  }

  const nestedLists = [];
  Object.entries(sync).forEach(([key, value]) => {
    if (value && typeof value === 'object' && Array.isArray(value.bookmarkList)) {
      nestedLists.push({
        folder: value.folder || value.folderInfo || {
          name: key,
          folderType: 'MY',
          bookmarkCount: value.bookmarkList.length,
        },
        bookmarkList: value.bookmarkList,
        unavailableCount: value.unavailableCount,
        mismatchedCount: value.mismatchedCount,
        removed: value.removed,
      });
    }
  });

  if (!nestedLists.length) {
    console.warn(`No supported bookmarkList found in ${inputPath}.`);
  }

  return nestedLists;
}

function normalizeExport(bookmarkExport, options, stats, inputPath) {
  const folder = bookmarkExport.folder || {};
  const bookmarkList = Array.isArray(bookmarkExport.bookmarkList) ? bookmarkExport.bookmarkList : [];
  const fallbackName = path.basename(inputPath, path.extname(inputPath));
  const source = {
    sourceList: optionalString(folder.name) || fallbackName,
    sourceType: optionalString(folder.folderType) || 'UNKNOWN',
    sourcePriority: options.sourcePriority,
  };

  const places = bookmarkList
    .map((place, index) => normalizePlace(place, source, stats, index))
    .filter(Boolean);

  return {
    places,
    sourceMeta: {
      sourceList: source.sourceList,
      sourceType: source.sourceType,
      bookmarkCount: numberValue(folder.bookmarkCount) ?? bookmarkList.length,
      importedCount: places.length,
      unavailableCount: numberValue(bookmarkExport.unavailableCount) ?? places.filter(place => place.available === false).length,
      mismatchedCount: numberValue(bookmarkExport.mismatchedCount) ?? places.filter(place => place.isMatched === false).length,
      removed: bookmarkExport.removed === true,
    },
    rawBookmarkListLength: bookmarkList.length,
  };
}

function readExistingOutput(outPath) {
  if (!fs.existsSync(outPath)) {
    return { meta: { sources: [] }, places: [] };
  }

  const existing = readJsonFile(outPath);
  if (Array.isArray(existing)) {
    return { meta: { sources: [] }, places: existing };
  }

  if (existing && typeof existing === 'object' && Array.isArray(existing.places)) {
    return {
      meta: existing.meta && typeof existing.meta === 'object' ? existing.meta : { sources: [] },
      places: existing.places,
    };
  }

  return { meta: { sources: [] }, places: [] };
}

function dedupePlaces(existingPlaces, importedPlaces, merge) {
  const byKey = new Map();
  let duplicateCount = 0;

  if (merge) {
    existingPlaces.forEach(place => {
      if (!place || typeof place !== 'object') return;
      byKey.set(buildDedupeKey(place), place);
    });
  }

  importedPlaces.forEach(place => {
    const key = buildDedupeKey(place);
    const previous = byKey.get(key);
    if (!previous) {
      byKey.set(key, place);
      return;
    }

    duplicateCount += 1;
    const previousPriority = Number(previous.sourcePriority || 0);
    const nextPriority = Number(place.sourcePriority || 0);
    if (nextPriority >= previousPriority) {
      byKey.set(key, place);
    }
  });

  const places = Array.from(byKey.values()).sort((a, b) => {
    const priorityDiff = Number(b.sourcePriority || 0) - Number(a.sourcePriority || 0);
    if (priorityDiff) return priorityDiff;
    const useTimeDiff = Number(b.useTime || 0) - Number(a.useTime || 0);
    if (useTimeDiff) return useTimeDiff;
    return String(a.name || '').localeCompare(String(b.name || ''), 'ko-KR');
  });

  return { places, duplicateCount };
}

function mergeSources(existingSources, importedSources) {
  const byKey = new Map();
  (Array.isArray(existingSources) ? existingSources : []).forEach(source => {
    if (!source || typeof source !== 'object') return;
    byKey.set(`${source.sourceType || ''}:${source.sourceList || ''}`, source);
  });

  importedSources.forEach(source => {
    byKey.set(`${source.sourceType || ''}:${source.sourceList || ''}`, source);
  });

  return Array.from(byKey.values());
}

function buildReport(options, inputPath, outPath, normalizedExports, stats, duplicateCount) {
  const sourceList = normalizedExports.map(item => item.sourceMeta.sourceList);
  const sourceType = normalizedExports.map(item => item.sourceMeta.sourceType);
  return {
    inputFilePath: path.relative(process.cwd(), inputPath),
    outputFilePath: path.relative(process.cwd(), outPath),
    sourceList: sourceList.length === 1 ? sourceList[0] : sourceList,
    sourceType: sourceType.length === 1 ? sourceType[0] : sourceType,
    expectedBookmarkCount: normalizedExports.reduce((sum, item) => sum + item.sourceMeta.bookmarkCount, 0),
    rawBookmarkListLength: normalizedExports.reduce((sum, item) => sum + item.rawBookmarkListLength, 0),
    importedCount: stats.importedCount,
    duplicateCount,
    missingNameCount: stats.missingNameCount,
    missingCoordinateCount: stats.missingCoordinateCount,
    unavailableCount: normalizedExports.reduce((sum, item) => sum + item.sourceMeta.unavailableCount, 0),
    mismatchedCount: normalizedExports.reduce((sum, item) => sum + item.sourceMeta.mismatchedCount, 0),
    countsByCategoryCode: stats.countsByCategoryCode,
    countsByCategoryName: stats.countsByCategoryName,
    countsByMiroCategory: stats.countsByMiroCategory,
    warnings: stats.warnings,
    merge: options.merge,
    generatedAt: new Date().toISOString(),
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  if (!options.input || !options.out) {
    throw new Error(`${usage()}\n\n--input and --out are required.`);
  }

  const inputPath = path.resolve(process.cwd(), options.input);
  const outPath = path.resolve(process.cwd(), options.out);
  const reportPath = path.resolve(process.cwd(), 'imports/naver/processed/import-report.json');

  const inputJson = readJsonFile(inputPath);
  const exportsToImport = extractBookmarkExports(inputJson, inputPath);
  if (!exportsToImport.length) {
    throw new Error('No supported Naver bookmark export was found. Expected a top-level bookmarkList array.');
  }

  const stats = {
    importedCount: 0,
    missingNameCount: 0,
    missingCoordinateCount: 0,
    countsByCategoryCode: {},
    countsByCategoryName: {},
    countsByMiroCategory: {},
    warnings: [],
  };

  const normalizedExports = exportsToImport.map(bookmarkExport => (
    normalizeExport(bookmarkExport, options, stats, inputPath)
  ));

  const importedPlaces = normalizedExports.flatMap(item => item.places);
  const existingOutput = options.merge
    ? readExistingOutput(outPath)
    : { meta: { sources: [] }, places: [] };
  const { places, duplicateCount } = dedupePlaces(existingOutput.places, importedPlaces, options.merge);
  const importedSources = normalizedExports.map(item => item.sourceMeta);
  const output = {
    meta: {
      generatedAt: new Date().toISOString(),
      sources: mergeSources(existingOutput.meta.sources, importedSources),
    },
    places,
  };

  const report = buildReport(options, inputPath, outPath, normalizedExports, stats, duplicateCount);

  writeJsonFile(outPath, output);
  writeJsonFile(reportPath, report);

  console.log(`Imported ${stats.importedCount} places from ${path.relative(process.cwd(), inputPath)}.`);
  console.log(`Wrote ${places.length} deduplicated places to ${path.relative(process.cwd(), outPath)}.`);
  console.log(`Wrote import report to ${path.relative(process.cwd(), reportPath)}.`);
  if (stats.warnings.length) {
    console.warn(`${stats.warnings.length} warning(s). See import report for details.`);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
