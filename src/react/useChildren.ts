import { type ReactElement, type ReactNode, useMemo } from "react";
import { type ItemElement, flattenChildren } from "./utils.js";

/**
 * @internal
 */
export const useChildren = <T>(
  children:
    | ReactNode
    | ((data: T, i: number, placeholder?: boolean) => ReactElement),
  data: ArrayLike<T> | undefined
) => {
  return useMemo((): [(i: number, placeholder?: boolean) => ItemElement, number] => {
    if (typeof children === "function") {
      return [
        (i, placeholder = false) => children(data![i]!, i, placeholder),
        data!.length,
      ];
    }
    // Memoize element array
    const _elements = flattenChildren(children);
    return [(i) => _elements[i]!, _elements.length];
  }, [children, data]);
};
