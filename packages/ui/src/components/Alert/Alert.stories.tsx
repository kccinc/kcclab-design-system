import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta = {
  title: "Patterns/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "danger", "warning", "info"],
    },
  },
  args: {
    variant: "info",
    title: "안내",
    children: "이 작업은 몇 분 정도 걸릴 수 있습니다.",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 400 }}>
      <Alert {...args} variant="success" title="저장 완료">
        변경사항이 저장되었습니다.
      </Alert>
      <Alert {...args} variant="danger" title="오류 발생">
        요청을 처리하지 못했습니다.
      </Alert>
      <Alert {...args} variant="warning" title="주의">
        저장하지 않은 변경사항이 있습니다.
      </Alert>
      <Alert {...args} variant="info" title="안내">
        시스템 점검이 예정되어 있습니다.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  args: { onClose: () => alert("closed") },
  render: (args) => (
    <div style={{ width: 400 }}>
      <Alert {...args} />
    </div>
  ),
};
