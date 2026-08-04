import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    placeholder: "Enter text",
    variant: "outline",
    size: "md",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Filled: Story = {
  args: { variant: "filled" },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: 280 }}>
      <Input {...args} size="sm" placeholder="Small" />
      <Input {...args} size="md" placeholder="Medium" />
      <Input {...args} size="lg" placeholder="Large" />
    </div>
  ),
};

export const WithPrefixAndSuffix: Story = {
  args: {
    prefixIcon: <SearchIcon />,
    suffixIcon: <span style={{ fontSize: 12 }}>⌘K</span>,
    placeholder: "Search...",
  },
};

export const WithCharacterCounter: Story = {
  args: {
    placeholder: "What's on your mind?",
    maxLength: 60,
    showCount: true,
  },
};

export const ErrorState: Story = {
  args: {
    defaultValue: "not-an-email",
    errorMessage: "올바른 이메일 주소를 입력해주세요.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Can't edit this" },
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: "Read-only value" },
};
