"use client";

import { AlertDialog, Button } from "@qhkg/react";

export interface DeleteConfirmationProps {
  itemName: string;
  onConfirm: () => void;
  triggerLabel?: string;
}

export function DeleteConfirmation({
  itemName,
  onConfirm,
  triggerLabel = "删除",
}: DeleteConfirmationProps) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button variant="danger">{triggerLabel}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>确定删除“{itemName}”？</AlertDialog.Title>
        <AlertDialog.Description>
          删除后无法恢复，与该项目关联的文件和操作记录也会被永久移除。
        </AlertDialog.Description>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button variant="secondary">取消</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button variant="danger" onClick={onConfirm}>
              确认删除
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
