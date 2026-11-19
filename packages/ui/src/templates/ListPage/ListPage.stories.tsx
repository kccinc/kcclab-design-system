import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { templateSource } from "../../storybook/templateSource";
import { ListPage } from "./ListPage";
import raw from "./ListPage.tsx?raw";

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
          "패키지에서 export 하지 않는 조합 예시라, 아래 **Show code**의 코드를 복사해 앱에 맞게 고쳐 쓰세요.",
      },
      source: { code: templateSource(raw), language: "tsx" },
      canvas: { sourceState: "shown" },
    },
  },
  args: { onOpenOrder: fn() },
} satisfies Meta<typeof ListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 주문이 하나도 없을 때. */
export const Empty: Story = { args: { orders: [] } };
