/**
 * 디자인 토큰 (Tailwind Config)
 *
 * 사용법:
 * 기존 tailwind.config.js 에서 이 파일을 불러와 theme.extend 에 병합하세요.
 *
 * ---- tailwind.config.js ----
 * const tokens = require('./tailwind.tokens.js');
 *
 * module.exports = {
 *   content: [...],
 *   theme: {
 *     extend: {
 *       colors: tokens.colors,
 *       fontSize: tokens.fontSize,
 *     },
 *   },
 * };
 * -----------------------------
 *
 * 클래스 사용 예시:
 *   <div className="bg-blue-500 text-grey-900">
 *   <p className="text-body1 font-medium text-grey-700">일반 본문 텍스트</p>
 *   <h1 className="text-heading1 font-bold">큰 제목</h1>
 */

module.exports = {
  // ============================================================
  // Colors
  // ============================================================
  colors: {
    grey: {
      50: '#f9fafb',
      100: '#f2f4f6',
      200: '#e5e8eb',
      300: '#d1d6db',
      400: '#b0b8c1',
      500: '#8b95a1',
      600: '#6b7684',
      700: '#4e5968',
      800: '#333d4b',
      900: '#191f28',
    },
    blue: {
      50: '#e8f3ff',
      100: '#c9e2ff',
      200: '#90c2ff',
      300: '#64a8ff',
      400: '#4593fc',
      500: '#3182f6',
      600: '#2272eb',
      700: '#1b64da',
      800: '#1957c2',
      900: '#194aa6',
    },
    red: {
      50: '#ffeeee',
      100: '#ffd4d6',
      200: '#feafb4',
      300: '#fb8890',
      400: '#f66570',
      500: '#f04452',
      600: '#e42939',
      700: '#d22030',
      800: '#bc1b2a',
      900: '#a51926',
    },
    orange: {
      50: '#fff3e0',
      100: '#ffe0b0',
      200: '#ffcd80',
      300: '#ffbd51',
      400: '#ffa927',
      500: '#fe9800',
      600: '#fb8800',
      700: '#f57800',
      800: '#ed6700',
      900: '#e45600',
    },
    yellow: {
      50: '#fff9e7',
      100: '#ffefbf',
      200: '#ffe69b',
      300: '#ffdd78',
      400: '#ffd158',
      500: '#ffc342',
      600: '#ffb331',
      700: '#faa131',
      800: '#ee8f11',
      900: '#dd7d02',
    },
    green: {
      50: '#f0faf6',
      100: '#aeefd5',
      200: '#76e4b8',
      300: '#3fd599',
      400: '#15c47e',
      500: '#03b26c',
      600: '#02a262',
      700: '#029359',
      800: '#028450',
      900: '#027648',
    },
    teal: {
      50: '#edf8f8',
      100: '#bce9e9',
      200: '#89d8d8',
      300: '#58c7c7',
      400: '#30b6b6',
      500: '#18a5a5',
      600: '#109595',
      700: '#0c8585',
      800: '#097575',
      900: '#076565',
    },
    purple: {
      50: '#f9f0fc',
      100: '#edccf8',
      200: '#da9bef',
      300: '#c770e4',
      400: '#b44bd7',
      500: '#a234c7',
      600: '#9128b4',
      700: '#8222a2',
      800: '#73228e',
      900: '#65237b',
    },

    // grey에 투명도가 적용된 버전. 오버레이, 그림자, 구분선 등에 사용해요.
    // 고정된 opacity 값을 포함하고 있어서 그대로 배경색처럼 사용하면 돼요.
    'grey-opacity': {
      50: 'rgba(0, 23, 51, 0.02)',
      100: 'rgba(2, 32, 71, 0.05)',
      200: 'rgba(0, 27, 55, 0.1)',
      300: 'rgba(0, 29, 58, 0.18)',
      400: 'rgba(0, 25, 54, 0.31)',
      500: 'rgba(3, 24, 50, 0.46)',
      600: 'rgba(0, 19, 43, 0.58)',
      700: 'rgba(3, 18, 40, 0.7)',
      800: 'rgba(0, 12, 30, 0.8)',
      900: 'rgba(2, 9, 19, 0.91)',
    },

    // 배경 시맨틱 토큰: 실제 팔레트 대신 "용도"로 이름 붙여서
    // 다크모드 전환 시에도 클래스명을 바꾸지 않아도 되게 해요.
    background: '#ffffff',
    'grey-background': '#f2f4f6', // grey.100과 동일
    'layered-background': '#ffffff', // 카드/바텀시트 등 위에 얹히는 배경
    'floated-background': '#ffffff', // 플로팅 요소(툴팁, 팝오버) 배경

    // ============================================================
    // Semantic Colors
    // 컴포넌트에서는 primitive(blue-500 등)보다 이 이름을 우선 사용하세요.
    // 리브랜딩/테마 변경 시 이 값들만 바꾸면 전체 컴포넌트에 반영돼요.
    // ============================================================
    primary: {
      DEFAULT: '#3182f6', // blue.500 — 주요 액션(버튼, 링크, 활성 상태)
      hover: '#2272eb', // blue.600
      active: '#1b64da', // blue.700
      light: '#e8f3ff', // blue.50 — 옅은 배경용
    },
    secondary: {
      DEFAULT: '#6b7684', // grey.600 — 보조 액션, 덜 강조되는 버튼
      hover: '#4e5968', // grey.700
      light: '#f2f4f6', // grey.100
    },
    success: {
      DEFAULT: '#03b26c', // green.500 — 완료, 승인 상태
      hover: '#02a262', // green.600
      light: '#f0faf6', // green.50
    },
    danger: {
      DEFAULT: '#f04452', // red.500 — 삭제, 에러, 위험 액션
      hover: '#e42939', // red.600
      light: '#ffeeee', // red.50
    },
    warning: {
      DEFAULT: '#fe9800', // orange.500 — 주의, 경고
      hover: '#fb8800', // orange.600
      light: '#fff3e0', // orange.50
    },
    info: {
      DEFAULT: '#18a5a5', // teal.500 — 안내, 참고 정보
      hover: '#109595', // teal.600
      light: '#edf8f8', // teal.50
    },

    // Border: 인풋, 카드, 구분선 등 테두리 전용. text/background와 분리해서
    // "이 테두리가 어떤 쓰임인지" 이름만 보고 알 수 있게 해요.
    border: {
      DEFAULT: '#e5e8eb', // grey.200 — 카드, 인풋 기본 테두리
      strong: '#d1d6db', // grey.300 — hover 시 강조되는 테두리
      primary: '#3182f6', // 포커스된 인풋, 선택된 상태
      danger: '#f04452', // 에러 상태 인풋
    },
  },

  // ============================================================
  // Typography (fontSize)
  // Tailwind의 fontSize는 [size, { lineHeight }] 튜플 형식을 지원해요.
  // font-weight는 Tailwind 기본 유틸리티(font-light~font-bold)를 그대로 쓰면 돼요.
  // ============================================================
  fontSize: {
    // 매우 큰 제목 (온보딩, 스플래시 등 임팩트 있는 문구)
    display: ['30px', { lineHeight: '40px' }],

    // 큰 제목 (페이지 타이틀)
    heading1: ['26px', { lineHeight: '35px' }],
    // 조금 큰 제목
    heading2: ['24px', { lineHeight: '33px' }],
    // 일반 제목 (섹션 타이틀)
    heading3: ['22px', { lineHeight: '31px' }],
    // 작은 제목 (카드 타이틀)
    heading4: ['20px', { lineHeight: '29px' }],

    // 조금 큰 본문 (리스트 아이템 타이틀 등)
    subtitle1: ['19px', { lineHeight: '28px' }],
    subtitle2: ['18px', { lineHeight: '27px' }],

    // 일반 본문
    body1: ['17px', { lineHeight: '25.5px' }],
    body2: ['16px', { lineHeight: '24px' }],
    // 작은 본문
    body3: ['15px', { lineHeight: '22.5px' }],

    // 캡션 (보조 설명, 타임스탬프)
    caption1: ['14px', { lineHeight: '21px' }],
    caption2: ['13px', { lineHeight: '19.5px' }],

    // 라벨 (뱃지, 태그 등 아주 작은 텍스트)
    label1: ['12px', { lineHeight: '18px' }],
    label2: ['11px', { lineHeight: '16.5px' }],
  },

  // ============================================================
  // Spacing
  // 4px 그리드 기준. 컴포넌트 내부 padding, 요소 간 gap 등에 공통으로 사용해요.
  // Tailwind 기본 spacing(4px 단위, 1=4px)과 값이 겹치지만,
  // 팀 컨벤션 상 의미 있는 이름을 쓰고 싶을 때는 아래 키를 그대로 사용하면 돼요.
  // 예: p-space-3, gap-space-4
  // ============================================================
  spacing: {
    'space-0': '0px',
    'space-1': '4px', // 아이콘-텍스트 간 최소 간격
    'space-2': '8px', // 컴포넌트 내부 좁은 padding
    'space-3': '12px', // 인풋/버튼 기본 padding
    'space-4': '16px', // 카드 내부 padding, 리스트 아이템 간 간격
    'space-5': '20px',
    'space-6': '24px', // 섹션 내부 padding
    'space-8': '32px', // 섹션 간 간격
    'space-10': '40px',
    'space-12': '48px', // 페이지 좌우 마진 (데스크톱)
    'space-16': '64px', // 큰 섹션 구분
    'space-20': '80px',
  },

  // ============================================================
  // Border Radius
  // ============================================================
  borderRadius: {
    'radius-xs': '4px', // 뱃지, 태그
    'radius-sm': '8px', // 버튼, 인풋
    'radius-md': '12px', // 카드
    'radius-lg': '16px', // 모달, 바텀시트
    'radius-xl': '24px', // 대형 컨테이너
    'radius-full': '9999px', // 원형 (아바타, 필 버튼)
  },

  // ============================================================
  // Box Shadow
  // 엘리베이션 단계. 숫자가 커질수록 위로 더 떠 보이는 요소에 사용해요.
  // ============================================================
  boxShadow: {
    'elevation-1': '0px 1px 2px rgba(15, 23, 42, 0.06)', // 카드, 리스트 아이템
    'elevation-2': '0px 2px 8px rgba(15, 23, 42, 0.08)', // 드롭다운, 팝오버
    'elevation-3': '0px 4px 16px rgba(15, 23, 42, 0.1)', // 모달, 바텀시트
    'elevation-4': '0px 8px 24px rgba(15, 23, 42, 0.12)', // 토스트, 최상위 오버레이
  },

  // ============================================================
  // Z-Index
  // 레이어 충돌(모달 뒤에 툴팁이 깔리는 등)을 막기 위해
  // 임의의 숫자 대신 이 토큰만 쓰기로 팀 컨벤션을 정하는 걸 권장해요.
  // ============================================================
  zIndex: {
    base: '0',
    dropdown: '100',
    sticky: '200', // 고정 헤더, 사이드바
    fixed: '300', // FixedBottomCTA 등
    overlay: '400', // dimmed 배경
    modal: '500',
    'bottom-sheet': '500',
    toast: '600', // 항상 최상단
    tooltip: '700',
  },

  // ============================================================
  // Text Color
  // background/border와 마찬가지로, grey.900을 직접 쓰지 않고
  // "본문인지 보조설명인지 비활성인지" 역할 이름으로 씁니다.
  // 사용: text-text-primary, text-text-disabled 등
  // ============================================================
  textColor: {
    'text-primary': '#191f28', // grey.900 — 기본 본문 텍스트
    'text-secondary': '#4e5968', // grey.700 — 보조 설명, 서브 텍스트
    'text-tertiary': '#8b95a1', // grey.500 — 덜 중요한 정보
    'text-disabled': '#b0b8c1', // grey.400 — 비활성 상태 텍스트
    'text-placeholder': '#b0b8c1', // grey.400 — 인풋 placeholder
    'text-inverse': '#ffffff', // 어두운/컬러 배경 위에 올라가는 텍스트
  },

  // ============================================================
  // Font Family
  // ============================================================
  fontFamily: {
    sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
  },

  // ============================================================
  // Icon Size
  // 버튼/리스트 내 아이콘 크기를 통일해서 정렬이 어긋나지 않게 해요.
  // 사용: w-icon-md h-icon-md (Tailwind width/height와 병합)
  // ============================================================
  width: {
    'icon-xs': '12px',
    'icon-sm': '16px',
    'icon-md': '20px',
    'icon-lg': '24px',
    'icon-xl': '32px',
  },
  height: {
    'icon-xs': '12px',
    'icon-sm': '16px',
    'icon-md': '20px',
    'icon-lg': '24px',
    'icon-xl': '32px',
  },

  // ============================================================
  // Opacity
  // disabled/hover 상태를 색상 대신 투명도로 표현할 때 사용해요.
  // ============================================================
  opacity: {
    disabled: '0.4',
    hover: '0.8',
    pressed: '0.6',
  },

  // ============================================================
  // Border Width
  // ============================================================
  borderWidth: {
    DEFAULT: '1px', // 기본 테두리 (카드, 인풋)
    thick: '2px', // 포커스, 선택 상태 강조
  },

  // ============================================================
  // Transition
  // hover, 액션디온 피드백, 모달 등장 애니메이션 속도를 통일해요.
  // ============================================================
  transitionDuration: {
    fast: '150ms', // 버튼 hover, 작은 변화
    normal: '250ms', // 액션디온, 드롭다운
    slow: '400ms', // 모달, 바텀시트 등장
  },
  transitionTimingFunction: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // ============================================================
  // Breakpoints
  // CRM 대시보드 기준 (사이드바 접힘, 반응형 테이블 등에 사용)
  // Tailwind 기본값과 동일 — 커스텀 오버라이드가 필요 없어 별도 CSS 변수는 두지 않아요.
  // ============================================================
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px', // 사이드바 접힘 기준
    xl: '1280px',
    '2xl': '1536px',
  },

  // ============================================================
  // Focus Ring (접근성)
  // 키보드 tab 이동 시 표시되는 포커스 아웃라인.
  // 사용: focus:ring-ring-default focus:ring-offset-ring-offset
  // ============================================================
  ringColor: {
    DEFAULT: '#3182f6', // primary와 동일
  },
  ringWidth: {
    DEFAULT: '2px',
  },
  ringOffsetWidth: {
    DEFAULT: '2px',
  },
};
