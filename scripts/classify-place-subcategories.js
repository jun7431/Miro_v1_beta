#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PROCESSED_DIR = path.join(ROOT_DIR, 'data', 'places', 'processed');
const INPUT_FILE = path.join(PROCESSED_DIR, 'miro_places_categorized.json');
const SUBCATEGORIZED_OUT_FILE = path.join(PROCESSED_DIR, 'miro_places_subcategorized.json');
const REVIEW_OUT_FILE = path.join(PROCESSED_DIR, 'miro_places_needs_subcategory_review.json');
const REPORT_OUT_FILE = path.join(PROCESSED_DIR, 'subcategory_classification_report.json');
const EXPECTED_PLACE_COUNT = 3273;

const VALID_PRIMARY_CATEGORIES = new Set([
  'meal',
  'cafe',
  'dessert_bakery',
  'bar',
  'activity',
  'shopping',
  'walk_nature',
  'landmark_view',
  'rest',
]);

const SUBCATEGORY_SCHEMA = {
  meal: {
    korean: '한식',
    japanese: '일식',
    chinese: '중식',
    western: '양식',
    asian: '아시안',
    bunsik: '분식',
    fusion_modern: '퓨전·모던',
    brunch: '브런치',
  },
  cafe: {
    specialty_coffee: '스페셜티',
    dessert_cafe: '디저트카페',
    bakery_cafe: '베이커리카페',
    book_cafe: '북카페',
    tea_house: '티하우스·찻집',
    rooftop_cafe: '루프탑',
    hanok_cafe: '한옥',
  },
  dessert_bakery: {
    bakery: '베이커리',
    cake_patisserie: '케이크·파티스리',
    donut_cookie: '도넛·쿠키',
    ice_cream_gelato: '아이스크림·젤라또',
    bingsu: '빙수',
    traditional_dessert: '전통디저트',
    takeout_dessert: '테이크아웃디저트',
  },
  bar: {
    wine_bar: '와인바',
    cocktail_bar: '칵테일바',
    pub: '펍',
    izakaya: '이자카야',
    pocha: '포차',
    brewery: '브루어리',
    whiskey_bar: '위스키바',
    traditional_alcohol: '전통주',
  },
  activity: {
    exhibition_gallery: '전시·갤러리',
    performance: '공연',
    one_day_class: '원데이클래스',
    escape_game: '방탈출·게임',
    sports: '스포츠',
    arcade_entertainment: '오락·엔터테인먼트',
  },
  shopping: {
    select_shop: '편집샵',
    lifestyle_goods: '소품·라이프스타일',
    bookstore: '서점',
    vintage: '빈티지',
    flower_shop: '플라워샵',
    beauty_fragrance: '향수·뷰티',
  },
  walk_nature: {
    park: '공원',
    river_hangang: '한강·하천',
    mountain_hike: '산·등산',
    street_alley: '골목·거리',
    trail_forest: '산책로·숲길',
  },
  landmark_view: {
    landmark: '랜드마크',
    museum: '박물관',
    observatory: '전망대',
    palace_history: '고궁·역사',
    photo_spot: '포토스팟',
    night_view: '야경',
  },
  rest: {
    spa: '스파',
    sauna_jjimjilbang: '사우나·찜질방',
    massage: '마사지',
    healing_space: '힐링공간',
  },
};

const SUBCATEGORY_PRIORITY = {
  meal: [
    'brunch',
    'bunsik',
    'asian',
    'chinese',
    'japanese',
    'korean',
    'fusion_modern',
    'western',
  ],
  cafe: [
    'rooftop_cafe',
    'hanok_cafe',
    'book_cafe',
    'tea_house',
    'bakery_cafe',
    'dessert_cafe',
    'specialty_coffee',
  ],
  dessert_bakery: [
    'bingsu',
    'ice_cream_gelato',
    'donut_cookie',
    'cake_patisserie',
    'traditional_dessert',
    'takeout_dessert',
    'bakery',
  ],
  bar: [
    'wine_bar',
    'cocktail_bar',
    'whiskey_bar',
    'brewery',
    'traditional_alcohol',
    'izakaya',
    'pocha',
    'pub',
  ],
  activity: [
    'escape_game',
    'one_day_class',
    'performance',
    'sports',
    'exhibition_gallery',
    'arcade_entertainment',
  ],
  shopping: [
    'beauty_fragrance',
    'flower_shop',
    'bookstore',
    'vintage',
    'select_shop',
    'lifestyle_goods',
  ],
  walk_nature: [
    'river_hangang',
    'mountain_hike',
    'trail_forest',
    'park',
    'street_alley',
  ],
  landmark_view: [
    'night_view',
    'observatory',
    'palace_history',
    'museum',
    'photo_spot',
    'landmark',
  ],
  rest: [
    'sauna_jjimjilbang',
    'massage',
    'spa',
    'healing_space',
  ],
};

const SUBCATEGORY_KEYWORDS = {
  meal: {
    korean: [
      '한식',
      '백반',
      '국밥',
      '해장국',
      '고기',
      '삼겹살',
      '갈비',
      '족발',
      '보쌈',
      '곱창',
      '닭갈비',
      '찜닭',
      '전골',
      '찌개',
      '냉면',
      '설렁탕',
      '순대국',
      '한정식',
      '김치',
      '불고기',
      '육회',
      '막국수',
      '칼국수',
      '닭한마리',
      '감자탕',
      '두루치기',
      '횟집',
      '수산',
      '해물',
      '통닭',
      '닭강정',
      '치킨',
      '돼지',
      '흑돼지',
      '한우',
      '목살',
      '등심',
      '갈매기살',
    ],
    japanese: [
      '일식',
      '일본식',
      '라멘',
      '우동',
      '소바',
      '스시',
      '초밥',
      '돈카츠',
      '돈까스',
      '오마카세',
      '이자카야식당',
      '규카츠',
      '텐동',
      '카츠',
      '사케동',
      '가츠',
      '야끼',
      '야키토리',
      '오코노미야키',
      '돈가스',
      '멘야',
      '쇼쿠도',
      '갓포',
      '사케바',
      '요쇼쿠',
    ],
    chinese: [
      '중식',
      '중국집',
      '짜장면',
      '자장면',
      '짬뽕',
      '마라',
      '훠궈',
      '딤섬',
      '양꼬치',
      '탕수육',
      '중화',
      '홍콩반점',
      '마라탕',
      '마라샹궈',
      '우육면',
      '도삭면',
      '샤오룽바오',
      '샤오룽',
    ],
    western: [
      '양식',
      '이탈리안',
      '프렌치',
      '파스타',
      '피자',
      '스테이크',
      '버거',
      '샌드위치',
      '비스트로',
      '레스토랑',
      '다이닝',
      '그릴',
      '브라세리',
      '트라토리아',
      '오스테리아',
      '리조또',
      '뇨끼',
      '피제리아',
      '델리',
    ],
    asian: [
      '아시안',
      '베트남',
      '쌀국수',
      '태국',
      '타이',
      '인도',
      '커리',
      '멕시칸',
      '타코',
      '중동',
      '터키',
      '포케',
      '분짜',
      '반미',
      '팟타이',
      '나시고랭',
      '케밥',
    ],
    bunsik: [
      '분식',
      '김밥',
      '떡볶이',
      '순대',
      '튀김',
      '라볶이',
      '어묵',
      '오뎅',
      '쫄면',
      '꼬마김밥',
    ],
    fusion_modern: [
      '퓨전',
      '모던',
      '컨템포러리',
      '다이닝바',
      '캐주얼다이닝',
      '모던한식',
      '파인다이닝',
    ],
    brunch: [
      '브런치',
      '팬케이크',
      '와플',
      '에그베네딕트',
      '베네딕트',
      '프렌치토스트',
      '샐러드',
      '수프',
    ],
  },
  cafe: {
    specialty_coffee: [
      '스페셜티',
      '로스터리',
      '핸드드립',
      '에스프레소바',
      '커피전문점',
      '커피',
      '카페라떼',
      '드립',
      '원두',
      '바리스타',
      'espresso',
      'coffee',
      'roastery',
    ],
    dessert_cafe: [
      '디저트카페',
      '케이크카페',
      '푸딩',
      '디저트',
      '케이크',
      '타르트',
      '마카롱',
      '크레페',
      '와플',
      '빙수',
    ],
    bakery_cafe: [
      '베이커리카페',
      '베이커리',
      '빵',
      '브레드',
      '크루아상',
      '크로와상',
      '베이글',
      '도넛',
      'bakery',
      'bread',
    ],
    book_cafe: [
      '북카페',
      '책방카페',
      '서점카페',
      '북스토어카페',
      '도서관',
    ],
    tea_house: [
      '티룸',
      '찻집',
      '전통차',
      '말차',
      '홍차',
      '티하우스',
      'tea house',
      'tearoom',
    ],
    rooftop_cafe: [
      '루프탑',
      'rooftop',
    ],
    hanok_cafe: [
      '한옥',
      'hanok',
    ],
  },
  dessert_bakery: {
    bakery: [
      '베이커리',
      '빵집',
      '제과점',
      '빵',
      '브레드',
      '크루아상',
      '크로와상',
      '베이글',
      '바게트',
      'bakery',
      'bread',
    ],
    cake_patisserie: [
      '케이크',
      '파티스리',
      '파티세리',
      '타르트',
      '마카롱',
      '파이',
      'patisserie',
    ],
    donut_cookie: [
      '도넛',
      '도너츠',
      '쿠키',
      'donut',
      'cookie',
    ],
    ice_cream_gelato: [
      '아이스크림',
      '젤라또',
      'gelato',
      'ice cream',
    ],
    bingsu: [
      '빙수',
    ],
    traditional_dessert: [
      '떡',
      '한과',
      '전통디저트',
      '약과',
    ],
    takeout_dessert: [
      '테이크아웃',
      '디저트전문',
      '푸딩',
      '초콜릿',
      '초코',
      '초콜렛',
      'takeout',
      '디저트바',
      '디저트',
    ],
  },
  bar: {
    wine_bar: [
      '와인바',
      '와인',
      'wine',
    ],
    cocktail_bar: [
      '칵테일바',
      '칵테일',
      'cocktail',
      'mixology',
    ],
    pub: [
      '펍',
      '호프',
      '맥주',
      '비어',
      'beer',
      'pub',
    ],
    izakaya: [
      '이자카야',
      'izakaya',
    ],
    pocha: [
      '포차',
      '실내포차',
      '포장마차',
    ],
    brewery: [
      '브루어리',
      '수제맥주',
      'brewery',
    ],
    whiskey_bar: [
      '위스키바',
      '위스키',
      'whisky',
      'whiskey',
    ],
    traditional_alcohol: [
      '전통주',
      '막걸리',
      'makgeolli',
    ],
  },
  activity: {
    exhibition_gallery: [
      '전시',
      '갤러리',
      '미술관',
      '아트',
      '문화공간',
      '뮤지엄',
      '아트센터',
      'gallery',
      'museum',
    ],
    performance: [
      '공연',
      '극장',
      '콘서트',
      '라이브',
      '연극',
      '뮤지컬',
      '소극장',
      'theater',
      'theatre',
    ],
    one_day_class: [
      '원데이클래스',
      '클래스',
      '공방',
      '체험',
      '만들기',
      '워크숍',
      '워크샵',
      'studio',
    ],
    escape_game: [
      '방탈출',
      '보드게임',
      '게임',
      'vr',
      '게임파티룸',
    ],
    sports: [
      '스포츠',
      '볼링',
      '클라이밍',
      '테니스',
      '골프',
      '요가',
      '필라테스',
      '러닝',
      '축구',
      '야구',
      '농구',
    ],
    arcade_entertainment: [
      '노래방',
      '만화카페',
      'pc방',
      '오락',
      '엔터테인먼트',
      '파티룸',
      '셀프사진',
      '포토부스',
      '사진관',
      '포토오브제',
      '코인노래',
    ],
  },
  shopping: {
    select_shop: [
      '편집샵',
      '셀렉트샵',
      '쇼룸',
      'showroom',
      'select shop',
    ],
    lifestyle_goods: [
      '소품샵',
      '라이프스타일',
      '문구',
      '잡화',
      '굿즈',
      '오브제',
      '소품',
      '생활용품',
      '스테이셔너리',
    ],
    bookstore: [
      '서점',
      '책방',
      '북스토어',
      'bookstore',
      'books',
    ],
    vintage: [
      '빈티지',
      '구제',
      'vintage',
    ],
    flower_shop: [
      '플라워샵',
      '꽃집',
      '플라워',
      'flower',
    ],
    beauty_fragrance: [
      '향수',
      '뷰티',
      '화장품',
      '코스메틱',
      '퍼퓸',
      'perfume',
      'cosmetic',
    ],
  },
  walk_nature: {
    park: [
      '공원',
      'park',
    ],
    river_hangang: [
      '한강',
      '하천',
      '천변',
      '강변',
      '호수',
      '수변',
      'river',
      'lake',
    ],
    mountain_hike: [
      '북한산',
      '관악산',
      '백련산',
      '산',
      '등산',
      '둘레길',
      '국립공원',
      'mountain',
      'hike',
    ],
    street_alley: [
      '골목',
      '거리',
      '로드',
      'street',
      'alley',
    ],
    trail_forest: [
      '산책로',
      '숲길',
      '숲',
      '정원',
      '수목원',
      'forest',
      'garden',
      'trail',
    ],
  },
  landmark_view: {
    landmark: [
      '랜드마크',
      '명소',
      '광장',
      '타워',
      '스카이워크',
      '출렁다리',
      '다리',
      'landmark',
      'tower',
    ],
    museum: [
      '박물관',
      'museum',
    ],
    observatory: [
      '전망대',
      '전망',
      'observatory',
    ],
    palace_history: [
      '고궁',
      '궁',
      '역사',
      '유적',
      '문화재',
      '경복궁',
      'palace',
      'history',
    ],
    photo_spot: [
      '포토스팟',
      '포토존',
      '사진',
      'photo spot',
    ],
    night_view: [
      '야경',
      '나이트뷰',
      'night view',
    ],
  },
  rest: {
    spa: [
      '스파',
      'spa',
    ],
    sauna_jjimjilbang: [
      '사우나',
      '찜질방',
      'jjimjilbang',
      'sauna',
    ],
    massage: [
      '마사지',
      'massage',
    ],
    healing_space: [
      '힐링',
      '휴식',
      '테라피',
      'therapy',
    ],
  },
};

const CID_PATH_SUBCATEGORY_RULES = {
  meal: {
    '220036>220037>220053': 'korean',
    '220036>220037>220075>220733': 'korean',
    '220036>220037>220075>220764>221440': 'korean',
    '220036>220037>220075>220765>221458': 'korean',
    '220036>220037>220076>220792>221629': 'korean',
    '220036>220038>220081>220804': 'japanese',
    '220036>220038>220082>220812': 'japanese',
    '220036>220038>220087>220844': 'japanese',
    '220036>220038>220087>1002568': 'japanese',
    '220036>220038>220087>1005859': 'japanese',
    '220036>220038>220089>220850': 'japanese',
    '220036>220039>220091>220861': 'chinese',
    '220036>220040>220094': 'asian',
    '220036>220044>220126': 'western',
    '220036>220044>220127>220913': 'western',
    '220036>220044>220128': 'western',
    '220036>220044>220129': 'western',
    '220036>220044>220133>220932': 'brunch',
    '220036>220044>220136>220944': 'western',
    '220036>220044>220137>220994': 'western',
    '220036>220044>220138>221004': 'western',
    '220036>220049>220245': 'korean',
  },
  cafe: {
    '220036>220052>220564>221161': 'bakery_cafe',
    '220036>220052>220565>221177': 'dessert_cafe',
  },
  bar: {
    '220036>220051>220552>221043': 'pocha',
    '220036>220051>220553>221078': 'pub',
    '220036>220051>220555>221119': 'wine_bar',
    '220036>220051>220556>221121': 'izakaya',
  },
  activity: {
    '221845>221846>221852': 'exhibition_gallery',
    '221845>221846>221855>229126': 'exhibition_gallery',
    '221845>221846>221856': 'exhibition_gallery',
    '222117>222120>221851>221884': 'exhibition_gallery',
    '222117>222120>221851>221890': 'exhibition_gallery',
    '222117>222120>221851>221891': 'exhibition_gallery',
    '221986>221988>222035': 'sports',
    '223267>223270>223302': 'arcade_entertainment',
    '223267>223270>223305': 'arcade_entertainment',
    '223267>226396>1001484': 'one_day_class',
  },
  shopping: {
    '222412>222415>222440': 'bookstore',
    '223563>223569>223669': 'beauty_fragrance',
    '223563>223570>223698': 'lifestyle_goods',
    '223563>223570>223699>224214': 'select_shop',
    '223563>223570>223702>226553': 'lifestyle_goods',
    '223563>223571>223705>224265': 'select_shop',
    '223563>223572>223716': 'lifestyle_goods',
    '223563>223572>223717>224300': 'bookstore',
    '223563>223572>223718>224313': 'lifestyle_goods',
    '223563>223572>223718>224314': 'lifestyle_goods',
  },
  walk_nature: {
    '227616>227755>227757>227761': 'street_alley',
  },
  landmark_view: {
    '222117>222123>222179': 'palace_history',
    '221845>221846>221850>221882': 'landmark',
  },
  rest: {
    '222117>222121>222160>232110': 'spa',
  },
};

const PRIMARY_CATEGORY_FALLBACKS = {
  cafe: {
    subCategory: 'specialty_coffee',
    confidence: 0.74,
    categorySignals: ['CAFE', '카페', '커피'],
  },
};

const TAG_VOCABULARY = new Set([
  'quiet',
  'aesthetic',
  'trendy',
  'cozy',
  'lively',
  'romantic',
  'traditional',
  'modern',
  'hidden',
  'local',
  'touristy',
  'date',
  'friends',
  'solo',
  'family',
  'group',
  'business',
  'morning',
  'brunch',
  'lunch',
  'afternoon',
  'evening',
  'late_night',
  'view',
  'rooftop',
  'terrace',
  'photo_worthy',
  'pet_friendly',
  'reservation_recommended',
  'large_group_ok',
  'takeout',
  'dessert',
  'bakery',
  'tea',
  'coffee',
  'wine',
  'beer',
  'cocktail',
  'whiskey',
  'makgeolli',
  'spicy',
  'grill',
  'seafood',
  'noodle',
  'rice',
  'meat',
  'vegetarian_friendly',
  'rainy_day',
  'indoor',
  'outdoor',
  'walkable',
  'history',
  'culture',
  'shopping',
  'performance',
  'hands_on',
]);

const SUBCATEGORY_TAGS = {
  brunch: ['brunch', 'morning'],
  specialty_coffee: ['coffee'],
  dessert_cafe: ['dessert'],
  bakery_cafe: ['bakery'],
  book_cafe: ['quiet'],
  tea_house: ['tea'],
  rooftop_cafe: ['rooftop', 'view'],
  hanok_cafe: ['traditional', 'photo_worthy'],
  bakery: ['bakery', 'takeout'],
  cake_patisserie: ['dessert', 'takeout'],
  donut_cookie: ['dessert', 'takeout'],
  ice_cream_gelato: ['dessert'],
  bingsu: ['dessert'],
  traditional_dessert: ['dessert', 'traditional'],
  takeout_dessert: ['dessert', 'takeout'],
  wine_bar: ['wine', 'evening'],
  cocktail_bar: ['cocktail', 'evening'],
  pub: ['beer', 'evening'],
  izakaya: ['evening'],
  pocha: ['evening', 'lively'],
  brewery: ['beer', 'evening'],
  whiskey_bar: ['whiskey', 'evening'],
  traditional_alcohol: ['makgeolli', 'traditional', 'evening'],
  exhibition_gallery: ['culture', 'indoor'],
  performance: ['performance', 'culture', 'indoor'],
  one_day_class: ['hands_on', 'indoor'],
  escape_game: ['friends', 'rainy_day', 'indoor'],
  sports: [],
  arcade_entertainment: ['friends', 'rainy_day', 'indoor'],
  select_shop: ['shopping'],
  lifestyle_goods: ['shopping'],
  bookstore: ['shopping', 'quiet'],
  vintage: ['shopping'],
  flower_shop: ['shopping'],
  beauty_fragrance: ['shopping'],
  park: ['outdoor', 'walkable'],
  river_hangang: ['outdoor', 'walkable', 'view'],
  mountain_hike: ['outdoor', 'walkable'],
  street_alley: ['outdoor', 'walkable'],
  trail_forest: ['outdoor', 'walkable'],
  landmark: ['touristy', 'photo_worthy'],
  museum: ['history', 'culture', 'indoor'],
  observatory: ['view', 'photo_worthy'],
  palace_history: ['history', 'culture', 'traditional'],
  photo_spot: ['photo_worthy'],
  night_view: ['view', 'evening', 'photo_worthy'],
  spa: ['indoor'],
  sauna_jjimjilbang: ['indoor'],
  massage: ['indoor'],
  healing_space: ['quiet', 'indoor'],
};

const TAG_KEYWORDS = [
  { tag: 'quiet', keywords: ['조용', '한적', '고요', 'quiet'] },
  { tag: 'aesthetic', keywords: ['감성', '아트', 'aesthetic'] },
  { tag: 'trendy', keywords: ['핫플', '트렌디', 'trendy'] },
  { tag: 'cozy', keywords: ['아늑', 'cozy'] },
  { tag: 'lively', keywords: ['라이브', '클럽', '파티', 'lively'] },
  { tag: 'romantic', keywords: ['로맨틱', 'romantic'] },
  { tag: 'traditional', keywords: ['한옥', '전통', '고궁', '궁', 'traditional'] },
  { tag: 'modern', keywords: ['모던', '컨템포러리', 'modern'] },
  { tag: 'hidden', keywords: ['숨은', '히든', 'hidden'] },
  { tag: 'local', keywords: ['로컬', 'local'] },
  { tag: 'touristy', keywords: ['명소', '랜드마크', '관광', 'tourist'] },
  { tag: 'date', keywords: ['데이트', 'date'] },
  { tag: 'friends', keywords: ['친구', '보드게임', '파티룸'] },
  { tag: 'family', keywords: ['가족', '키즈', 'family'] },
  { tag: 'group', keywords: ['단체', '모임', 'group'] },
  { tag: 'business', keywords: ['비즈니스', '회의', 'business'] },
  { tag: 'morning', keywords: ['모닝', '아침', 'morning'] },
  { tag: 'brunch', keywords: ['브런치', 'brunch'] },
  { tag: 'lunch', keywords: ['점심', 'lunch'] },
  { tag: 'afternoon', keywords: ['애프터눈', 'afternoon'] },
  { tag: 'evening', keywords: ['와인', '칵테일', '위스키', '펍', 'bar'] },
  { tag: 'late_night', keywords: ['심야', '새벽', '24시', 'late night'] },
  { tag: 'view', keywords: ['전망', '뷰', '한강', '루프탑', '스카이워크', 'view'] },
  { tag: 'rooftop', keywords: ['루프탑', 'rooftop'] },
  { tag: 'terrace', keywords: ['테라스', 'terrace'] },
  { tag: 'photo_worthy', keywords: ['포토', '사진', 'photo'] },
  { tag: 'pet_friendly', keywords: ['반려견', '애견', '펫', 'pet'] },
  { tag: 'reservation_recommended', keywords: ['예약', 'reservation'] },
  { tag: 'large_group_ok', keywords: ['단체', '대형', 'large group'] },
  { tag: 'takeout', keywords: ['테이크아웃', '포장', 'takeout'] },
  { tag: 'dessert', keywords: ['디저트', '케이크', '푸딩', '빙수', 'dessert'] },
  { tag: 'bakery', keywords: ['베이커리', '빵', '브레드', 'bakery', 'bread'] },
  { tag: 'tea', keywords: ['티룸', '찻집', '전통차', '말차', '홍차', 'tea'] },
  { tag: 'coffee', keywords: ['커피', '로스터리', '에스프레소', 'coffee'] },
  { tag: 'wine', keywords: ['와인', 'wine'] },
  { tag: 'beer', keywords: ['맥주', '비어', 'beer'] },
  { tag: 'cocktail', keywords: ['칵테일', 'cocktail'] },
  { tag: 'whiskey', keywords: ['위스키', 'whiskey', 'whisky'] },
  { tag: 'makgeolli', keywords: ['막걸리', '전통주', 'makgeolli'] },
  { tag: 'spicy', keywords: ['매운', '마라', '떡볶이', 'spicy'] },
  { tag: 'grill', keywords: ['고기', '구이', '그릴', 'grill'] },
  { tag: 'seafood', keywords: ['해산물', '수산', '회', 'seafood'] },
  { tag: 'noodle', keywords: ['라멘', '우동', '소바', '국수', '면', 'noodle'] },
  { tag: 'rice', keywords: ['밥', '국밥', '덮밥', 'rice'] },
  { tag: 'meat', keywords: ['고기', '삼겹살', '갈비', '스테이크', 'meat'] },
  { tag: 'vegetarian_friendly', keywords: ['비건', '채식', 'vegan', 'vegetarian'] },
  { tag: 'rainy_day', keywords: ['실내', '방탈출', '만화카페', '찜질방'] },
  { tag: 'indoor', keywords: ['실내', 'indoor'] },
  { tag: 'outdoor', keywords: ['공원', '한강', '산책', '숲', 'outdoor'] },
  { tag: 'walkable', keywords: ['산책', '공원', '한강', '숲길', '둘레길', 'walk'] },
  { tag: 'history', keywords: ['역사', '고궁', '궁', '문화재', 'history'] },
  { tag: 'culture', keywords: ['전시', '갤러리', '미술관', '박물관', '공연', '문화', 'culture'] },
  { tag: 'shopping', keywords: ['쇼핑', '편집샵', '소품샵', '서점', 'shopping'] },
  { tag: 'performance', keywords: ['공연', '극장', '콘서트', '연극', '뮤지컬'] },
  { tag: 'hands_on', keywords: ['공방', '체험', '클래스', '만들기'] },
];

const CLASSIFICATION_SOURCE_FIELDS = [
  { key: 'categoryName', weight: 0.95 },
  { key: 'raw.mcidName', weight: 0.95 },
  { key: 'raw.category', weight: 0.95 },
  { key: 'raw.description', weight: 0.9 },
  { key: 'name', weight: 0.82 },
  { key: 'raw.name', weight: 0.82 },
  { key: 'displayName', weight: 0.82 },
  { key: 'raw.displayName', weight: 0.82 },
  { key: 'categoryCode', weight: 0.72 },
  { key: 'raw.mcid', weight: 0.72 },
  { key: 'raw.memo', weight: 0.72 },
  { key: 'address', weight: 0.55 },
];

const TAG_SOURCE_FIELDS = [
  'name',
  'displayName',
  'categoryName',
  'categoryCode',
  'raw.name',
  'raw.displayName',
  'raw.mcidName',
  'raw.category',
  'raw.description',
  'raw.memo',
];

const ADDED_FIELDS = new Set([
  'subCategory',
  'subCategoryLabel',
  'tags',
  'subcategoryClassification',
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
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.map(stringValue).filter(Boolean).join(' ');
  if (typeof value === 'object') return '';
  return String(value).trim();
}

function getByPath(value, keyPath) {
  return keyPath.split('.').reduce((current, key) => {
    if (current === undefined || current === null) return undefined;
    return current[key];
  }, value);
}

function normalizeSearchText(value) {
  return stringValue(value)
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function includesKeyword(text, keyword) {
  return text.includes(normalizeSearchText(keyword));
}

function unique(values) {
  return [...new Set(values.filter(value => value !== undefined && value !== null && value !== ''))];
}

function priorityFor(primaryCategory, subCategory) {
  const priority = SUBCATEGORY_PRIORITY[primaryCategory] || Object.keys(SUBCATEGORY_SCHEMA[primaryCategory] || {});
  const index = priority.indexOf(subCategory);
  return index === -1 ? priority.length : index;
}

function buildSourceTexts(place, sourceFields) {
  return sourceFields
    .map(source => {
      const key = typeof source === 'string' ? source : source.key;
      const rawValue = getByPath(place, key);
      const text = Array.isArray(rawValue) ? rawValue.map(stringValue).join(' ') : stringValue(rawValue);
      return {
        key,
        text: normalizeSearchText(text),
        weight: typeof source === 'string' ? undefined : source.weight,
      };
    })
    .filter(source => source.text !== '');
}

function cidPathValue(place) {
  const cidPath = place.raw?.cidPath;
  return Array.isArray(cidPath) ? cidPath.map(stringValue).filter(Boolean).join('>') : '';
}

function scoreCidPathSubcategory(place, primaryCategory) {
  const cidPath = cidPathValue(place);
  const subCategory = CID_PATH_SUBCATEGORY_RULES[primaryCategory]?.[cidPath];
  if (!subCategory) return null;

  return {
    subCategory,
    score: 0.9,
    matchedKeywords: [`cidPath:${cidPath}`],
    sourceFields: ['raw.cidPath'],
    priority: priorityFor(primaryCategory, subCategory),
  };
}

function mergeCandidates(candidates) {
  const bySubcategory = new Map();

  for (const candidate of candidates.filter(Boolean)) {
    const existing = bySubcategory.get(candidate.subCategory);
    if (!existing) {
      bySubcategory.set(candidate.subCategory, {
        ...candidate,
        matchedKeywords: [...candidate.matchedKeywords],
        sourceFields: [...candidate.sourceFields],
      });
      continue;
    }

    existing.score = Math.max(existing.score, candidate.score);
    existing.matchedKeywords = unique([
      ...existing.matchedKeywords,
      ...candidate.matchedKeywords,
    ]);
    existing.sourceFields = unique([
      ...existing.sourceFields,
      ...candidate.sourceFields,
    ]);
  }

  return [...bySubcategory.values()].sort((left, right) => (
    right.score - left.score
    || left.priority - right.priority
    || left.subCategory.localeCompare(right.subCategory)
  ));
}

function getPrimaryCategoryFallback(place, primaryCategory) {
  const fallback = PRIMARY_CATEGORY_FALLBACKS[primaryCategory];
  if (!fallback) return null;

  const signalSources = buildSourceTexts(place, [
    'categoryCode',
    'categoryName',
    'raw.mcid',
    'raw.mcidName',
  ]);
  const matchedSignals = [];
  const sourceFields = [];

  for (const source of signalSources) {
    for (const signal of fallback.categorySignals) {
      if (includesKeyword(source.text, signal)) {
        matchedSignals.push(signal);
        sourceFields.push(source.key);
      }
    }
  }

  if (matchedSignals.length === 0) return null;

  return {
    subCategory: fallback.subCategory,
    subCategoryLabel: SUBCATEGORY_SCHEMA[primaryCategory][fallback.subCategory],
    confidence: fallback.confidence,
    matchedKeywords: unique(matchedSignals),
    sourceFields: unique(sourceFields),
    needsReview: false,
    reason: `Applied primary-category fallback for ${primaryCategory} from ${unique(sourceFields).join(', ')}`,
    candidateSubcategories: [{
      subCategory: fallback.subCategory,
      confidence: fallback.confidence,
      matchedKeywords: unique(matchedSignals),
      sourceFields: unique(sourceFields),
    }],
  };
}

function scoreSubcategory(place, primaryCategory, subCategory) {
  const keywords = SUBCATEGORY_KEYWORDS[primaryCategory]?.[subCategory] || [];
  const sources = buildSourceTexts(place, CLASSIFICATION_SOURCE_FIELDS);
  const matchedKeywords = [];
  const sourceFields = [];
  let maxSourceWeight = 0;

  for (const source of sources) {
    for (const keyword of keywords) {
      if (includesKeyword(source.text, keyword)) {
        matchedKeywords.push(keyword);
        sourceFields.push(source.key);
        maxSourceWeight = Math.max(maxSourceWeight, source.weight);
      }
    }
  }

  if (matchedKeywords.length === 0) {
    return null;
  }

  const keywordBonus = Math.min(0.1, (unique(matchedKeywords).length - 1) * 0.03);
  const sourceBonus = Math.min(0.05, (unique(sourceFields).length - 1) * 0.02);
  const score = Math.min(1, maxSourceWeight + keywordBonus + sourceBonus);

  return {
    subCategory,
    score: Number(score.toFixed(2)),
    matchedKeywords: unique(matchedKeywords),
    sourceFields: unique(sourceFields),
    priority: priorityFor(primaryCategory, subCategory),
  };
}

function classifySubcategory(place) {
  const primaryCategory = place.primaryCategory;
  if (!VALID_PRIMARY_CATEGORIES.has(primaryCategory)) {
    return {
      subCategory: null,
      subCategoryLabel: null,
      confidence: 0,
      matchedKeywords: [],
      sourceFields: [],
      needsReview: true,
      reason: `Invalid primaryCategory ${primaryCategory}`,
      candidateSubcategories: [],
    };
  }

  const candidates = mergeCandidates([
    scoreCidPathSubcategory(place, primaryCategory),
    ...Object.keys(SUBCATEGORY_SCHEMA[primaryCategory])
      .map(subCategory => scoreSubcategory(place, primaryCategory, subCategory)),
  ]);

  if (candidates.length === 0) {
    const fallback = getPrimaryCategoryFallback(place, primaryCategory);
    if (fallback) return fallback;

    return {
      subCategory: null,
      subCategoryLabel: null,
      confidence: 0,
      matchedKeywords: [],
      sourceFields: [],
      needsReview: true,
      reason: `No reliable subcategory keyword matched under primaryCategory ${primaryCategory}`,
      candidateSubcategories: [],
    };
  }

  const top = candidates[0];
  const second = candidates[1];
  const hasSimilarConflict = Boolean(second)
    && top.score - second.score <= 0.08
    && top.priority >= second.priority;
  const confidence = top.score;
  const needsReview = confidence < 0.7 || hasSimilarConflict;
  const subCategory = needsReview ? null : top.subCategory;
  const subCategoryLabel = subCategory ? SUBCATEGORY_SCHEMA[primaryCategory][subCategory] : null;
  const reason = hasSimilarConflict
    ? `Conflicting subcategory scores under primaryCategory ${primaryCategory}: ${top.subCategory} ${top.score}, ${second.subCategory} ${second.score}`
    : top.sourceFields.includes('raw.cidPath')
      ? `Matched Naver cidPath pattern ${top.matchedKeywords.find(keyword => keyword.startsWith('cidPath:'))?.replace('cidPath:', '')} under primaryCategory ${primaryCategory} for subCategory ${top.subCategory}`
    : `Matched keyword ${top.matchedKeywords[0]} under primaryCategory ${primaryCategory} for subCategory ${top.subCategory}`;

  return {
    subCategory,
    subCategoryLabel,
    confidence,
    matchedKeywords: top.matchedKeywords,
    sourceFields: top.sourceFields,
    needsReview,
    reason,
    candidateSubcategories: candidates.map(candidate => ({
      subCategory: candidate.subCategory,
      confidence: candidate.score,
      matchedKeywords: candidate.matchedKeywords,
      sourceFields: candidate.sourceFields,
    })),
  };
}

function detectKeywordTags(place) {
  const sources = buildSourceTexts(place, TAG_SOURCE_FIELDS);
  const text = sources.map(source => source.text).join(' ');
  return TAG_KEYWORDS
    .filter(rule => rule.keywords.some(keyword => includesKeyword(text, keyword)))
    .map(rule => rule.tag);
}

function classifyTags(place, subCategory) {
  const tags = new Set();

  for (const tag of detectKeywordTags(place)) {
    tags.add(tag);
  }

  for (const tag of SUBCATEGORY_TAGS[subCategory] || []) {
    tags.add(tag);
  }

  return [...tags].filter(tag => TAG_VOCABULARY.has(tag)).sort();
}

function enrichPlace(place) {
  const classification = classifySubcategory(place);
  const tags = classification.subCategory
    ? classifyTags(place, classification.subCategory)
    : detectKeywordTags(place).filter(tag => TAG_VOCABULARY.has(tag)).sort();

  return {
    ...place,
    subCategory: classification.subCategory,
    subCategoryLabel: classification.subCategoryLabel,
    tags: unique(tags),
    subcategoryClassification: {
      method: 'rule',
      confidence: classification.confidence,
      matchedKeywords: classification.matchedKeywords,
      sourceFields: classification.sourceFields,
      needsReview: classification.needsReview,
      reason: classification.reason,
      candidateSubcategories: classification.candidateSubcategories,
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

function countSubcategoriesByPrimary(places) {
  return places.reduce((counts, place) => {
    if (!counts[place.primaryCategory]) counts[place.primaryCategory] = {};
    const subCategory = place.subCategory || '<needs_review>';
    counts[place.primaryCategory][subCategory] = (
      counts[place.primaryCategory][subCategory] || 0
    ) + 1;
    return counts;
  }, {});
}

function tagFrequencyCounts(places) {
  const counts = {};
  for (const place of places) {
    for (const tag of place.tags || []) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(counts).sort((left, right) => (
    right[1] - left[1] || left[0].localeCompare(right[0])
  )));
}

function rawCategoryKey(place) {
  const code = stringValue(place.categoryCode || place.raw?.mcid) || '<missing>';
  const name = stringValue(place.categoryName || place.raw?.mcidName) || '<missing>';
  return `${code} / ${name}`;
}

function placeExample(place) {
  return {
    id: place.id,
    name: place.name,
    primaryCategory: place.primaryCategory,
    subCategory: place.subCategory,
    subCategoryLabel: place.subCategoryLabel,
    confidence: place.subcategoryClassification.confidence,
    matchedKeywords: place.subcategoryClassification.matchedKeywords,
    sourceFields: place.subcategoryClassification.sourceFields,
    tags: place.tags,
    reason: place.subcategoryClassification.reason,
  };
}

function stripAddedFields(place) {
  return Object.fromEntries(
    Object.entries(place).filter(([key]) => !ADDED_FIELDS.has(key))
  );
}

function validate(inputPlaces, outputPlaces) {
  const invalidPrimaryCategoryPlaces = [];
  const invalidSubcategoryPlaces = [];
  const tagsNotArrayPlaces = [];
  const changedExistingFieldPlaces = [];

  outputPlaces.forEach((place, index) => {
    if (!VALID_PRIMARY_CATEGORIES.has(place.primaryCategory)) {
      invalidPrimaryCategoryPlaces.push(placeExample(place));
    }

    const allowedSubcategories = SUBCATEGORY_SCHEMA[place.primaryCategory] || {};
    if (
      place.subCategory !== null
      && !Object.prototype.hasOwnProperty.call(allowedSubcategories, place.subCategory)
    ) {
      invalidSubcategoryPlaces.push(placeExample(place));
    }

    if (!Array.isArray(place.tags)) {
      tagsNotArrayPlaces.push(placeExample(place));
    }

    if (JSON.stringify(stripAddedFields(inputPlaces[index])) !== JSON.stringify(stripAddedFields(place))) {
      changedExistingFieldPlaces.push(placeExample(place));
    }
  });

  return {
    inputCount: inputPlaces.length,
    outputCount: outputPlaces.length,
    expectedPlaceCount: EXPECTED_PLACE_COUNT,
    inputCountMatchesExpected: inputPlaces.length === EXPECTED_PLACE_COUNT,
    outputCountMatchesExpected: outputPlaces.length === EXPECTED_PLACE_COUNT,
    primaryCategoriesValid: invalidPrimaryCategoryPlaces.length === 0,
    invalidPrimaryCategoryCount: invalidPrimaryCategoryPlaces.length,
    invalidPrimaryCategoryExamples: invalidPrimaryCategoryPlaces.slice(0, 10),
    subcategoriesAllowedForPrimaryCategory: invalidSubcategoryPlaces.length === 0,
    invalidSubcategoryCount: invalidSubcategoryPlaces.length,
    invalidSubcategoryExamples: invalidSubcategoryPlaces.slice(0, 10),
    tagsAlwaysArray: tagsNotArrayPlaces.length === 0,
    tagsNotArrayCount: tagsNotArrayPlaces.length,
    tagsNotArrayExamples: tagsNotArrayPlaces.slice(0, 10),
    existingFieldsPreserved: changedExistingFieldPlaces.length === 0,
    changedExistingFieldCount: changedExistingFieldPlaces.length,
    changedExistingFieldExamples: changedExistingFieldPlaces.slice(0, 10),
  };
}

function topEntries(counts, limit = 20) {
  return Object.entries(counts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit);
}

function topNameKeywords(places, limit = 30) {
  const stopwords = new Set([
    '서울',
    '서울시',
    '서울특별시',
    '강남',
    '홍대',
    '성수',
    '연남',
    '압구정',
    '합정',
    '신사',
    '안국',
    '카페',
    '맛집',
    '본점',
  ]);
  const counts = {};

  places.forEach(place => {
    const text = normalizeSearchText([place.name, place.displayName].join(' '));
    const tokens = text.match(/[가-힣a-z0-9]{2,}/g) || [];
    tokens.forEach(token => {
      if (stopwords.has(token) || token.endsWith('점')) return;
      counts[token] = (counts[token] || 0) + 1;
    });
  });

  return topEntries(counts, limit);
}

function examplesByPrimaryCategory(places, limit = 10) {
  return places.reduce((examples, place) => {
    if (!examples[place.primaryCategory]) examples[place.primaryCategory] = [];
    if (examples[place.primaryCategory].length < limit) {
      examples[place.primaryCategory].push(placeExample(place));
    }
    return examples;
  }, {});
}

function reviewReasonSummary(reviewPlaces) {
  const genericDiningReviews = reviewPlaces.filter(place => (
    place.primaryCategory === 'meal'
    && (place.categoryCode === 'DINING' || place.raw?.mcid === 'DINING')
    && (place.categoryName === '음식점' || place.raw?.mcidName === '음식점')
  ));
  const genericBarReviews = reviewPlaces.filter(place => (
    place.primaryCategory === 'bar'
    && (place.categoryCode === 'BAR' || place.raw?.mcid === 'BAR')
    && (place.categoryName === 'BAR' || place.raw?.mcidName === 'BAR')
  ));
  const broadCategoryReviews = reviewPlaces.filter(place => (
    ['GENERAL', 'ADDRESS', 'LIFE_CULTURE', 'TRAVEL', 'SHOPPING'].includes(place.categoryCode)
  ));
  const conflictReviews = reviewPlaces.filter(place => (
    place.subcategoryClassification.reason.startsWith('Conflicting subcategory scores')
  ));
  const noCandidateReviews = reviewPlaces.filter(place => (
    place.subcategoryClassification.reason.startsWith('No reliable subcategory keyword matched')
  ));

  return [
    {
      reason: 'Generic DINING / 음식점 remains unresolved without a cuisine-specific cidPath or name signal',
      count: genericDiningReviews.length,
    },
    {
      reason: 'Generic BAR remains unresolved when cidPath/name does not identify wine, pub, izakaya, pocha, brewery, whiskey, or traditional alcohol',
      count: genericBarReviews.length,
    },
    {
      reason: 'Broad non-dining category metadata remains unresolved without an allowed subcategory signal',
      count: broadCategoryReviews.length,
    },
    {
      reason: 'No subcategory candidate matched any deterministic keyword, cidPath, or fallback rule',
      count: noCandidateReviews.length,
    },
    {
      reason: 'Multiple candidate subcategories had similar scores',
      count: conflictReviews.length,
    },
  ].sort((left, right) => right.count - left.count);
}

function analyzeReviewPatterns(reviewPlaces) {
  return {
    reviewCountByPrimaryCategory: countBy(reviewPlaces, place => place.primaryCategory),
    topCategoryNameValues: topEntries(countBy(reviewPlaces, place => stringValue(place.categoryName) || '<missing>'), 20),
    topRawMcidNameValues: topEntries(countBy(reviewPlaces, place => stringValue(place.raw?.mcidName) || '<missing>'), 20),
    topRawCidPathPatterns: topEntries(countBy(reviewPlaces, place => cidPathValue(place) || '<missing>'), 30),
    topCategoryCodeValues: topEntries(countBy(reviewPlaces, place => stringValue(place.categoryCode) || '<missing>'), 20),
    topNameKeywords: topNameKeywords(reviewPlaces, 40),
    examplesByPrimaryCategory: examplesByPrimaryCategory(reviewPlaces, 10),
    biggestReasonsPlacesWereNotSubcategorized: reviewReasonSummary(reviewPlaces),
  };
}

function buildReport(inputPlaces, outputPlaces, reviewPlaces) {
  const successfulPlaces = outputPlaces.filter(place => !place.subcategoryClassification.needsReview);
  const unresolvedRawCategoryCounts = countBy(reviewPlaces, rawCategoryKey);
  const validation = validate(inputPlaces, outputPlaces);

  return {
    generatedAt: new Date().toISOString(),
    inputFile: path.relative(ROOT_DIR, INPUT_FILE),
    outputFiles: {
      subcategorized: path.relative(ROOT_DIR, SUBCATEGORIZED_OUT_FILE),
      reviewQueue: path.relative(ROOT_DIR, REVIEW_OUT_FILE),
    },
    totalPlaces: outputPlaces.length,
    validSubCategoryCount: successfulPlaces.length,
    needsSubcategoryReviewCount: reviewPlaces.length,
    countByPrimaryCategory: countBy(outputPlaces, place => place.primaryCategory),
    countBySubCategoryUnderPrimaryCategory: countSubcategoriesByPrimary(outputPlaces),
    topRawCategoryNamesThatCouldNotBeSubcategorized: topEntries(unresolvedRawCategoryCounts, 20),
    reviewQueuePatternAnalysis: analyzeReviewPatterns(reviewPlaces),
    successfulExamples: successfulPlaces.slice(0, 10).map(placeExample),
    reviewNeededExamples: reviewPlaces.slice(0, 10).map(placeExample),
    tagFrequencyCounts: tagFrequencyCounts(outputPlaces),
    validation,
    validationPassed: Object.values({
      inputCountMatchesExpected: validation.inputCountMatchesExpected,
      outputCountMatchesExpected: validation.outputCountMatchesExpected,
      primaryCategoriesValid: validation.primaryCategoriesValid,
      subcategoriesAllowedForPrimaryCategory: validation.subcategoriesAllowedForPrimaryCategory,
      tagsAlwaysArray: validation.tagsAlwaysArray,
      existingFieldsPreserved: validation.existingFieldsPreserved,
    }).every(Boolean),
  };
}

function printSummary(report) {
  console.log(`Total places: ${report.totalPlaces}`);
  console.log(`Subcategorized: ${report.validSubCategoryCount}`);
  console.log(`Needs subcategory review: ${report.needsSubcategoryReviewCount}`);

  console.log('\nTop subcategory counts:');
  const flatSubcategoryCounts = {};
  Object.values(report.countBySubCategoryUnderPrimaryCategory).forEach(counts => {
    Object.entries(counts).forEach(([subCategory, count]) => {
      flatSubcategoryCounts[subCategory] = (flatSubcategoryCounts[subCategory] || 0) + count;
    });
  });
  topEntries(flatSubcategoryCounts, 15).forEach(([subCategory, count]) => {
    console.log(`  ${subCategory}: ${count}`);
  });

  console.log('\nTop tag counts:');
  topEntries(report.tagFrequencyCounts, 15).forEach(([tag, count]) => {
    console.log(`  ${tag}: ${count}`);
  });

  console.log(`\nValidation passed: ${report.validationPassed}`);
  console.log(`Output written: ${path.relative(ROOT_DIR, SUBCATEGORIZED_OUT_FILE)}`);
  console.log(`Review queue written: ${path.relative(ROOT_DIR, REVIEW_OUT_FILE)}`);
  console.log(`Report written: ${path.relative(ROOT_DIR, REPORT_OUT_FILE)}`);
}

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error(`Input file does not exist: ${path.relative(ROOT_DIR, INPUT_FILE)}`);
  }

  const inputPlaces = readJsonFile(INPUT_FILE);
  if (!Array.isArray(inputPlaces)) {
    throw new Error(`Expected an array of places in ${path.relative(ROOT_DIR, INPUT_FILE)}`);
  }

  const outputPlaces = inputPlaces.map(enrichPlace);
  const reviewPlaces = outputPlaces.filter(place => place.subcategoryClassification.needsReview);
  const report = buildReport(inputPlaces, outputPlaces, reviewPlaces);

  if (!report.validationPassed) {
    writeJsonFile(REPORT_OUT_FILE, report);
    throw new Error('Subcategory validation failed; see subcategory_classification_report.json');
  }

  writeJsonFile(SUBCATEGORIZED_OUT_FILE, outputPlaces);
  writeJsonFile(REVIEW_OUT_FILE, reviewPlaces);
  writeJsonFile(REPORT_OUT_FILE, report);
  printSummary(report);
}

main();
