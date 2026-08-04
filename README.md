# @kccinc/kcclab-design-system

kcclab 디자인 시스템 — React 컴포넌트 + 디자인 토큰을 담은 사내 전용 패키지입니다.
GitHub Packages(`npm.pkg.github.com`)로 배포되며, 공개 npm 레지스트리에는 올라가지
않습니다.

## 설치

GitHub Packages는 저장소가 private/internal이든 상관없이 **항상 인증이 필요**합니다.
아래 단계를 한 번만 해두면 이후로는 평범하게 설치할 수 있습니다.

### 1. 저장소 접근 권한 확인

GitHub Packages 권한은 저장소 권한을 그대로 따라갑니다 — 본인 GitHub 계정이
`kccinc/kcclab-design-system` 저장소에 최소 **Read** 권한이 있어야 설치가 됩니다.
접근이 안 되면 조직 관리자에게 초대를 요청하세요.

### 2. Personal Access Token 준비

`read:packages` 권한이 있는 PAT가 필요합니다.

- Classic PAT — 스코프에서 `read:packages` 체크
- Fine-grained PAT — 이 저장소에 대한 **Packages: Read** 권한 부여

### 3. `.npmrc` 설정

여러 프로젝트에서 재사용할 패키지이므로, 프로젝트별로 반복하기보다 홈 디렉토리의
전역 `~/.npmrc`에 한 번만 설정하는 걸 추천합니다.

```
@kccinc:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

토큰을 파일에 직접 적지 않고 환경변수로 참조하는 형태입니다.

### 4. 환경변수 설정

PowerShell 기준:

```powershell
$env:NPM_TOKEN = "본인의_PAT"
```

매 터미널마다 다시 설정하기 번거로우면 PowerShell 프로필(`$PROFILE`)이나 Windows
시스템 환경변수로 등록해두세요.

### 5. 설치

```bash
pnpm add @kccinc/kcclab-design-system
```

npm을 쓴다면:

```bash
npm install @kccinc/kcclab-design-system
```

## 사용법

```tsx
import { Button } from "@kccinc/kcclab-design-system";
```

Pretendard 웹폰트를 실제로 적용하려면 스타일시트를 한 번 명시적으로 import해야 합니다
— 컴포넌트만 import해서는 폰트가 로드되지 않습니다 (`-apple-system`/`system-ui`
폴백으로 보입니다):

```tsx
import "@kccinc/kcclab-design-system/style.css";
```

## 기여

프로젝트 구조, 하드 룰(토큰 사용 규칙, 컴포넌트 작성 규칙 등)은 `CLAUDE.md`를,
커밋 컨벤션은 `CONTRIBUTING.md`를 참고하세요.
