import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertDialog } from "./AlertDialog";
import { Button } from "../Button";

const meta = {
  title: "Patterns/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  args: {
    title: "요청값이 부족하거나 올바르지 않습니다.",
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button>알림 열기</Button>,
  },
};

export const WithDescription: Story = {
  args: {
    title: "저장되었습니다",
    description: "변경한 내용이 정상적으로 반영되었습니다.",
    trigger: <Button variant="outline">알림 열기</Button>,
  },
};
