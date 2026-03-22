import { screen } from "@testing-library/react";

export function getByTestId(testId: string) {
  return screen.getByTestId(testId);
}
