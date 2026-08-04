import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";

const meta = {
  title: "Patterns/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const { toast } = useToast();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button onClick={() => toast({ title: "저장되었습니다", variant: "success" })}>Success</Button>
      <Button
        variant="danger"
        onClick={() => toast({ title: "삭제에 실패했습니다", description: "잠시 후 다시 시도해주세요.", variant: "danger" })}
      >
        Danger
      </Button>
      <Button variant="outline" onClick={() => toast({ title: "새로운 업데이트가 있습니다", variant: "info" })}>
        Info
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
  parameters: {
    // 기본 "Show code"는 `<Demo />`만 보여주고 그 안의 실제 toast() 호출은
    // 드러나지 않습니다 — 실제 예시 호출을 볼 수 있도록 소스를 직접 오버라이드합니다.
    docs: {
      source: {
        language: "tsx",
        code: `function Demo() {
  const { toast } = useToast();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button onClick={() => toast({ title: "저장되었습니다", variant: "success" })}>Success</Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            title: "삭제에 실패했습니다",
            description: "잠시 후 다시 시도해주세요.",
            variant: "danger",
          })
        }
      >
        Danger
      </Button>
      <Button variant="outline" onClick={() => toast({ title: "새로운 업데이트가 있습니다", variant: "info" })}>
        Info
      </Button>
    </div>
  );
}

<ToastProvider>
  <Demo />
</ToastProvider>`,
      },
    },
  },
};
