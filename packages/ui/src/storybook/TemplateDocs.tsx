// Storybook 전용 — 패키지에서 export 하지 않습니다.
// Template 의 Docs 페이지: 미리보기 → 구조 요약(짧은 뼈대 코드) → 앱에서 바꿀 곳 → 파일별 전체 코드(접힘).
// 긴 코드를 처음부터 다 읽지 않아도 "무엇을 어디에 넣는지"와 "무엇을 고쳐야 하는지"를 먼저 알 수 있게 한다.
import { Description, Primary, Source, Stories, Title } from "@storybook/addon-docs/blocks";
import { templateSource } from "./templateSource";

export interface TemplateFile {
  /** 화면에 보일 파일 이름 (예: "menu.ts") */
  name: string;
  /** 이 파일이 맡는 일 한 줄 */
  role: string;
  /** `?raw`로 가져온 파일 원본 */
  raw: string;
}

export interface TemplateChange {
  /** 바꿀 곳 (파일·props·함수 이름) */
  where: string;
  /** 무엇으로 바꾸는지 */
  what: string;
}

export interface TemplateDocsProps {
  /** 구조만 보여 주는 짧은 코드 (20~30줄) */
  skeleton: string;
  /** 앱에 가져가서 바꿔야 하는 곳 */
  changes: TemplateChange[];
  /** 파일별 전체 코드. 앞쪽 파일일수록 먼저 읽을 파일 */
  files: TemplateFile[];
}

export function TemplateDocs({ skeleton, changes, files }: TemplateDocsProps) {
  return (
    <>
      <Title />
      <Description />
      <Primary />

      <h2>구조 요약</h2>
      <p>각 자리에 무엇을 넣는지만 남긴 뼈대입니다. 전체 코드는 아래 “파일별 코드”에 있습니다.</p>
      <Source code={skeleton} language="tsx" dark />

      <h2>앱에서 바꿀 곳</h2>
      <p>나머지(배치·스타일·상호작용)는 그대로 복사해 써도 됩니다.</p>
      <table>
        <thead>
          <tr>
            <th>바꿀 곳</th>
            <th>무엇으로</th>
          </tr>
        </thead>
        <tbody>
          {changes.map((c) => (
            <tr key={c.where}>
              <td>
                <code>{c.where}</code>
              </td>
              <td>{c.what}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>파일별 코드</h2>
      <p>
        파일 구성 그대로 앱의 한 폴더에 복사하면 됩니다. import 는 <code>@kccinc/kcclab-design-system</code> 패키지 기준으로 바꿔 두었습니다.
      </p>
      {files.map((f) => (
        <details key={f.name}>
          <summary>
            <code>{f.name}</code> — {f.role}
          </summary>
          <Source code={templateSource(f.raw)} language="tsx" dark />
        </details>
      ))}

      <Stories title="다른 상태" includePrimary={false} />
    </>
  );
}
