import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper } from "./Stepper";

const steps = [
  { label: "장바구니" },
  { label: "배송 정보" },
  { label: "결제" },
  { label: "완료" },
];

const meta = {
  title: "Patterns/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: {
    steps,
    currentStep: 1,
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};

export const FirstStep: Story = {
  args: { currentStep: 0 },
};

export const Completed: Story = {
  args: { currentStep: 3 },
};
