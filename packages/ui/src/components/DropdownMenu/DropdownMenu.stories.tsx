import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenu } from "./DropdownMenu";
import { IconButton } from "../IconButton";

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

const meta = {
  title: "Patterns/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  args: {
    // 실제 트리거는 각 스토리의 render에서 지정합니다 — 타입을 만족시키기 위한 placeholder.
    trigger: <button type="button">Open</button>,
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args} trigger={<IconButton icon={<MoreIcon />} aria-label="더보기" variant="ghost" />}>
      <DropdownMenu.Item onSelect={() => alert("수정")}>수정</DropdownMenu.Item>
      <DropdownMenu.Item onSelect={() => alert("복제")}>복제</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item onSelect={() => alert("삭제")} danger>
        삭제
      </DropdownMenu.Item>
    </DropdownMenu>
  ),
};

export const WithSubmenu: Story = {
  render: (args) => (
    <DropdownMenu {...args} trigger={<IconButton icon={<MoreIcon />} aria-label="더보기" variant="ghost" />}>
      <DropdownMenu.Item onSelect={() => alert("열기")}>열기</DropdownMenu.Item>
      <DropdownMenu.Sub trigger="공유">
        <DropdownMenu.Item onSelect={() => alert("링크 복사")}>링크 복사</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => alert("이메일로 보내기")}>이메일로 보내기</DropdownMenu.Item>
      </DropdownMenu.Sub>
      <DropdownMenu.Separator />
      <DropdownMenu.Item onSelect={() => alert("삭제")} danger>
        삭제
      </DropdownMenu.Item>
    </DropdownMenu>
  ),
};
