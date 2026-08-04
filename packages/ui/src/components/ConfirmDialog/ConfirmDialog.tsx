import type { ReactElement, ReactNode } from "react";
import { Dialog } from "../Dialog";
import { Button } from "../Button";

export interface ConfirmDialogProps {
  /** 열림 상태 (controlled). */
  open?: boolean;
  /** 열림 상태 (uncontrolled) 초기값. */
  defaultOpen?: boolean;
  /** 열림 상태가 바뀔 때 호출됩니다. */
  onOpenChange?: (open: boolean) => void;
  /** 클릭 시 다이얼로그를 여는 트리거 엘리먼트. 지정하지 않으면 `open`으로 직접 제어합니다. */
  trigger?: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  /** 확인 버튼 텍스트. @default "확인" */
  confirmLabel?: string;
  /** 취소 버튼 텍스트. @default "취소" */
  cancelLabel?: string;
  /** 확인 버튼 클릭 시 호출됩니다. */
  onConfirm?: () => void;
  /** 취소 버튼 클릭 시 호출됩니다. */
  onCancel?: () => void;
  /**
   * 삭제처럼 되돌릴 수 없는 위험한 작업일 때 — 확인 버튼을 `danger` variant로
   * 표시합니다. @default false
   */
  danger?: boolean;
  /** 확인 버튼 로딩 상태 (예: 삭제 요청 중). @default false */
  isConfirming?: boolean;
}

export function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
  danger = false,
  isConfirming = false,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      trigger={trigger}
      size="sm"
      showCloseButton={false}
    >
      <Dialog.Header bordered={false} showCloseButton={false}>
        <Dialog.Title>{title}</Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}
      </Dialog.Header>
      <Dialog.Footer bordered={false}>
        <Dialog.Close asChild>
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
        </Dialog.Close>
        <Button variant={danger ? "danger" : "primary"} onClick={onConfirm} isLoading={isConfirming}>
          {confirmLabel}
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
