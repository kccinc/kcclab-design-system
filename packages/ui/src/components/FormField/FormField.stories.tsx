import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./FormField";
import { Input } from "../Input";
import { Textarea } from "../Textarea";

const meta = {
  title: "Patterns/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    label: "이메일 주소",
    // 실제 입력 요소는 각 스토리의 render에서 지정합니다 — 타입을 만족시키기 위한 placeholder.
    children: <Input />,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <FormField {...args}>
        <Input type="email" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  args: { required: true },
  render: (args) => (
    <div style={{ width: 280 }}>
      <FormField {...args}>
        <Input type="email" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const ErrorState: Story = {
  args: { required: true, errorMessage: "올바른 이메일 주소를 입력해주세요." },
  render: (args) => (
    <div style={{ width: 280 }}>
      <FormField {...args}>
        <Input type="email" defaultValue="not-an-email" />
      </FormField>
    </div>
  ),
};

export const WithTextarea: Story = {
  args: { label: "문의 내용", required: true },
  render: (args) => (
    <div style={{ width: 280 }}>
      <FormField {...args}>
        <Textarea placeholder="문의 내용을 입력해주세요" />
      </FormField>
    </div>
  ),
};
