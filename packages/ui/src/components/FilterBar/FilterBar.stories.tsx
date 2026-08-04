import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterBar } from "./FilterBar";

const meta = {
  title: "Patterns/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [status, setStatus] = useState("all");
    const [keyword, setKeyword] = useState("");
    return (
      <FilterBar
        select={{
          value: status,
          onValueChange: setStatus,
          options: [
            { value: "all", label: "전체 상태" },
            { value: "active", label: "활성" },
            { value: "inactive", label: "비활성" },
          ],
        }}
        search={{
          placeholder: "이름으로 검색",
          value: keyword,
          onChange: (e) => setKeyword(e.target.value),
        }}
        onSubmit={() => alert(`검색: ${status} / ${keyword}`)}
      />
    );
  },
};
