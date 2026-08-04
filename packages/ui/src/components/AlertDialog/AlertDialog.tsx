import type { ReactElement, ReactNode } from "react";
import { Dialog } from "../Dialog";
import { Button } from "../Button";

export interface AlertDialogProps {
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
  /** 확인 버튼 클릭 시 호출됩니다. */
  onConfirm?: () => void;
}

/**
 * 취소 없이 확인만 있는 단일 액션 알림 다이얼로그 — 입력값 오류, 처리 결과 안내처럼
 * 사용자의 선택이 필요 없는 통지에 씁니다. 확인/취소가 모두 필요하면 `ConfirmDialog`를
 * 쓰세요.
 */
export function AlertDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel = "확인",
  onConfirm,
}: AlertDialogProps) {
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
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog>
  );
}
