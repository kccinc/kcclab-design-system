# @kccinc/kcclab-design-system

## 0.2.0

### Minor Changes

- 0bb8bd8: 업무 화면용 촘촘한 밀도(compact)와 앱 골격을 만드는 기본 부품을 추가했습니다.

  **밀도**

  - `<html data-density="compact">`를 붙이면 글자·간격·아이콘·아바타·컨트롤 높이가 업무 화면 크기로 줄어듭니다(본문 12px, 컨트롤 28/33/40px). 색은 그대로이고, 붙이지 않으면 지금과 똑같습니다.
  - 새 토큰: `--ds-control-height-{sm,md,lg}`, 어두운 바탕용 `--ds-color-text-inverse-secondary`·`--ds-color-border-inverse`·`--ds-color-inverse-background-hover`. JS 토큰은 `controlHeight`, `density`.
  - Button·IconButton·Input·Select·DatePicker·Pagination의 높이가 `--ds-control-height-*`를 따릅니다. 기본값은 이전과 같은 32/40/48px라 화면 변화는 없고, 앱에서 이 변수를 덮어 높이를 바꿀 수 있습니다.
  - DatePicker의 달력(칸·이동 버튼·글자 크기)도 토큰을 따라 compact에서 함께 작아집니다. 기본 크기는 이전과 같습니다.

  **새 컴포넌트**

  - `Icon` / `ICON_NAMES` — 선 아이콘 세트(Lucide 모양).
  - `EmptyState` — 내용이 없을 때의 안내.
  - `PageHeader` — 화면 제목·설명·버튼·아래 줄(탭·필터).
  - `Nav` (`Nav.Group`, `Nav.Item`) — 사이드 메뉴·아이콘 레일·하단 탭을 하나로 만드는 내비게이션 목록. 항목에 분류 글자(`overline`)·설명·오른쪽 요소(`trailing`)를 붙일 수 있습니다.
  - `AppShell` — 위·왼쪽·본문·아래 자리만 잡는 화면 배치.
  - `CommandPalette` — Ctrl+K / ⌘K 빠른 이동.

  Storybook `Templates/AdminLayout`·`Templates/Dashboard`·`Templates/ListPage`에 이 부품들을 조합한 예시 화면이 있습니다.

  **기존 컴포넌트**

  - `Sidebar`·`Breadcrumb`에 `linkComponent` prop 추가 — Next.js `Link` 같은 라우터 링크를 넘기면 페이지 전체를 새로 불러오지 않고 이동합니다. 기본값은 지금처럼 `<a>`입니다.
  - `Sidebar`: 현재 항목(`activeId`)이 하위 메뉴에 있으면 처음 그릴 때 그 상위 메뉴를 펼쳐 둡니다.

## 0.1.1

### Patch Changes

- fcfc19c: `packages/ui`에 자체 `README.md`를 추가하고, `package.json`의 `repository.url`을 실제 저장소 주소로 고쳤습니다. GitHub Packages 페이지에서 "No README data found" 오류가 뜨던 문제를 해결합니다.

## 0.1.0

### Minor Changes

- fb13212: `Signature` 컴포넌트를 추가했습니다 — 마우스/터치/펜으로 캔버스에 서명을 그리고, PNG data URL로 받을 수 있습니다. `required`/`error`/`disabled`/`readOnly`/`placeholder`를 지원하며 `FormField`와 함께 사용할 수 있습니다.
