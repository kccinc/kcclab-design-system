import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "success", "danger", "warning", "info", "neutral"],
    },
  },
  args: {
    children: "React",
    variant: "neutral",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8 }}>
      <Tag {...args} variant="primary">
        Primary
      </Tag>
      <Tag {...args} variant="success">
        Success
      </Tag>
      <Tag {...args} variant="danger">
        Danger
      </Tag>
      <Tag {...args} variant="warning">
        Warning
      </Tag>
      <Tag {...args} variant="info">
        Info
      </Tag>
      <Tag {...args} variant="neutral">
        Neutral
      </Tag>
    </div>
  ),
};

export const Removable: Story = {
  render: function Render(args) {
    const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);
    return (
      <div style={{ display: "flex", gap: 8 }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            {...args}
            onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
          >
            {tag}
          </Tag>
        ))}
      </div>
    );
  },
};
