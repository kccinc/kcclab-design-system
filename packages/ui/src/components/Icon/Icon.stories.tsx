import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";
import { ICON_NAMES } from "./paths";

const meta = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ICON_NAMES },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
  },
  args: { name: "home", size: "md" },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-[var(--ds-space-4)] text-[var(--ds-color-text-primary)]">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

/** 전체 아이콘 목록 — 이름을 복사해 `name`에 넣어 쓰세요. */
export const AllIcons: Story = {
  render: (args) => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-[var(--ds-space-2)]">
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-[var(--ds-space-2)] rounded-[var(--ds-radius-sm)] border border-[var(--ds-color-border)] p-[var(--ds-space-3)] text-[var(--ds-color-text-secondary)]"
        >
          <Icon name={name} size={args.size} />
          <span className="text-[length:var(--ds-font-size-label1)] leading-[var(--ds-line-height-label1)] text-[var(--ds-color-text-tertiary)]">
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};
