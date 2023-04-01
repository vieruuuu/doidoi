import Fuse from "fuse.js";
import type { Ref } from "vue";

export function useFuse<T extends Record<string, unknown>>(
  array: T[] | Ref<T[]>,
  options: Fuse.IFuseOptions<T>
) {
  const filter = ref("");

  const data = computed<T[]>(() => {
    const data = unref(array);

    if (filter.value === "") {
      return data;
    }

    const fuse = new Fuse(data, options);

    return fuse.search(filter.value).map(({ item }) => item);
  });

  return { data, filter };
}
