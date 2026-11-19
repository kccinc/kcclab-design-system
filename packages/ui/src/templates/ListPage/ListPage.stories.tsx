import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { TemplateDocs } from "../../storybook/TemplateDocs";
import { ListPage } from "./ListPage";
import listPageRaw from "./ListPage.tsx?raw";
import ordersRaw from "./orders.ts?raw";

const skeleton = `const [draft, setDraft] = useState(EMPTY_FILTERS);       // 입력 중인 조건
const [applied, setApplied] = useState(EMPTY_FILTERS);   // [검색]을 눌러 적용된 조건

<PageHeader title="주문 목록" actions={<Button>주문 등록</Button>} />

<form onSubmit={() => setApplied(draft)}>                 {/* 검색 조건 */}
  <FormField label="주문 번호"><Input … /></FormField>
  <FormField label="고객명"><Input … /></FormField>
  <FormField label="상품명"><Input … /></FormField>
  <FormField label="상태"><Select options={STATUS_OPTIONS} … /></FormField>
  <Label>주문일</Label> <DatePicker /> ~ <DatePicker />    {/* 기간 = 날짜 두 칸 */}
  <Button variant="ghost" onClick={reset}>초기화</Button>
  <Button type="submit">검색</Button>
</form>

{rows.length === 0
  ? <EmptyState title="조건에 맞는 주문이 없습니다" … />
  : <>
      <Table columns={…} data={rows} onRowClick={onOpenOrder} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>}
`;

const meta = {
  title: "Templates/ListPage",
  component: ListPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "목록 화면 예시 — `PageHeader` + 검색 조건(주문 번호·고객명·상품명·상태·주문일 기간) + `Table` + `Pagination`, 결과가 없으면 `EmptyState`. " +
          "패키지에서 export 하지 않는 조합 예시라, 아래 코드를 복사해 앱에 맞게 고쳐 씁니다.",
      },
      source: { code: skeleton, language: "tsx" },
      page: () => (
        <TemplateDocs
          skeleton={skeleton}
          changes={[
            { where: "orders.ts → sampleOrders", what: "API 데이터로 바꿉니다. 서버에서 검색한다면 matches() 대신 Filters 를 요청 파라미터로 보내고, 페이지도 서버에서 나눕니다." },
            { where: "orders.ts → Filters / STATUS", what: "화면에 필요한 검색 조건과 상태 이름·배지 색." },
            { where: "ListPage.tsx → columns", what: "표 컬럼(이름·정렬·렌더링)." },
            { where: "onOpenOrder", what: "행을 눌렀을 때 상세 화면으로 이동하는 동작." },
            { where: "PAGE_SIZE", what: "한 페이지에 보일 행 수." },
          ]}
          files={[
            { name: "orders.ts", role: "데이터 타입·예시 데이터·검색 조건과 거르기 함수 — 가장 먼저 바꿀 곳", raw: ordersRaw },
            { name: "ListPage.tsx", role: "화면 — 헤더, 검색 조건 폼, 표, 페이지 이동, 빈 상태", raw: listPageRaw },
          ]}
        />
      ),
    },
  },
  args: { onOpenOrder: fn() },
} satisfies Meta<typeof ListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 주문이 하나도 없을 때. */
export const Empty: Story = { args: { orders: [] } };
