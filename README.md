# @kccinc/kcclab-design-system

kcclab 디자인 시스템 — React 컴포넌트 + 디자인 토큰. GitHub Packages(`npm.pkg.github.com`)로 배포됩니다.

## 설치

GitHub Packages는 public 패키지도 인증이 필요합니다.

1. `read:packages` 권한의 Personal Access Token 발급
   - Classic PAT: `read:packages` 스코프 체크
   - Fine-grained PAT: 이 저장소에 대한 **Packages: Read** 권한 부여
2. `~/.npmrc`에 등록 (홈 디렉토리 전역 설정 권장):

   ```
   @kccinc:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=${NPM_TOKEN}
   ```

3. 환경변수 설정 (PowerShell):

   ```powershell
   $env:NPM_TOKEN = "본인의_PAT"
   ```

4. 설치:

   ```bash
   pnpm add @kccinc/kcclab-design-system
   ```

## 사용법

```tsx
import { Button } from "@kccinc/kcclab-design-system";
```

Pretendard 웹폰트를 적용하려면 스타일시트도 import (컴포넌트만 import하면 폰트는 로드되지 않습니다):

```tsx
import "@kccinc/kcclab-design-system/style.css";
```

## 기여

프로젝트 구조와 컴포넌트 규칙은 `CLAUDE.md`, 커밋 컨벤션은 `CONTRIBUTING.md`를 참고하세요.
