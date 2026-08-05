# @kccinc/kcclab-design-system

kcclab 디자인 시스템 — React 컴포넌트 + 디자인 토큰<br/>
GitHub Packages(`npm.pkg.github.com`)로 배포

## 설치

1. GitHub → **Settings > Developer settings > Personal access tokens > Tokens (classic)** 에서 `read:packages` 스코프 체크 후 토큰 발급<br/>
(Fine-grained PAT는 GitHub Packages를 지원하지 않으니 반드시 Classic 사용)

2. `~/.npmrc`에 등록 (PowerShell):
```powershell
   Add-Content -Path $HOME\.npmrc -Encoding ascii -Value "@kccinc:registry=https://npm.pkg.github.com/"
   Add-Content -Path $HOME\.npmrc -Encoding ascii -Value "//npm.pkg.github.com/:_authToken=본인의_PAT"
```

3. 설치:
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
