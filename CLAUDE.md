# design-system (@kccinc/kcclab-design-system)

pnpm workspace monorepo for the kcclab design system.

- `packages/ui` — the published package (`@kccinc/kcclab-design-system`): components + design tokens, built with `tsup`.
- `.storybook`, `stories/` — Storybook, run against the built `packages/ui` output.

## Web fonts (Pretendard)

`packages/ui/src/fonts/fonts.css` declares `@font-face` for 4 static weights — Regular
(400), Medium (500), SemiBold (600), Bold (700). It expects the matching `.woff2` files
to sit right next to it in that folder, named exactly `Pretendard-Regular.woff2`,
`Pretendard-Medium.woff2`, `Pretendard-SemiBold.woff2`, `Pretendard-Bold.woff2`. **The
build fails until those 4 files exist** (tsup can't resolve the `url()`s) — that's
expected, not a bug.

This is wired into `dist/style.css` only, not into the auto-injected JS bundle
(`import '@kccinc/kcclab-design-system'` alone won't load the font). That's intentional: tsup's
`injectStyle` turns CSS into a runtime `<style>` tag, and a relative `url()` inside an
injected tag resolves against the *consuming page's* URL, not the package's — it would
404. `dist/style.css` is a real file built from `src/styles/style.css` (not
`index.css`), with `dist/fonts/*.woff2` copied right next to it, so its relative
`url()`s resolve correctly. Consumers who want the actual Pretendard font (rather than
the `-apple-system`/`system-ui` fallback in `--ds-font-family-sans`) need to explicitly
`import '@kccinc/kcclab-design-system/style.css'` once, in addition to importing components as usual.

## Commands

- `pnpm build` — build `packages/ui` with tsup (CJS + ESM + `.d.ts` + `dist/style.css`).
- `pnpm storybook` — build `packages/ui` then start Storybook dev server.
- `pnpm build-storybook` — build `packages/ui` then produce a static Storybook build.
- `pnpm typecheck` / `pnpm lint` — `tsc --noEmit` for `packages/ui`.
- `pnpm changeset` — record a changeset for the current change (see below).

## Hard rules for component work

**1. Never hardcode design values. Tokens only.**

Colors, font sizes, line heights, spacing, radius, shadows, and z-index must never appear
as literal values (hex codes, raw px, arbitrary numbers) in component code. Reference the
corresponding `--ds-*` CSS custom property instead, via a Tailwind arbitrary-value class:

```tsx
// ❌ wrong — hardcoded values
<button style={{ padding: "12px", borderRadius: "8px", background: "#3182f6" }} />
<button className="p-3 rounded-lg bg-blue-500" />  {/* Tailwind's default scale, not our tokens */}

// ✅ right — reference the design token's CSS variable
<button className="px-[var(--ds-space-3)] rounded-[var(--ds-radius-sm)] bg-[var(--ds-color-blue-500)]" />
```

All tokens are defined once, as real values, in `packages/ui/src/styles/tokens.css`
(`:root { --ds-color-blue-500: #3182f6; ... }`). This is the only file allowed to contain a
literal color/size value. Everything else — component classNames, inline styles, JS token
objects in `packages/ui/src/tokens/*.ts` — must derive from or mirror those variables, never
invent new ones. This is what lets a consuming app re-theme the whole system by overriding
`--ds-*` on `:root`, with zero changes to component code.

Token categories and where they live:

| Category    | CSS variable prefix     | Source of truth                          |
|-------------|--------------------------|-------------------------------------------|
| Color (primitive palette) | `--ds-color-{grey,blue,red,orange,yellow,green,teal,purple}-*`, `--ds-color-grey-opacity-*` | `src/styles/tokens.css`, `src/tokens/colors.ts` — **reference only, don't use directly in components** |
| Color (semantic action) | `--ds-color-primary` / `-secondary` / `-success` / `-danger` / `-warning` / `-info` (each with `-hover`, `-active`, `-light`) | same files, `colors.action` — **use this in components**, not the primitive scale |
| Color (semantic text) | `--ds-color-text-primary` / `-secondary` / `-tertiary` / `-disabled` / `-placeholder` / `-inverse` | same files, `colors.text` |
| Color (semantic border) | `--ds-color-border` / `-strong` / `-primary` / `-danger` | same files, `colors.border` |
| Color (semantic background) | `--ds-color-background` / `-grey-background` / `-layered-background` / `-floated-background` / `-inverse-background` | same files, `colors.semantic` |
| Typography  | `--ds-font-size-*` / `--ds-line-height-*` | `src/tokens/typography.ts` |
| Font family | `--ds-font-family-sans` | `src/tokens/fontFamily.ts` |
| Spacing     | `--ds-space-*`           | `src/tokens/spacing.ts` |
| Radius      | `--ds-radius-*`          | `src/tokens/radius.ts` |
| Shadow      | `--ds-shadow-elevation-*`| `src/tokens/shadow.ts` |
| Z-index     | `--ds-z-*`               | `src/tokens/zIndex.ts` |
| Icon size   | `--ds-icon-*`            | `src/tokens/iconSize.ts` |
| Opacity     | `--ds-opacity-*`         | `src/tokens/opacity.ts` |
| Border width| `--ds-border-width` / `-thick` | `src/tokens/borderWidth.ts` |
| Transition  | `--ds-transition-{fast,normal,slow}` / `-timing` | `src/tokens/transition.ts` |
| Focus ring  | `--ds-ring-color` / `-width` / `-offset-width` | `src/tokens/focusRing.ts` |
| Avatar size | `--ds-avatar-*`          | `src/tokens/avatarSize.ts` |

Where a category has both a **primitive** and a **semantic** layer (only Color does, today),
components must reference the semantic layer (`colors.action`, `colors.text`, `colors.border`,
`colors.semantic`) — never the raw primitive scale (`colors.grey`, `colors.blue`, ...). The
primitive scale exists purely so semantic tokens have somewhere to derive their value from.

If a new value is genuinely needed (a new color, a one-off spacing step), add it as a new
`--ds-*` variable in `tokens.css` (and the matching entry in `src/tokens/*.ts`) first — don't
reach for an arbitrary literal in the component to work around a missing token.

**2. Prop 설명(JSDoc)은 한글로 작성한다.**

컴포넌트 prop 타입에 다는 JSDoc 주석(`/** ... */`)은 Storybook autodocs의 Controls 표에
그대로 노출됩니다 — 반드시 한글로 씁니다. `@default` 같은 JSDoc 태그 자체는 그대로 두되,
설명 문장은 한글로 작성하세요.

```tsx
// ❌ wrong
/** Visual style. @default "primary" */
variant?: ButtonVariant;

// ✅ right
/** 비주얼 스타일. @default "primary" */
variant?: ButtonVariant;
```

(코드 식별자, 파일 경로, CSS 변수명, 클래스명 등은 번역 대상이 아닙니다 — 오직 사람이
읽는 설명 문장만 한글로 씁니다.)

**3. Size scale: `xs / sm / md / lg / xl`.**

Any component that takes a `size` prop picks its values from this 5-step scale — never
invent ad hoc names like `small`, `large`, `big`. A component doesn't have to support all
5 steps (e.g. `sm / md / lg` is fine if that's all that's needed), but whichever steps it
does support must be named from this scale. Default is `md` unless a component's spec says
otherwise.

**4. Input-family components (Input, Textarea, Select, DatePicker, ...) always include:**

- `required` — required-field flag (shows `*` via the paired `Label`).
- `error: boolean` + `errorMessage: string` — error state and its message.
- `disabled`
- `readOnly`
- `placeholder`
- Accessibility, non-negotiable: `aria-invalid` when in an error state, `aria-required`
  when `required`, and a working `htmlFor`/`id` link to its `Label`.

**5. Label / FormField 상세 규칙.**

- 라벨은 인풋 위(상단)에 배치한다. 테두리에 걸치는 notched border 방식(예: MUI outlined)은
  쓰지 않는다 — 배경색이 바뀌는 환경에서 깨지기 쉽고, 접근성 연결도 표준 방식이 더 명확하다.
- 라벨-인풋 간격은 `--ds-space-1`(4px) 또는 `--ds-space-2`(8px)로 통일한다.
- `required` 표시(`*`)는 `--ds-color-danger` 색상을 쓰고, 라벨 텍스트와 별도의 `<span>`으로
  분리한다 — 라벨과 같은 색을 쓰지 않는다.
- error 상태일 때: 인풋 테두리는 `--ds-color-border-danger`, 인풋 하단에 caption1
  크기(14px)·danger 색상의 에러 메시지, `aria-invalid="true"`를 모두 적용한다.
- 라벨 폰트 크기는 `--ds-font-size-caption1`(14px) 또는 `--ds-font-size-body3`(15px) 중
  하나를 쓰고, font-weight는 `medium`을 기본으로 한다 — `body2`(16px)는 쓰지 않는다.
- `FormField` 컴포넌트는 `Label` + 입력 요소 + 에러 메시지를 하나로 묶고, `required`/`error`
  상태를 내부 입력 요소에 자동으로 전파한다 (수동으로 두 군데에 똑같이 넘기지 않아도 됨).

**6. Clickable components always get pointer affordance.**

Button, IconButton, Switch, and any clickable Card/Tab/Accordion trigger — anything the
user clicks — gets `cursor-pointer` by default, switching to `cursor-not-allowed` when
`disabled`. Don't skip this because a click handler "obviously" implies clickability;
set the cursor explicitly.

**7. Variant/State naming.**

- Variant: pick only what a given component actually needs from
  `primary / secondary / outline / ghost / danger` (don't force all 5 onto every component).
- State: `default / hover / active / focus / disabled / loading`, again only what applies.
- Storybook coverage: you don't need a story for every variant×state combination — a
  `Default` story, one story showing all variants together, and a story per state that
  actually needs visual verification (error, disabled, loading, ...) is enough.

**8. Don't build variants/props "just in case."**

Only add a prop or variant when there's a real, current use for it — no speculative
options for combinations nobody's asked for yet. Add them later, when they're actually
needed. If it's unclear whether something is in scope, ask before building it rather than
guessing and over-building.

**9. Every new component ships with a Storybook story.**

When adding a component under `packages/ui/src/components/<Name>/`, create
`<Name>.stories.tsx` alongside it in the same PR, tagged `["autodocs"]`. The Storybook
sidebar has four top-level groups, in this fixed order (see `storySort` in
`.storybook/preview.tsx`): **Foundation → Components → Patterns → Templates**. Place a new
story in whichever group matches what it is:

- `Foundation/<Category>` — token documentation pages (Colors, Typography, Spacing, ...) under `stories/foundation/`. Not components.
- `Components/<Name>` — Batch 1-4: basic, standalone primitives (Button, Badge, Input, Checkbox, Tooltip, ...).
- `Patterns/<Name>` — Batch 5+: everything from "네비게이션"/"선택 심화"/"목록" batches onward
  (Accordion, Tabs, Select, Dialog, Table, ...) plus components literally composed from other
  components (FormField, FilterBar, Sidebar, ...). The user's own batch numbering is the
  source of truth for this split, not strictly "is it composed of other components."
- `Templates/<Name>` — full-page layouts composed from patterns/components, not reusable pieces.

```tsx
const meta = {
  title: "Components/<Name>",
  component: <Name>,
  tags: ["autodocs"],
  // ...argTypes, default args
} satisfies Meta<typeof <Name>>;
```

See rule 7 above for how much story coverage is actually needed — no component is "done"
without a story, but that doesn't mean every variant×state combination needs one.

**10. Every change gets a changeset, and it must state the right bump.**

Before merging a change to `packages/ui`, run `pnpm changeset` and pick the semver bump
based on what actually changed for a consumer:

- **major** — any breaking change: a prop renamed/removed, a prop's accepted values changed,
  a component removed, a default behavior change that could visibly break existing usage,
  a `--ds-*` variable renamed or removed.
- **minor** — additive, backward-compatible: a new component, a new prop with a safe default,
  a new variant/size option, a new exported token.
- **patch** — anything that doesn't change the public API or visible default behavior:
  bug fixes, internal refactors, doc-only changes, adding a story.

When in doubt, ask "would this force an existing consumer to change their code or notice a
visual diff they didn't ask for?" — if yes, it's at least a minor, and if it changes an
existing contract, it's a major. Write the changeset summary from the consumer's point of
view (what changed, not how), since it becomes the changelog entry.
