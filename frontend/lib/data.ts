import { parse } from "date-fns";
import type { QTableProps } from "quasar";

export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export function deepRemoveUndefined<T>(input: T): T {
  // TODO: test this more
  if (Array.isArray(input)) {
    const noUndefinedValues = [];

    for (const el of input) {
      if (el !== undefined) {
        noUndefinedValues.push(
          typeof el === "object" && el !== null ? deepRemoveUndefined(el) : el
        );
      }
    }

    return noUndefinedValues as T;
  } else if (typeof input === "object" && input !== null) {
    const currentEntries = Object.entries(input);
    const finalEntries = [];

    for (const [key, value] of currentEntries) {
      if (value !== undefined) {
        if (typeof value === "object" && value !== null) {
          finalEntries.push([key, deepRemoveUndefined(value)]);
        } else {
          finalEntries.push([key, value]);
        }
      }
    }

    return Object.fromEntries(finalEntries);
  } else {
    // for primitive values just return the value
    return input;
  }
}

export function shallowNoUndefined<T extends Record<string, unknown>>(
  input: T
): input is Required<T> {
  return !Object.values(input).includes(undefined);
}

export const parseDate = (dateStr: string) =>
  parse(dateStr, "dd/MM/yyyy", new Date()).getTime();

type SmartFields<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    field: K | ((row: T) => unknown);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    format?: (val: any, row: T) => unknown;
  };
};

type TableCol<T extends Record<string, unknown>> = Omit<
  NonNullable<QTableProps["columns"]>[number],
  "field" | "format"
> &
  SmartFields<T>[keyof SmartFields<T>];

export type TableColumns<T extends Record<string, unknown>> = TableCol<T>[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkIncludes<T>(array: readonly T[], el: any): el is T {
  return array.includes(el);
}
