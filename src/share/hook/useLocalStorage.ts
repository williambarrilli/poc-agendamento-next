"use client";

export function useSetLocalStorage(key: string, value: string) {
  if (typeof window !== "undefined" && key && value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
export function useGetLocalStorage(key: string) {
  if (typeof window !== "undefined" && key) {
    return window.localStorage.getItem(key);
  }
}
