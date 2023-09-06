const heightData = [
  { value: "150이하", label: "150이하" },
  { value: "151~155", label: "151~155" },
  { value: "156~160", label: "156~160" },
  { value: "161~165", label: "161~165" },
  { value: "166~170", label: "166~170" },
  { value: "171~175", label: "171~175" },
  { value: "176~180", label: "176~180" },
  { value: "181~185", label: "181~185" },
  { value: "186~190", label: "186~190" },
  { value: "190이상", label: "190이상" },
];

const ageData = [
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
  { value: "32", label: "32" },
  { value: "33", label: "33" },
];

const ageRangeData = [
  { value: "20대 초반", label: "20대 초반" },
  { value: "20대 중반", label: "20대 중반" },
  { value: "20대 후반", label: "20대 후반" },
  { value: "30대 초반", label: "30대 초반" },
];

const bodyTypeData = [
  { value: "마름", label: "마름" },
  { value: "슬림", label: "슬림" },
  { value: "탄탄", label: "탄탄" },
  { value: "보통", label: "보통" },
  { value: "통통", label: "통통" },
  { value: "근육질", label: "근육질" },
];

const departmentData = [
  { value: "공학계열", label: "공학계열" },
  { value: "인문계열", label: "인문계열" },
  { value: "사회과학대학", label: "사회과학대학" },
  { value: "경영대학", label: "경영대학" },
  { value: "문과대학", label: "문과대학" },
  { value: "이과대학", label: "이과대학" },
  { value: "건축대학", label: "건축대학" },
  { value: "부동산과학원", label: "부동산과학원" },
  { value: "KU융합과학기술원", label: "KU융합과학기술원" },
  { value: "상허생명과학대학", label: "상허생명과학대학" },
  { value: "수의과대학", label: "수의과대학" },
];

const addressData = [
  { value: "강남구", label: "강남구" },
  { value: "강동구", label: "강동구" },
  { value: "강북구", label: "강북구" },
  { value: "강서구", label: "강서구" },
  { value: "관악구", label: "관악구" },
  { value: "광진구", label: "광진구" },
  { value: "구로구", label: "구로구" },
  { value: "금천구", label: "금천구" },
  { value: "노원구", label: "노원구" },
  { value: "도봉구", label: "도봉구" },
  { value: "동대문구", label: "동대문구" },
  { value: "동작구", label: "동작구" },
  { value: "마포구", label: "마포구" },
  { value: "서대문구", label: "서대문구" },
  { value: "서초구", label: "서초구" },
  { value: "성동구", label: "성동구" },
  { value: "성북구", label: "성북구" },
  { value: "송파구", label: "송파구" },
  { value: "양천구", label: "양천구" },
  { value: "영등포구", label: "영등포구" },
  { value: "용산구", label: "용산구" },
  { value: "은평구", label: "은평구" },
  { value: "종로구", label: "종로구" },
  { value: "중구", label: "중구" },
  { value: "중랑구", label: "중랑구" },
  { value: "경기", label: "경기" },
  { value: "인천", label: "인천" },
];

const characterData1 = [
  { value: "시크", label: "시크" },
  { value: "다정", label: "다정" },
  { value: "활발", label: "활발" },
  { value: "무던", label: "무던" },
  { value: "세심", label: "세심" },
];

const characterData2 = [
  { value: "이성적", label: "이성적" },
  { value: "감성적", label: "감성적" },
];

const mbtiData = [
  { value: "INTP", label: "INTP" },
  { value: "INTJ", label: "INTJ" },
  { value: "ISFP", label: "ISFP" },
  { value: "ISTP", label: "ISTP" },
  { value: "ISTJ", label: "ISTJ" },
  { value: "ISFJ", label: "ISFJ" },
  { value: "INFP", label: "INFP" },
  { value: "INFJ", label: "INFJ" },
  { value: "ENTP", label: "ENTP" },
  { value: "ENTJ", label: "ENTJ" },
  { value: "ENFP", label: "ENFP" },
  { value: "ENTJ", label: "ENTJ" },
  { value: "ESTP", label: "ESTP" },
  { value: "ESTJ", label: "ESTJ" },
  { value: "ESFP", label: "ESFP" },
  { value: "ESFJ", label: "ESFJ" },
];

const hobbyData = [
  { value: "걷기", label: "걷기", checked: false },
  { value: "헬스", label: "헬스", checked: false },
  { value: "여행", label: "여행", checked: false },
  { value: "등산", label: "등산", checked: false },
  { value: "축구", label: "축구", checked: false },
  { value: "배구", label: "배구", checked: false },
  { value: "농구", label: "농구", checked: false },
  { value: "야구", label: "야구", checked: false },
  { value: "자전거", label: "자전거", checked: false },
  { value: "달리기", label: "달리기", checked: false },
  { value: "마라톤", label: "마라톤", checked: false },
  { value: "유도", label: "유도", checked: false },
  { value: "태권도", label: "태권도", checked: false },
  { value: "권투", label: "권투", checked: false },
  { value: "무에타이", label: "무에타이", checked: false },
  { value: "검도", label: "검도", checked: false },
  { value: "댄스", label: "댄스", checked: false },
  { value: "산책", label: "산책", checked: false },
  { value: "수영", label: "수영", checked: false },
  { value: "수상스키", label: "수상스키", checked: false },
  { value: "서핑", label: "서핑", checked: false },
  { value: "보드게임", label: "보드게임", checked: false },
  { value: "스키", label: "스키", checked: false },
  { value: "테니스", label: "테니스", checked: false },
  { value: "베드민턴", label: "베드민턴", checked: false },
  { value: "요가", label: "요가", checked: false },
  { value: "공예", label: "공예", checked: false },
  { value: "그림", label: "그림", checked: false },
  { value: "요리", label: "요리", checked: false },
  { value: "자수", label: "자수", checked: false },
  { value: "뜨개질", label: "뜨개질", checked: false },
  { value: "사진 찍기", label: "사진 찍기", checked: false },
  { value: "서예", label: "서예", checked: false },
  { value: "글쓰기", label: "글쓰기", checked: false },
  { value: "패션", label: "패션", checked: false },
  { value: "쇼핑", label: "쇼핑", checked: false },
  { value: "게임", label: "게임", checked: false },
  { value: "블로그", label: "블로그", checked: false },
  { value: "골동품 수집", label: "골동품 수집", checked: false },
  { value: "맛집 탐방", label: "맛집 탐방", checked: false },
  { value: "재테크", label: "재테크", checked: false },
  { value: "바이올린", label: "바이올린", checked: false },
  { value: "기타", label: "기타", checked: false },
  { value: "드럼", label: "드럼", checked: false },
  { value: "피아노", label: "피아노", checked: false },
  { value: "코인노래방", label: "코인노래방", checked: false },
  { value: "풋살", label: "풋살", checked: false },
];

const hobbyData2 = [
  { value: "걷기", label: "걷기", checked: false },
  { value: "헬스", label: "헬스", checked: false },
  { value: "여행", label: "여행", checked: false },
  { value: "등산", label: "등산", checked: false },
  { value: "축구", label: "축구", checked: false },
  { value: "배구", label: "배구", checked: false },
  { value: "농구", label: "농구", checked: false },
  { value: "야구", label: "야구", checked: false },
  { value: "자전거", label: "자전거", checked: false },
  { value: "달리기", label: "달리기", checked: false },
  { value: "마라톤", label: "마라톤", checked: false },
  { value: "유도", label: "유도", checked: false },
  { value: "태권도", label: "태권도", checked: false },
  { value: "권투", label: "권투", checked: false },
  { value: "무에타이", label: "무에타이", checked: false },
  { value: "검도", label: "검도", checked: false },
  { value: "댄스", label: "댄스", checked: false },
  { value: "산책", label: "산책", checked: false },
  { value: "수영", label: "수영", checked: false },
  { value: "수상스키", label: "수상스키", checked: false },
  { value: "서핑", label: "서핑", checked: false },
  { value: "보드게임", label: "보드게임", checked: false },
  { value: "스키", label: "스키", checked: false },
  { value: "테니스", label: "테니스", checked: false },
  { value: "베드민턴", label: "베드민턴", checked: false },
  { value: "요가", label: "요가", checked: false },
  { value: "공예", label: "공예", checked: false },
  { value: "그림", label: "그림", checked: false },
  { value: "요리", label: "요리", checked: false },
  { value: "자수", label: "자수", checked: false },
  { value: "뜨개질", label: "뜨개질", checked: false },
  { value: "사진 찍기", label: "사진 찍기", checked: false },
  { value: "서예", label: "서예", checked: false },
  { value: "글쓰기", label: "글쓰기", checked: false },
  { value: "패션", label: "패션", checked: false },
  { value: "쇼핑", label: "쇼핑", checked: false },
  { value: "게임", label: "게임", checked: false },
  { value: "블로그", label: "블로그", checked: false },
  { value: "골동품 수집", label: "골동품 수집", checked: false },
  { value: "맛집 탐방", label: "맛집 탐방", checked: false },
  { value: "재테크", label: "재테크", checked: false },
  { value: "바이올린", label: "바이올린", checked: false },
  { value: "기타", label: "기타", checked: false },
  { value: "드럼", label: "드럼", checked: false },
  { value: "피아노", label: "피아노", checked: false },
  { value: "코인노래방", label: "코인노래방", checked: false },
  { value: "풋살", label: "풋살", checked: false },
];

const drinkData = [
  { value: "음주 안 함", label: "음주 안 함" },
  { value: "종종", label: "종종" },
  { value: "애주가", label: "애주가" },
];

const smokeData = [
  { value: "흡연 안 함", label: "흡연 안 함" },
  { value: "종종", label: "종종" },
  { value: "애연가", label: "애연가" },
];

const priorityData = [
  { value: "나이", label: "나이" },
  { value: "학과", label: "학과" },
  { value: "주소", label: "주소" },
  { value: "취미", label: "취미" },
  { value: "성격", label: "성격" },
  { value: "체형", label: "체형" },
  { value: "흡연 정도", label: "흡연 정도" },
  { value: "음주 정도", label: "음주 정도" },
  { value: "MBTI", label: "MBTI" },
];

export {
  heightData,
  ageData,
  ageRangeData,
  bodyTypeData,
  departmentData,
  addressData,
  characterData1,
  characterData2,
  mbtiData,
  hobbyData,
  hobbyData2,
  drinkData,
  smokeData,
  priorityData,
};
