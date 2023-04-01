import { Dialog, Notify, type QDialogOptions } from "quasar";
import type { ComputedRef, Ref } from "vue";

/**
 * It takes a path to an asset and returns a URL to that asset
 * @param path - The path to the asset file.
 * @returns A string of the URL to the asset.
 */
export function getAsset(path: string) {
  const assetModules = import.meta.glob<string>("./../assets/**/*.*", {
    import: "default",
    eager: true,
  });

  const assetsArray = Object.entries(assetModules).map(
    ([path, processedPath]) => {
      const [, pathWithoutPrefix] = path.split("../assets/");

      return [pathWithoutPrefix, processedPath];
    }
  );

  const assetsObj: { [path: string]: string } = Object.fromEntries(assetsArray);

  if (!assetsObj[path]) {
    throw "can't find asset: " + path;
  }

  return assetsObj[path];
}

// asa e si in quasar `any`
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

type InjectionKey = Parameters<typeof inject>[0];

export function injectRef<T>(key: InjectionKey) {
  const i = inject<Ref<T>>(key);

  if (!i) {
    throw `inject ${key} not found`;
  }

  return i;
}

export function injectComputed<T>(key: InjectionKey) {
  const i = inject<ComputedRef<T>>(key);

  if (!i) {
    throw `inject ${key} not found`;
  }

  return i;
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function somethingsWrong(message?: string) {
  Notify.create({
    message: message ?? "Something went wrong",
    icon: "error",
    iconColor: "negative",
    classes: "text-body1 text-weight-bold",
  });
}

export function somethingsGood(message?: string) {
  Notify.create({
    message: message ?? "No errors",
    icon: "done",
    iconColor: "primary",
    classes: "text-body1 text-weight-bold",
  });
}
