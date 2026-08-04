import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled"],
    },
  },
  args: {
    placeholder: "Type a message...",
    variant: "outline",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Filled: Story = {
  args: { variant: "filled" },
};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    defaultValue: "This textarea grows with its content instead of scrolling.\n\nTry adding more lines in Storybook's controls or by typing directly.",
  },
};

export const WithCharacterCounter: Story = {
  args: {
    maxLength: 200,
    showCount: true,
    defaultValue: "Character counter tracks length as you type.",
  },
};

export const ErrorState: Story = {
  args: {
    defaultValue: "Too short",
    errorMessage: "최소 20자 이상 입력해주세요.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Can't edit this" },
};
