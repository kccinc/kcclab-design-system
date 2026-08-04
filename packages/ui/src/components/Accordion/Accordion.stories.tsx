import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta = {
  title: "Patterns/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    type: "single",
    collapsible: true,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <Accordion {...args}>
        <Accordion.Item value="a" title="배송은 얼마나 걸리나요?">
          평균 1~2일 이내에 도착합니다.
        </Accordion.Item>
        <Accordion.Item value="b" title="교환/환불은 어떻게 하나요?">
          마이페이지 &gt; 주문내역에서 신청할 수 있습니다.
        </Accordion.Item>
        <Accordion.Item value="c" title="비활성 항목" disabled>
          이 항목은 비활성화되어 있습니다.
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  args: { type: "multiple" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Accordion {...args}>
        <Accordion.Item value="a" title="섹션 A">
          섹션 A의 내용입니다.
        </Accordion.Item>
        <Accordion.Item value="b" title="섹션 B">
          섹션 B의 내용입니다.
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};
