import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";

const meta = {
  title: "Patterns/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    defaultValue: "profile",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Trigger value="profile">프로필</Tabs.Trigger>
          <Tabs.Trigger value="account">계정</Tabs.Trigger>
          <Tabs.Trigger value="billing" disabled>
            결제 (준비 중)
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="profile">프로필 탭 내용입니다.</Tabs.Content>
        <Tabs.Content value="account">계정 탭 내용입니다.</Tabs.Content>
        <Tabs.Content value="billing">결제 탭 내용입니다.</Tabs.Content>
      </Tabs>
    </div>
  ),
};
