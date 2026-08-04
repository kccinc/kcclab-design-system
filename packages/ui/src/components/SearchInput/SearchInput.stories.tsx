import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "./SearchInput";

const meta = {
  title: "Patterns/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  args: {
    placeholder: "검색어를 입력하세요",
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <SearchInput {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  args: { defaultValue: "디자인 시스템" },
  render: (args) => (
    <div style={{ width: 280 }}>
      <SearchInput {...args} />
    </div>
  ),
};
