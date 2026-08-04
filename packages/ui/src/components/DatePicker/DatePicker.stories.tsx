import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "Patterns/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 240 }}>
      <DatePicker {...args} />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: { defaultValue: new Date() },
  render: (args) => (
    <div style={{ width: 240 }}>
      <DatePicker {...args} />
    </div>
  ),
};

export const ErrorState: Story = {
  args: { errorMessage: "예약일을 선택해주세요." },
  render: (args) => (
    <div style={{ width: 240 }}>
      <DatePicker {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div style={{ width: 240 }}>
      <DatePicker {...args} />
    </div>
  ),
};
