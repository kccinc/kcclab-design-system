import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { SearchInput } from "../SearchInput";
import { Tabs } from "../Tabs";
import { PageHeader } from "./PageHeader";

const meta = {
  title: "Patterns/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: "주문 목록",
    description: "최근 30일 동안 들어온 주문입니다.",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 오른쪽 버튼, 제목 옆 배지(`title`에 함께 넣기), 아래 줄(탭·검색)까지 채운 모습. */
export const Full: Story = {
  args: {
    title: (
      <span className="inline-flex items-center gap-[var(--ds-space-2)]">
        주문 목록 <Badge variant="primary">128</Badge>
      </span>
    ),
    actions: (
      <>
        <Button size="sm" variant="outline" leftIcon={<Icon name="download" size="inherit" />} onClick={fn()}>
          내려받기
        </Button>
        <Button size="sm" leftIcon={<Icon name="plus" size="inherit" />} onClick={fn()}>
          주문 등록
        </Button>
      </>
    ),
    children: (
      <>
        <Tabs defaultValue="all">
          <Tabs.List className="border-b-0">
            <Tabs.Trigger value="all">전체</Tabs.Trigger>
            <Tabs.Trigger value="pending">결제 대기</Tabs.Trigger>
            <Tabs.Trigger value="done">완료</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
        <div className="ml-auto w-60">
          <SearchInput size="sm" placeholder="주문 번호·고객 이름" />
        </div>
      </>
    ),
  },
};
