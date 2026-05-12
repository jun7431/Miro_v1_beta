#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const INPUT_FILE = path.join(ROOT_DIR, 'data', 'places', 'processed', 'miro_places.json');
const CATEGORIZED_OUT_FILE = path.join(
  ROOT_DIR,
  'data',
  'places',
  'processed',
  'miro_places_categorized.json'
);
const REVIEW_OUT_FILE = path.join(
  ROOT_DIR,
  'data',
  'places',
  'processed',
  'miro_places_needs_category_review.json'
);

const CATEGORY_META = {
  meal: {
    label: '식사',
    estimatedStayMin: { min: 60, max: 90 },
    routeRoles: ['main_stop'],
  },
  cafe: {
    label: '카페',
    estimatedStayMin: { min: 45, max: 75 },
    routeRoles: ['sub_stop'],
  },
  dessert_bakery: {
    label: '디저트·베이커리',
    estimatedStayMin: { min: 20, max: 40 },
    routeRoles: ['filler'],
  },
  bar: {
    label: '술집',
    estimatedStayMin: { min: 60, max: 120 },
    routeRoles: ['sub_stop', 'finale'],
  },
  activity: {
    label: '액티비티',
    estimatedStayMin: { min: 60, max: 120 },
    routeRoles: ['main_stop'],
  },
  shopping: {
    label: '쇼핑',
    estimatedStayMin: { min: 20, max: 60 },
    routeRoles: ['filler'],
  },
  walk_nature: {
    label: '산책·자연',
    estimatedStayMin: { min: 20, max: 45 },
    routeRoles: ['filler'],
  },
  landmark_view: {
    label: '명소·뷰',
    estimatedStayMin: { min: 20, max: 40 },
    routeRoles: ['filler', 'finale'],
  },
  rest: {
    label: '휴식',
    estimatedStayMin: { min: 90, max: 180 },
    routeRoles: ['main_stop'],
  },
  unknown: {
    label: '미분류',
    estimatedStayMin: { min: null, max: null },
    routeRoles: [],
  },
};

const DIRECT_CATEGORY_CODES = {
  DINING: 'meal',
  CAFE: 'cafe',
  BAR: 'bar',
  SHOPPING: 'shopping',
  ENTERTAINMENT: 'activity',
};

const DIRECT_CATEGORY_NAMES = {
  음식점: 'meal',
  카페: 'cafe',
  BAR: 'bar',
  쇼핑: 'shopping',
  여가: 'activity',
};

const BROAD_CATEGORY_CODES = new Set(['LIFE_CULTURE', 'TRAVEL', 'EDUCATION']);
const REVIEW_ONLY_CATEGORY_CODES = new Set([
  '',
  'ACCOMMODATION',
  'ADDRESS',
  'ETC',
  'GENERAL',
  'GEO_INFO',
  'SUPERMARKET',
]);

const KEYWORDS = {
  meal: [
    '한식',
    '일식',
    '중식',
    '양식',
    '아시안',
    '베트남',
    '태국',
    '인도',
    '분식',
    '브런치',
    '레스토랑',
    '음식점',
    '고기',
    '삼겹살',
    '소고기',
    '파스타',
    '피자',
    '버거',
    '라멘',
    '우동',
    '초밥',
    '스시',
    '돈카츠',
    '국밥',
    '해장국',
    '곱창',
    '족발',
    '보쌈',
    '치킨',
    '타코',
    '샌드위치',
    '비스트로',
  ],
  cafe: [
    '카페',
    '커피',
    '로스터리',
    '에스프레소',
    '티룸',
    '찻집',
    '북카페',
    '한옥카페',
    '디저트카페',
    '베이커리카페',
  ],
  dessert_bakery: [
    '베이커리',
    '빵집',
    '디저트',
    '케이크',
    '도넛',
    '아이스크림',
    '젤라또',
    '빙수',
    '쿠키',
    '푸딩',
    '마카롱',
    '타르트',
    '초콜릿',
    '떡',
    '전통디저트',
  ],
  bar: [
    '술집',
    '와인바',
    '칵테일',
    '펍',
    '호프',
    '이자카야',
    '포차',
    '브루어리',
    '위스키',
    '맥주',
    '전통주',
    '막걸리',
    '와인',
    '혼술바',
    '라운지바',
    '레코드바',
  ],
  activity: [
    '전시',
    '갤러리',
    '미술관',
    '박물관',
    '공연',
    '극장',
    '영화관',
    '체험',
    '클래스',
    '원데이클래스',
    '공방',
    '방탈출',
    '게임',
    '보드게임',
    '노래방',
    '스포츠',
    '볼링',
    '클라이밍',
    '테니스',
    '사진관',
    '셀프사진',
    '포토오브제',
    '포토부스',
    '파티룸',
    '아트센터',
    '뮤지엄',
  ],
  shopping: [
    '소품샵',
    '편집샵',
    '서점',
    '책방',
    '빈티지',
    '쇼룸',
    '플라워샵',
    '꽃집',
    '향수',
    '뷰티',
    '의류',
    '패션',
    '라이프스타일',
    '문구',
    '굿즈',
    '쇼핑',
  ],
  walk_nature: [
    '공원',
    '한강',
    '숲길',
    '산책',
    '산책로',
    '하천',
    '호수',
    '해변',
    '등산',
    '정원',
    '국립공원',
  ],
  landmark_view: [
    '랜드마크',
    '전망대',
    '전망',
    '포토스팟',
    '포토존',
    '명소',
    '광장',
    '타워',
    '고궁',
    '역사',
    '유적',
    '문화재',
    '다리',
    '야경',
    '경복궁',
    '덕수궁',
    '창덕궁',
    '창경궁',
    '경희궁',
  ],
  rest: [
    '스파',
    '사우나',
    '찜질방',
    '마사지',
    '휴식',
    '힐링',
    '온천',
    '수면',
    '테라피',
  ],
};

const HYBRID_REVIEW_PAIRS = new Set([
  'activity|bar',
  'activity|cafe',
  'activity|shopping',
  'bar|cafe',
  'bar|meal',
  'cafe|dessert_bakery',
  'cafe|meal',
  'cafe|shopping',
]);

const HYBRID_PHRASES = [
  'brunch cafe',
  'bakery cafe',
  'book cafe',
  'gallery cafe',
  'select shop cafe',
  'wine bistro',
  'rooftop cafe',
  'rooftop bar',
  '베이커리 카페',
  '베이커리카페',
  '브런치 카페',
  '브런치카페',
  '디저트 카페',
  '디저트카페',
  '북카페',
  '서점 카페',
  '서점카페',
  '책방 카페',
  '책방카페',
  '갤러리 카페',
  '갤러리카페',
  '갤러리&카페',
  '편집샵 카페',
  '편집샵카페',
  '소품샵 카페',
  '소품샵카페',
  '와인 비스트로',
  '와인비스트로',
  '복합문화공간',
  '루프탑 카페',
  '루프탑바',
];

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

function normalizeForMatch(value) {
  return stringValue(value).toLowerCase().replace(/\s+/g, ' ');
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function addScore(state, category, score, keyword, sourceField) {
  if (!CATEGORY_META[category]) return;
  state.scores[category] = (state.scores[category] || 0) + score;
  state.matchedKeywords.push(keyword);
  state.sourceFields.push(sourceField);
}

function getCategoryFieldValues(place) {
  return [
    ['categoryCode', place.categoryCode],
    ['categoryName', place.categoryName],
    ['raw.mcid', place.raw?.mcid],
    ['raw.mcidName', place.raw?.mcidName],
  ].filter(([, value]) => stringValue(value));
}

function getCategoryCode(place) {
  return stringValue(place.categoryCode || place.raw?.mcid).toUpperCase();
}

function getDirectCategory(place) {
  const fields = getCategoryFieldValues(place);

  for (const [fieldName, value] of fields) {
    const normalized = stringValue(value).toUpperCase();
    if (DIRECT_CATEGORY_CODES[normalized]) {
      return {
        category: DIRECT_CATEGORY_CODES[normalized],
        keyword: `${fieldName}:${value}`,
        sourceField: fieldName,
      };
    }
  }

  for (const [fieldName, value] of fields) {
    const normalized = stringValue(value);
    if (DIRECT_CATEGORY_NAMES[normalized]) {
      return {
        category: DIRECT_CATEGORY_NAMES[normalized],
        keyword: `${fieldName}:${value}`,
        sourceField: fieldName,
      };
    }
  }

  return null;
}

function getTextFields(place) {
  const fields = [
    ['name', place.name],
    ['displayName', place.displayName],
    ['raw.name', place.raw?.name],
    ['raw.displayName', place.raw?.displayName],
    ['raw.memo', place.raw?.memo],
  ].filter(([, value]) => stringValue(value));
  const seenValues = new Set();

  return fields.filter(([, value]) => {
    const normalized = normalizeForMatch(value);
    if (seenValues.has(normalized)) return false;
    seenValues.add(normalized);
    return true;
  });
}

function matchKeywords(text) {
  const normalizedText = normalizeForMatch(text);
  const matches = [];

  Object.entries(KEYWORDS).forEach(([category, keywords]) => {
    keywords
      .slice()
      .sort((a, b) => b.length - a.length)
      .forEach(keyword => {
        const normalizedKeyword = normalizeForMatch(keyword);
        const index = normalizedText.indexOf(normalizedKeyword);
        if (index !== -1 && !shouldIgnoreKeywordMatch(normalizedText, normalizedKeyword, index)) {
          matches.push({ category, keyword });
        }
      });
  });

  return matches;
}

function shouldIgnoreKeywordMatch(text, keyword, index) {
  const previousChar = index > 0 ? text[index - 1] : '';
  const matchedText = text.slice(index, index + keyword.length);

  if (keyword === '티룸' && previousChar === '파') {
    return true;
  }

  if (keyword === '와인' && text.slice(index - 1, index + keyword.length + 1) === '리와인드') {
    return true;
  }

  return matchedText !== keyword;
}

function getHybridPhraseMatches(place) {
  const text = normalizeForMatch([
    place.name,
    place.displayName,
    place.raw?.name,
    place.raw?.memo,
  ].filter(Boolean).join(' '));

  return HYBRID_PHRASES.filter(phrase => text.includes(normalizeForMatch(phrase)));
}

function makePair(a, b) {
  return [a, b].sort().join('|');
}

function hasReviewPair(categories) {
  for (let i = 0; i < categories.length; i += 1) {
    for (let j = i + 1; j < categories.length; j += 1) {
      if (HYBRID_REVIEW_PAIRS.has(makePair(categories[i], categories[j]))) {
        return true;
      }
    }
  }
  return false;
}

function sortedCandidates(scores) {
  return Object.entries(scores)
    .map(([category, score]) => ({ category, score: Number(score.toFixed(2)) }))
    .filter(candidate => candidate.score > 0)
    .sort((a, b) => b.score - a.score || a.category.localeCompare(b.category));
}

function confidenceFor({ directCategory, broadCategoryContext, nameMatches, needsReview, topScore }) {
  if (needsReview) {
    if (topScore >= 10 && directCategory) return 0.62;
    if (broadCategoryContext && nameMatches.length > 0) return 0.58;
    if (topScore > 0) return 0.45;
    return 0;
  }

  if (directCategory && topScore >= 10) return 0.95;
  if (broadCategoryContext && nameMatches.length > 0) return 0.74;
  return 0.65;
}

function classifyPlace(place) {
  const state = {
    scores: {},
    matchedKeywords: [],
    sourceFields: [],
  };
  const categoryFields = getCategoryFieldValues(place);
  const categoryCode = getCategoryCode(place);
  const hasCategoryField = categoryFields.length > 0;
  const isReviewOnlyCategory = REVIEW_ONLY_CATEGORY_CODES.has(categoryCode);
  const broadCategoryContext = BROAD_CATEGORY_CODES.has(categoryCode);
  const directCategory = getDirectCategory(place);

  if (directCategory) {
    addScore(
      state,
      directCategory.category,
      10,
      directCategory.keyword,
      directCategory.sourceField
    );
  }

  const nameMatches = [];
  getTextFields(place).forEach(([fieldName, value]) => {
    matchKeywords(value).forEach(match => {
      nameMatches.push(match);

      if (directCategory && match.category === directCategory.category) {
        addScore(state, match.category, 1.5, `${fieldName}:${match.keyword}`, fieldName);
      } else if (directCategory) {
        addScore(state, match.category, 3, `${fieldName}:${match.keyword}`, fieldName);
      } else if (broadCategoryContext) {
        addScore(state, match.category, 6, `${fieldName}:${match.keyword}`, fieldName);
      } else {
        addScore(state, match.category, 3, `${fieldName}:${match.keyword}`, fieldName);
      }
    });
  });

  const candidates = sortedCandidates(state.scores);
  const top = candidates[0] || { category: 'unknown', score: 0 };
  const second = candidates[1] || null;
  const matchedCategories = unique(candidates.map(candidate => candidate.category));
  const nameMatchCategories = unique(nameMatches.map(match => match.category));
  const hybridPhraseMatches = getHybridPhraseMatches(place);
  const hasHybridCategoryConflict = hasReviewPair(unique([
    ...(directCategory ? [directCategory.category] : []),
    ...nameMatchCategories,
  ]));
  const hasSimilarScores = Boolean(second) && second.score >= 6 && top.score - second.score <= 2;
  const onlyNameBased = !directCategory && !broadCategoryContext && nameMatches.length > 0;

  const reviewReasons = [];
  if (!hasCategoryField) reviewReasons.push('missing category fields');
  if (isReviewOnlyCategory) reviewReasons.push(`review-only Naver category ${categoryCode || '<empty>'}`);
  if (onlyNameBased) reviewReasons.push('only name-based category guess was possible');
  if (hasHybridCategoryConflict) reviewReasons.push('hybrid venue signals matched multiple primary categories');
  if (hybridPhraseMatches.length > 0) {
    reviewReasons.push(`hybrid phrase matched: ${hybridPhraseMatches.join(', ')}`);
  }
  if (hasSimilarScores) {
    reviewReasons.push(
      `similar category scores: ${top.category} ${top.score}, ${second.category} ${second.score}`
    );
  }
  if (top.score === 0) reviewReasons.push('no reliable category signal matched');

  const provisionalNeedsReview = reviewReasons.length > 0;
  const confidence = confidenceFor({
    directCategory,
    broadCategoryContext,
    nameMatches,
    needsReview: provisionalNeedsReview,
    topScore: top.score,
  });
  if (confidence < 0.7 && !provisionalNeedsReview) {
    reviewReasons.push(`low confidence score ${confidence.toFixed(2)}`);
  }

  const needsReview = reviewReasons.length > 0;
  const primaryCategory = needsReview ? 'unknown' : top.category;
  const meta = CATEGORY_META[primaryCategory];
  const reason = needsReview
    ? reviewReasons.join('; ')
    : `classified as ${primaryCategory} from ${
      directCategory ? 'Naver category field' : 'broad Naver category plus keyword signals'
    }`;

  return {
    primaryCategory,
    primaryCategoryLabel: meta.label,
    estimatedStayMin: meta.estimatedStayMin,
    routeRoles: meta.routeRoles,
    categoryClassification: {
      method: 'rule',
      confidence: Number(confidence.toFixed(2)),
      matchedKeywords: unique(state.matchedKeywords),
      sourceFields: unique(state.sourceFields),
      needsReview,
      reason,
      candidateCategories: candidates,
      matchedPrimaryCategories: matchedCategories,
    },
  };
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function topEntries(counts, limit = 10) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit);
}

function rawCategoryKey(place) {
  const code = stringValue(place.categoryCode || place.raw?.mcid) || '<missing>';
  const name = stringValue(place.categoryName || place.raw?.mcidName) || '<missing>';
  return `${code} / ${name}`;
}

function exampleLine(place) {
  const classification = place.categoryClassification;
  return [
    `- ${place.name}`,
    `=> ${place.primaryCategory}`,
    `(confidence ${classification.confidence.toFixed(2)})`,
    `reason: ${classification.reason}`,
  ].join(' ');
}

function printSummary(summary) {
  console.log(`Total places: ${summary.totalPlaces}`);
  console.log(`Automatically classified: ${summary.classifiedAutomatically}`);
  console.log(`Needs manual review: ${summary.needsManualReview}`);

  console.log('\nCount by primaryCategory:');
  Object.entries(summary.countByPrimaryCategory).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });

  console.log('\nTop unknown/ambiguous raw categories:');
  summary.topReviewRawCategories.forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });

  console.log('\nExamples of classified places:');
  summary.classifiedExamples.forEach(line => console.log(line));

  console.log('\nExamples of review-needed places:');
  summary.reviewExamples.forEach(line => console.log(line));

  console.log(`\nOutput written: ${path.relative(ROOT_DIR, CATEGORIZED_OUT_FILE)}`);
  console.log(`Review queue written: ${path.relative(ROOT_DIR, REVIEW_OUT_FILE)}`);
}

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error(`Input file does not exist: ${path.relative(ROOT_DIR, INPUT_FILE)}`);
  }

  const places = readJsonFile(INPUT_FILE);
  if (!Array.isArray(places)) {
    throw new Error(`Expected an array of places in ${path.relative(ROOT_DIR, INPUT_FILE)}`);
  }

  const categorizedPlaces = places.map(place => ({
    ...place,
    ...classifyPlace(place),
  }));
  const reviewPlaces = categorizedPlaces.filter(
    place => place.categoryClassification.needsReview
  );
  const classifiedPlaces = categorizedPlaces.filter(
    place => !place.categoryClassification.needsReview
  );

  writeJsonFile(CATEGORIZED_OUT_FILE, categorizedPlaces);
  writeJsonFile(REVIEW_OUT_FILE, reviewPlaces);

  const summary = {
    totalPlaces: categorizedPlaces.length,
    classifiedAutomatically: classifiedPlaces.length,
    needsManualReview: reviewPlaces.length,
    countByPrimaryCategory: countBy(categorizedPlaces, place => place.primaryCategory),
    topReviewRawCategories: topEntries(countBy(reviewPlaces, rawCategoryKey), 10),
    classifiedExamples: classifiedPlaces.slice(0, 10).map(exampleLine),
    reviewExamples: reviewPlaces.slice(0, 10).map(exampleLine),
  };

  printSummary(summary);
}

main();
