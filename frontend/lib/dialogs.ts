import { Dialog, type QDialogOptions } from "quasar";

// asa e definit si in codul quasar
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function asyncDialogConfirm(options: QDialogOptions): Promise<any> {
  return new Promise((resolve, reject) =>
    Dialog.create({
      cancel: true,
      persistent: true,
      ...options,
    })
      .onOk(resolve)
      .onCancel(reject)
      .onDismiss(reject)
  );
}
