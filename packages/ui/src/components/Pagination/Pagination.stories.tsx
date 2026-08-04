import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination";

const meta = {
  title: "Patterns/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    totalPages: 20,
    // 실제 page/onPageChange는 각 스토리의 render에서 지정합니다 — 타입을 만족시키기 위한 placeholder.
    page: 1,
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: function Render(args) {
    const [page, setPage] = useState(1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const NearEnd: Story = {
  render: function Render(args) {
    const [page, setPage] = useState(19);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const FewPages: Story = {
  args: { totalPages: 4 },
  render: function Render(args) {
    const [page, setPage] = useState(1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};
