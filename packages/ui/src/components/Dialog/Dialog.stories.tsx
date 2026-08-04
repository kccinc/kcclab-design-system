import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "./Dialog";
import { Button } from "../Button";

const meta = {
  title: "Patterns/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    trigger: <Button>다이얼로그 열기</Button>,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <Dialog.Header>
        <Dialog.Title>배송지 정보</Dialog.Title>
        <Dialog.Description>주문하신 상품의 배송지를 확인해주세요.</Dialog.Description>
      </Dialog.Header>
      <Dialog.Body>
        <p style={{ margin: 0 }}>서울특별시 강남구 테헤란로 123</p>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="outline">취소</Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button>확인</Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog>
  ),
};

export const SmallSize: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Dialog {...args}>
      <Dialog.Header>
        <Dialog.Title>알림</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>저장되었습니다.</Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button>확인</Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog>
  ),
};
