# 기여 가이드

## 커밋 메시지 컨벤션

이 저장소는 [Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다.

```
<type>(<scope>): <description>
```

- `type` — 아래 목록 중 하나 (필수)
- `scope` — 변경이 영향을 주는 범위, 보통 컴포넌트/토큰 이름 (선택)
- `description` — 무엇을 왜 바꿨는지 한 줄 요약. 명령형("add", "fix")으로, 소문자로 시작

### type 목록

| type       | 의미                                                              |
|------------|-------------------------------------------------------------------|
| `feat`     | 새로운 컴포넌트, 새로운 prop/variant 등 기능 추가                 |
| `fix`      | 버그 수정                                                          |
| `docs`     | 문서만 변경 (README, CLAUDE.md, JSDoc 등)                          |
| `style`    | 동작에 영향 없는 코드 스타일 변경 (포맷팅, 세미콜론 등)            |
| `refactor` | 기능 변경 없는 내부 구조 개선                                      |
| `perf`     | 성능 개선                                                          |
| `test`     | 테스트/스토리 추가 또는 수정                                       |
| `chore`    | 빌드 설정, 의존성, CI 등 그 외 잡무                                |

### 예시

```
feat(select): dropdown 너비를 트리거와 동일하게 맞춤
fix(searchinput): 지우기 버튼이 0x0으로 렌더링되던 문제 수정
docs(radiogroup): 체크 상태 인디케이터 크기 조정에 대한 코멘트 추가
chore(fonts): storybook에 pretendard 폰트 base 스타일 적용
```

Breaking change(예: prop 제거/이름 변경, `--ds-*` 변수 제거)가 있다면 description 뒤에
`!`를 붙이거나(`feat(select)!: ...`) 커밋 본문에 `BREAKING CHANGE:` 섹션을 추가하세요.

이 컨벤션은 문서화 목적이며, 커밋 시 자동으로 강제되지 않습니다 (commitlint/husky 미적용).

## Changeset

`packages/ui`를 변경하는 모든 PR은 커밋 컨벤션과 별개로 **changeset이 반드시 필요**합니다.
`pnpm changeset`을 실행해 major/minor/patch를 선택하세요 — 기준은 `CLAUDE.md`의
"Every change gets a changeset" 규칙을 참고하세요. 커밋 메시지의 `type`과 changeset의
semver bump는 서로 다른 목적입니다: 커밋 `type`은 사람이 히스토리를 읽기 위한 것이고,
changeset은 실제 배포되는 버전과 CHANGELOG를 결정합니다.
