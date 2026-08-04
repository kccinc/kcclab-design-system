import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormGroup } from "./FormGroup";
import { FormField } from "../FormField";
import { Input } from "../Input";

const meta = {
  title: "Patterns/FormGroup",
  component: FormGroup,
  tags: ["autodocs"],
  args: {
    title: "배송지 정보",
    description: "상품을 받으실 주소를 입력해주세요.",
  },
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <FormGroup {...args}>
        <FormField label="수령인" required>
          <Input placeholder="홍길동" />
        </FormField>
        <FormField label="주소" required>
          <Input placeholder="서울특별시 강남구 테헤란로 123" />
        </FormField>
        <FormField label="상세 주소">
          <Input placeholder="101동 202호" />
        </FormField>
      </FormGroup>
    </div>
  ),
};
