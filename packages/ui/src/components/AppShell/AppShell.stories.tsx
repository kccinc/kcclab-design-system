import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell } from "./AppShell";

function Slot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-[var(--ds-color-border-strong)] bg-[var(--ds-color-grey-background)] p-[var(--ds-space-3)] text-[length:var(--ds-font-size-caption1)] text-[var(--ds-color-text-tertiary)] ${className}`}
    >
      {label}
    </div>
  );
}

const meta = {
  title: "Patterns/AppShell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { story: { inline: false, iframeHeight: 480 } },
  },
  args: {
    header: <Slot label="header" className="h-14" />,
    sidebar: <Slot label="sidebar" className="w-56" />,
    footer: <Slot label="footer" className="h-12" />,
    children: (
      <div className="flex flex-col gap-[var(--ds-space-3)] p-[var(--ds-space-6)]">
        {Array.from({ length: 30 }, (_, i) => (
          <Slot key={i} label={`본문 ${i + 1} — 본문만 스크롤됩니다`} />
        ))}
      </div>
    ),
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 네 자리(header · sidebar · 본문 · footer)의 배치. 실제 조합 예시는 `Templates/AdminLayout`을 보세요. */
export const Default: Story = {};

/** 필요한 자리만 채울 수 있습니다 — 여기서는 header와 본문만. */
export const HeaderOnly: Story = {
  args: { sidebar: undefined, footer: undefined },
};
