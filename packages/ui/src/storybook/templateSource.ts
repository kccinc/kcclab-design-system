// Storybook 전용 — 패키지에서 export 하지 않습니다.
// Template 파일 원본(`?raw`)을 "앱에 그대로 복사해 쓸 수 있는 코드"로 바꿔 Docs 의 Show code 에 보여 줍니다.
//  - `../../components/*`, `../../utils/*` 상대 경로 import → `@kccinc/kcclab-design-system` 한 줄로 합침
//  - `// @story-only` 로 표시한 줄은 뺌
const PACKAGE = "@kccinc/kcclab-design-system";
const LOCAL_IMPORT = /^import\s+(type\s+)?\{([^}]*)\}\s+from\s+"\.\.\/\.\.\/(?:components|utils)\/[^"]+";\n/gm;

export function templateSource(raw: string): string {
  const values = new Set<string>();
  const types = new Set<string>();
  const body = raw
    .replace(/\r\n/g, "\n")
    .replace(LOCAL_IMPORT, (_, typeOnly: string | undefined, names: string) => {
      for (const name of names.split(",").map((n) => n.trim()).filter(Boolean)) {
        if (typeOnly || name.startsWith("type ")) types.add(name.replace(/^type\s+/, ""));
        else values.add(name);
      }
      return "";
    })
    .split("\n")
    .filter((line) => !line.includes("@story-only"))
    .join("\n");

  const sorted = (s: Set<string>) => [...s].sort((a, b) => a.localeCompare(b));
  const imports = [
    values.size ? `import { ${sorted(values).join(", ")} } from "${PACKAGE}";` : "",
    types.size ? `import type { ${sorted(types).join(", ")} } from "${PACKAGE}";` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // 외부 패키지 import(react 등) 다음, 남은 상대 경로 import(다른 Template) 앞에 패키지 import 를 넣는다.
  const lines = body.split("\n");
  const firstRelative = lines.findIndex((line) => line.startsWith("import ") && /from "\.\.?\//.test(line));
  let insertAt = 0;
  lines.forEach((line, i) => {
    if (line.startsWith("import ")) insertAt = i + 1;
  });
  if (firstRelative !== -1) insertAt = firstRelative;
  lines.splice(insertAt, 0, imports);
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
