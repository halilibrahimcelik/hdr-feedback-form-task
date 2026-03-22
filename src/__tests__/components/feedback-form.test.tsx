import FeedbackForm from "@/components/feedback-form";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getByTestId } from "../utils";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return {
    ...actual,
    mockDelay: vi.fn().mockResolvedValue(undefined),
  };
});
describe("Testing Feedback form", () => {
  beforeEach(() => {
    render(<FeedbackForm />);
  });

  it("should render feedback form.", () => {
    const header = screen.getByRole("heading", { name: /feedback/i });
    const reviewField = getByTestId("review-input");
    const ratingField = getByTestId("rating-input");

    expect(header).toBeInTheDocument();
    expect(reviewField).toBeInTheDocument();
    expect(ratingField).toBeInTheDocument();
  });
  it("should  have exact feedback from textarea.", async () => {
    const user = userEvent.setup();
    const reviewField = screen.getByRole("textbox", {
      name: /your feedback/i,
    });
    expect(reviewField).toBeInTheDocument();
    await user.type(reviewField, "Hello world");

    expect(reviewField).toHaveValue("Hello world");
  });
  it("should have show correct rate value", async () => {
    const ratingFourStars = screen.getByRole("radio", {
      name: /4 stars/i,
    });
    fireEvent.click(ratingFourStars);

    expect(ratingFourStars).toBeChecked();
  });
  it("should  show validation helper texts if  user fails to  submit the form.", async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);
    const reviewFieldHelperText = getByTestId("review-input-helper-text");
    const ratingFieldHelperText = getByTestId("rating-input-helper-text");

    expect(reviewFieldHelperText).toBeInTheDocument();
    expect(ratingFieldHelperText).toBeInTheDocument();
  });
  it("should  show a toast success message when user   filled out.", async () => {
    const user = userEvent.setup();
    const reviewField = screen.getByRole("textbox", {
      name: /your feedback/i,
    });
    const ratingFourStars = screen.getByRole("radio", {
      name: /4 stars/i,
    });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(ratingFourStars);
    await user.type(reviewField, "Lorem Impus");
    await user.click(submitButton);
    screen.logTestingPlaygroundURL();

    const toastMessage = await screen.findByTestId("toast-message");
    expect(toastMessage).toBeInTheDocument();
  });
  it("should show an error message when  there is an error sending feedback form", async () => {
    const { mockDelay } = await import("@/lib/utils");
    // 👇 override mockDelay to reject for this test only
    vi.mocked(mockDelay).mockRejectedValueOnce(new Error("Network Error"));

    const user = userEvent.setup();
    const reviewField = screen.getByRole("textbox", { name: /your feedback/i });
    const ratingFourStars = screen.getByRole("radio", { name: /4 stars/i });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(ratingFourStars);
    await user.type(reviewField, "Lorem Ipsum");
    await user.click(submitButton);

    const toastMessage = await screen.findByTestId("toast-message");
    expect(toastMessage).toBeInTheDocument();
    expect(toastMessage).toHaveTextContent(/something went wrong/i);
  });
});
