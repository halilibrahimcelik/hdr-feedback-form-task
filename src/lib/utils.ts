const mockDelay = (ms: number = 1500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const debounce = <T extends (...args: string[]) => void>(
  fn: T,
  delay = 350,
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
export { mockDelay, debounce };
