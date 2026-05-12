#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PROCESSED_DIR = path.join(ROOT_DIR, 'data', 'places', 'processed');
const CATEGORIZED_FILE = path.join(PROCESSED_DIR, 'miro_places_categorized.json');
const COMPLETED_CSV_FILE = path.join(PROCESSED_DIR, 'miro_places_category_review_completed.csv');
const REVIEW_FILE = path.join(PROCESSED_DIR, 'miro_places_needs_category_review.json');
const REPORT_FILE = path.join(PROCESSED_DIR, 'category_manual_merge_report.json');

const EXPECTED_PLACE_COUNT = 3273;
const MANUAL_REVIEW_REASON =
  'Applied from miro_places_category_review_completed.csv manual category review';

const CATEGORY_META = {
  meal: {
    primaryCategoryLabel: '식사',
    estimatedStayMin: { min: 60, max: 90 },
    routeRoles: ['main_stop'],
  },
  cafe: {
    primaryCategoryLabel: '카페',
    estimatedStayMin: { min: 45, max: 75 },
    routeRoles: ['sub_stop'],
  },
  dessert_bakery: {
    primaryCategoryLabel: '디저트·베이커리',
    estimatedStayMin: { min: 20, max: 40 },
    routeRoles: ['filler'],
  },
  bar: {
    primaryCategoryLabel: '술집',
    estimatedStayMin: { min: 60, max: 120 },
    routeRoles: ['sub_stop', 'finale'],
  },
  activity: {
    primaryCategoryLabel: '액티비티',
    estimatedStayMin: { min: 60, max: 120 },
    routeRoles: ['main_stop'],
  },
  shopping: {
    primaryCategoryLabel: '쇼핑',
    estimatedStayMin: { min: 20, max: 60 },
    routeRoles: ['filler'],
  },
  walk_nature: {
    primaryCategoryLabel: '산책·자연',
    estimatedStayMin: { min: 20, max: 45 },
    routeRoles: ['filler'],
  },
  landmark_view: {
    primaryCategoryLabel: '명소·뷰',
    estimatedStayMin: { min: 20, max: 40 },
    routeRoles: ['filler', 'finale'],
  },
  rest: {
    primaryCategoryLabel: '휴식',
    estimatedStayMin: { min: 90, max: 180 },
    routeRoles: ['main_stop'],
  },
};

const VALID_CATEGORIES = new Set(Object.keys(CATEGORY_META));
const STABLE_ID_COLUMNS = ['id', 'placeId', 'sid', 'bookmarkId'];
const CATEGORY_COLUMNS = ['manualCategory', 'primaryCategory', 'category'];
const CATEGORY_RELATED_FIELDS = new Set([
  'primaryCategory',
  'primaryCategoryLabel',
  'estimatedStayMin',
  'routeRoles',
  'categoryClassification',
]);

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
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

function normalizeName(value) {
  return stringValue(value).replace(/\s+/g, ' ').trim();
}

function parseCsv(content) {
  const text = content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length === 0) return [];

  const headers = rows[0].map(header => stringValue(header));
  return rows.slice(1)
    .filter(values => values.some(value => stringValue(value) !== ''))
    .map((values, index) => {
      const item = { __rowNumber: index + 2 };
      headers.forEach((header, headerIndex) => {
        item[header] = values[headerIndex] === undefined ? '' : values[headerIndex];
      });
      return item;
    });
}

function readCsvFile(filePath) {
  return parseCsv(fs.readFileSync(filePath, 'utf8'));
}

function getSelectedCategory(row) {
  for (const column of CATEGORY_COLUMNS) {
    if (Object.prototype.hasOwnProperty.call(row, column)) {
      const value = stringValue(row[column]);
      if (value !== '') {
        return { column, value, valid: VALID_CATEGORIES.has(value) };
      }
    }
  }
  return { column: null, value: '', valid: false };
}

function buildIndexes(places) {
  const idIndexes = Object.fromEntries(STABLE_ID_COLUMNS.map(column => [column, new Map()]));
  const nameIndex = new Map();

  places.forEach((place, index) => {
    STABLE_ID_COLUMNS.forEach(column => {
      const value = stringValue(place[column]);
      if (!value) return;
      if (!idIndexes[column].has(value)) idIndexes[column].set(value, []);
      idIndexes[column].get(value).push(index);
    });

    const normalizedName = normalizeName(place.name);
    if (!normalizedName) return;
    if (!nameIndex.has(normalizedName)) nameIndex.set(normalizedName, []);
    nameIndex.get(normalizedName).push(index);
  });

  return { idIndexes, nameIndex };
}

function getStableMatch(row, idIndexes) {
  for (const column of STABLE_ID_COLUMNS) {
    const value = stringValue(row[column]);
    if (!value) continue;
    return {
      keyType: column,
      keyValue: value,
      indexes: idIndexes[column].get(value) || [],
    };
  }
  return null;
}

function isPreviouslyReviewNeeded(place) {
  return place.primaryCategory === 'unknown' || place.categoryClassification?.needsReview === true;
}

function summarizeRow(row, extra = {}) {
  return {
    rowNumber: row.__rowNumber,
    name: stringValue(row.name),
    normalizedName: normalizeName(row.name),
    ...extra,
  };
}

function summarizePlace(place, index) {
  return {
    index,
    id: stringValue(place.id),
    placeId: stringValue(place.placeId),
    sid: stringValue(place.sid),
    bookmarkId: stringValue(place.bookmarkId),
    name: stringValue(place.name),
    primaryCategory: stringValue(place.primaryCategory),
    needsReview: place.categoryClassification?.needsReview === true,
  };
}

function countByPrimaryCategory(places) {
  return places.reduce((counts, place) => {
    const category = place.primaryCategory;
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});
}

function withoutCategoryFields(place) {
  return Object.fromEntries(
    Object.entries(place).filter(([key]) => !CATEGORY_RELATED_FIELDS.has(key))
  );
}

function assertUnchangedNonCategoryFields(beforePlaces, afterPlaces) {
  const changed = [];
  beforePlaces.forEach((beforePlace, index) => {
    const before = JSON.stringify(withoutCategoryFields(beforePlace));
    const after = JSON.stringify(withoutCategoryFields(afterPlaces[index]));
    if (before !== after) {
      changed.push(summarizePlace(afterPlaces[index], index));
    }
  });
  return changed;
}

function applyCategory(place, primaryCategory) {
  const meta = CATEGORY_META[primaryCategory];

  place.primaryCategory = primaryCategory;
  place.primaryCategoryLabel = meta.primaryCategoryLabel;
  place.estimatedStayMin = { ...meta.estimatedStayMin };
  place.routeRoles = [...meta.routeRoles];
  place.categoryClassification = {
    ...(place.categoryClassification || {}),
    method: 'manual_review',
    confidence: 1.0,
    needsReview: false,
    reason: MANUAL_REVIEW_REASON,
  };
}

function main() {
  const places = readJsonFile(CATEGORIZED_FILE);
  const originalPlaces = JSON.parse(JSON.stringify(places));
  const rows = readCsvFile(COMPLETED_CSV_FILE);

  if (!Array.isArray(places)) {
    throw new Error(`Expected an array in ${path.relative(ROOT_DIR, CATEGORIZED_FILE)}`);
  }

  const { idIndexes, nameIndex } = buildIndexes(places);
  const report = {
    generatedAt: new Date().toISOString(),
    inputFiles: {
      categorized: path.relative(ROOT_DIR, CATEGORIZED_FILE),
      completedReviewCsv: path.relative(ROOT_DIR, COMPLETED_CSV_FILE),
    },
    totalRowsInCompletedCsv: rows.length,
    successfullyMatchedRows: 0,
    successfullyUpdatedPlaces: 0,
    unmatchedRows: [],
    duplicateAmbiguousRows: [],
    invalidCategoryRows: [],
    notPreviouslyReviewNeededRows: [],
    remainingUnknownPlaceCount: 0,
    remainingUnknownPlaces: [],
    finalCountByPrimaryCategory: {},
    everyPlaceNowHasValidPrimaryCategory: false,
    validation: {},
  };

  const updatedPlaceIndexes = new Set();

  rows.forEach(row => {
    const category = getSelectedCategory(row);
    if (!category.valid) {
      report.invalidCategoryRows.push(summarizeRow(row, {
        selectedCategoryColumn: category.column,
        selectedCategoryValue: category.value,
      }));
      return;
    }

    const stableMatch = getStableMatch(row, idIndexes);
    const match = stableMatch || {
      keyType: 'name',
      keyValue: normalizeName(row.name),
      indexes: nameIndex.get(normalizeName(row.name)) || [],
    };

    if (match.indexes.length === 0) {
      report.unmatchedRows.push(summarizeRow(row, {
        selectedCategoryColumn: category.column,
        selectedCategoryValue: category.value,
        matchKeyType: match.keyType,
        matchKeyValue: match.keyValue,
      }));
      return;
    }

    const matchedPlaces = match.indexes.map(index => places[index]);
    const allReviewNeeded = matchedPlaces.every(isPreviouslyReviewNeeded);
    if (!allReviewNeeded) {
      report.notPreviouslyReviewNeededRows.push(summarizeRow(row, {
        selectedCategoryColumn: category.column,
        selectedCategoryValue: category.value,
        matchKeyType: match.keyType,
        matchKeyValue: match.keyValue,
        matchedPlaces: match.indexes.map(index => summarizePlace(places[index], index)),
      }));
      return;
    }

    if (match.indexes.length > 1 && match.keyType === 'name') {
      const allUnknown = matchedPlaces.every(place => place.primaryCategory === 'unknown');
      if (!allUnknown) {
        report.duplicateAmbiguousRows.push(summarizeRow(row, {
          selectedCategoryColumn: category.column,
          selectedCategoryValue: category.value,
          matchKeyType: match.keyType,
          matchKeyValue: match.keyValue,
          matchedPlaces: match.indexes.map(index => summarizePlace(places[index], index)),
        }));
        return;
      }
    } else if (match.indexes.length > 1) {
      report.duplicateAmbiguousRows.push(summarizeRow(row, {
        selectedCategoryColumn: category.column,
        selectedCategoryValue: category.value,
        matchKeyType: match.keyType,
        matchKeyValue: match.keyValue,
        matchedPlaces: match.indexes.map(index => summarizePlace(places[index], index)),
      }));
      return;
    }

    report.successfullyMatchedRows += 1;
    match.indexes.forEach(index => {
      applyCategory(places[index], category.value);
      updatedPlaceIndexes.add(index);
    });
  });

  report.successfullyUpdatedPlaces = updatedPlaceIndexes.size;

  const remainingReviewPlaces = places.filter(place => (
    !VALID_CATEGORIES.has(place.primaryCategory)
    || place.primaryCategory === 'unknown'
    || place.categoryClassification?.needsReview === true
  ));
  const remainingUnknownPlaces = places
    .map((place, index) => ({ place, index }))
    .filter(({ place }) => place.primaryCategory === 'unknown')
    .map(({ place, index }) => summarizePlace(place, index));
  const invalidPrimaryCategoryPlaces = places
    .map((place, index) => ({ place, index }))
    .filter(({ place }) => !VALID_CATEGORIES.has(place.primaryCategory))
    .map(({ place, index }) => summarizePlace(place, index));
  const needsReviewPlaces = places
    .map((place, index) => ({ place, index }))
    .filter(({ place }) => place.categoryClassification?.needsReview === true)
    .map(({ place, index }) => summarizePlace(place, index));
  const nonCategoryFieldChanges = assertUnchangedNonCategoryFields(originalPlaces, places);
  const finalCountByPrimaryCategory = countByPrimaryCategory(places);
  const categoryCountSum = Object.values(finalCountByPrimaryCategory)
    .reduce((sum, count) => sum + count, 0);

  report.remainingUnknownPlaceCount = remainingUnknownPlaces.length;
  report.remainingUnknownPlaces = remainingUnknownPlaces;
  report.finalCountByPrimaryCategory = finalCountByPrimaryCategory;
  report.everyPlaceNowHasValidPrimaryCategory =
    places.length === EXPECTED_PLACE_COUNT
    && categoryCountSum === EXPECTED_PLACE_COUNT
    && invalidPrimaryCategoryPlaces.length === 0
    && remainingUnknownPlaces.length === 0
    && needsReviewPlaces.length === 0;
  report.validation = {
    totalPlaces: places.length,
    expectedPlaceCount: EXPECTED_PLACE_COUNT,
    originalPlaceCountPreserved: places.length === originalPlaces.length,
    categoryCountsSum: categoryCountSum,
    categoryCountsSumMatchesTotal: categoryCountSum === places.length,
    invalidPrimaryCategoryCount: invalidPrimaryCategoryPlaces.length,
    invalidPrimaryCategoryPlaces,
    unknownPrimaryCategoryCount: remainingUnknownPlaces.length,
    needsReviewTrueCount: needsReviewPlaces.length,
    needsReviewTruePlaces: needsReviewPlaces,
    nonCategoryFieldChangeCount: nonCategoryFieldChanges.length,
    nonCategoryFieldChanges,
  };

  if (places.length !== EXPECTED_PLACE_COUNT) {
    throw new Error(`Expected ${EXPECTED_PLACE_COUNT} places, found ${places.length}`);
  }
  if (nonCategoryFieldChanges.length > 0) {
    throw new Error('Merge changed non-category fields');
  }

  writeJsonFile(CATEGORIZED_FILE, places);
  writeJsonFile(REVIEW_FILE, remainingReviewPlaces);
  writeJsonFile(REPORT_FILE, report);

  console.log(`Completed CSV rows: ${report.totalRowsInCompletedCsv}`);
  console.log(`Matched rows: ${report.successfullyMatchedRows}`);
  console.log(`Updated places: ${report.successfullyUpdatedPlaces}`);
  console.log(`Invalid category rows: ${report.invalidCategoryRows.length}`);
  console.log(`Unmatched rows: ${report.unmatchedRows.length}`);
  console.log(`Duplicate/ambiguous rows: ${report.duplicateAmbiguousRows.length}`);
  console.log(`Remaining review places: ${remainingReviewPlaces.length}`);
  console.log('Final count by primaryCategory:');
  Object.entries(report.finalCountByPrimaryCategory)
    .sort(([left], [right]) => left.localeCompare(right))
    .forEach(([categoryName, count]) => {
      console.log(`  ${categoryName}: ${count}`);
    });
  console.log(`All places valid: ${report.everyPlaceNowHasValidPrimaryCategory}`);
  console.log(`Report written: ${path.relative(ROOT_DIR, REPORT_FILE)}`);
}

main();
