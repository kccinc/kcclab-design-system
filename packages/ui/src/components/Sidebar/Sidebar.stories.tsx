import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "./Sidebar";
import type { SidebarMenuItem } from "./Sidebar";

const items: SidebarMenuItem[] = [
  { id: "dashboard", label: "대시보드" },
  {
    id: "users",
    label: "사용자 관리",
    children: [
      { id: "users-list", label: "사용자 목록" },
      { id: "users-roles", label: "권한 관리", roles: ["admin"] },
    ],
  },
  {
    id: "settings",
    label: "설정",
    roles: ["admin"],
    children: [
      { id: "settings-general", label: "일반" },
      { id: "settings-billing", label: "결제" },
    ],
  },
];

const meta = {
  title: "Patterns/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  args: {
    items,
    activeId: "users-list",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AdminView: Story = {
  args: { userRoles: ["admin"] },
  render: (args) => (
    <div style={{ width: 260 }}>
      <Sidebar {...args} />
    </div>
  ),
};

export const MemberView: Story = {
  args: { userRoles: ["member"] },
  render: (args) => (
    <div style={{ width: 260 }}>
      <Sidebar {...args} />
    </div>
  ),
};
