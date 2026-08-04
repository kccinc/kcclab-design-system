import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "./Drawer";
import { Button } from "../Button";

const meta = {
  title: "Patterns/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
    },
  },
  args: {
    side: "right",
    trigger: <Button>드로어 열기</Button>,
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FromRight: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Drawer.Header>
        <Drawer.Title>필터</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <p style={{ margin: 0 }}>필터 옵션이 여기에 들어갑니다.</p>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.Close asChild>
          <Button variant="outline">닫기</Button>
        </Drawer.Close>
        <Drawer.Close asChild>
          <Button>적용</Button>
        </Drawer.Close>
      </Drawer.Footer>
    </Drawer>
  ),
};

export const FromLeft: Story = {
  args: { side: "left" },
  render: (args) => (
    <Drawer {...args}>
      <Drawer.Header>
        <Drawer.Title>메뉴</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <p style={{ margin: 0 }}>내비게이션 메뉴가 여기에 들어갑니다.</p>
      </Drawer.Body>
    </Drawer>
  ),
};
