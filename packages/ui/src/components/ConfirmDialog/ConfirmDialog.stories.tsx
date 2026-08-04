import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfirmDialog } from "./ConfirmDialog";
import { Button } from "../Button";

const meta = {
  title: "Patterns/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  args: {
    title: "정말 삭제하시겠습니까?",
    description: "삭제된 데이터는 복구할 수 없습니다.",
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Destructive: Story = {
  args: {
    danger: true,
    confirmLabel: "삭제",
    trigger: <Button variant="danger">삭제</Button>,
    onConfirm: () => alert("deleted"),
  },
};

export const NonDestructive: Story = {
  args: {
    title: "변경사항을 저장할까요?",
    description: undefined,
    confirmLabel: "저장",
    trigger: <Button>저장하기</Button>,
    onConfirm: () => alert("saved"),
  },
};
