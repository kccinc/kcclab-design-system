import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  args: {
    name: "Younghun Jeong",
    size: "md",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/128?img=12",
    alt: "Younghun Jeong",
  },
};

export const InitialsFallback: Story = {
  args: { name: "Younghun Jeong" },
};

export const BrokenImageFallsBackToInitials: Story = {
  args: {
    src: "https://this-domain-does-not-exist.example/broken.jpg",
    name: "Younghun Jeong",
  },
};

export const NoNameFallback: Story = {
  args: { name: undefined },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};
