import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./Container";

const meta = {
  title: "Components/Container",
  component: Container,
  tags: ["autodocs"],
  args: {
    children: (
      <div style={{ background: "#e8f3ff", padding: 16, borderRadius: 8 }}>
        페이지 콘텐츠 — 좌우 여백은 Container가 반응형으로 통일합니다.
      </div>
    ),
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMaxWidth: Story = {
  args: { maxWidth: 640 },
};
