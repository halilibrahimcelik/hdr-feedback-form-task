import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import RatingComponent from "../features/rating";
import FormHelperText from "@mui/material/FormHelperText";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useMemo, useRef, useState } from "react";
import type { RatingValue } from "@/types";
import { debounce, mockDelay } from "@/lib/utils";
import Toast from "../features/toast";

interface IFeedBackFormData {
  rating: FormDataEntryValue | null;
  review: FormDataEntryValue | null;
}

type IFeedBackStatus =
  | "idle"
  | "validating"
  | "submitting"
  | "error"
  | "success";

interface IErrorsState {
  rating: {
    message: string | undefined;
  };
  review: {
    message: string | undefined;
  };
}
const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState<RatingValue>(null);
  const [, setReview] = useState<string | null>(null);
  const [status, setStatus] = useState<IFeedBackStatus>("idle");
  const reviewRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<IFeedBackFormData>({
    rating: null,
    review: null,
  });
  const [errors, setErrors] = useState<IErrorsState>({
    rating: {
      message: undefined,
    },
    review: {
      message: undefined,
    },
  });
  const [open, setOpen] = useState(false);

  const debouncedReview = useMemo(
    () => debounce((value) => setReview(value)),
    [],
  );

  const handleClose = () => {
    setOpen(false);
  };
  //!Validating input fields with validateFields fn
  const validateFields = useMemo(
    () => (field: string, value: unknown) => {
      const trimmedValue = value?.toString().trim();
      setStatus("validating");
      switch (field) {
        case "rating":
          if (!trimmedValue) {
            setErrors((prev) => ({
              ...prev,
              rating: {
                message:
                  "You  have to select a rating to help us understand your experience better.",
              },
            }));
            return false;
          } else {
            setErrors((prev) => ({ ...prev, rating: { message: undefined } }));
            return true;
          }

        case "review":
          if (!trimmedValue) {
            setErrors((prev) => ({
              ...prev,

              review: {
                message: "This field is mandatory.",
              },
            }));
            return false;
          } else if (trimmedValue.length < 5) {
            setErrors((prev) => ({
              ...prev,
              review: {
                message: "Please state a valid feedback for us to analyze!",
              },
            }));
            return false;
          } else {
            setErrors((prev) => ({
              ...prev,
              review: {
                message: undefined,
              },
            }));
            return true;
          }
      }
    },
    [],
  );

  const onSubmitHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const rating = formData.get("rating");
    const review = formData.get("review");
    const ratingValidation = validateFields("rating", rating);
    const reviewValidation = validateFields("review", review);

    if (!ratingValidation || !reviewValidation) {
      setData({
        rating: null,
        review: null,
      });
      return;
    }

    try {
      setStatus("submitting");
      const formValues = {
        rating,
        review,
      };
      await mockDelay();
      setStatus("success");
      setData(formValues);
      if (reviewRef.current) {
        reviewRef.current.value = "";
      }
      setReview(null);
      setRating(null);
    } catch {
      setStatus("error");
    } finally {
      setOpen(true);
    }
  };
  // Logging form data to the console on successful submission to inspect the captured feedback values.
  console.log(data);
  const tooltipContext = () => (
    <Typography variant="caption">
      We will use your feedback to improve our services. <br />
      Thank you for taking the time to share your thoughts with us!
    </Typography>
  );

  return (
    <Card
      sx={{
        minWidth: {
          xs: "100%",
          md: "600px",
        },
        display: "flex",
        flexDirection: "column",
      }}
      variant="elevation"
      elevation={10}
    >
      {" "}
      <CardHeader
        sx={{
          textAlign: "center",
          bgcolor: "primary.main",
          color: "white",
        }}
        title={
          <Typography variant="h4" align="center">
            Feedback Form
          </Typography>
        }
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
          onSubmit={onSubmitHandler}
          component={"form"}
        >
          <TextField
            onChange={(e) => {
              debouncedReview(e.currentTarget.value);
              if (status !== "idle") {
                validateFields("review", e.currentTarget.value);
              }
            }}
            inputRef={reviewRef}
            sx={{
              width: "100%",
            }}
            data-testid="review-input"
            id="review"
            label="Your feedback"
            multiline
            rows={5}
            aria-label="Review "
            name="review"
            variant="outlined"
          />
          {errors.review.message && (
            <FormHelperText
              data-testid="review-input-helper-text"
              sx={{
                color: "error.main",
              }}
            >
              <WarningAmberIcon
                fontSize="inherit"
                sx={{
                  mb: "-1px",
                }}
                color="error"
              />{" "}
              {errors.review.message}
            </FormHelperText>
          )}
          <RatingComponent
            label="Please rate your experience"
            onChange={(_e, newValue) => {
              setRating(newValue);
              if (status !== "idle") {
                validateFields("rating", newValue);
              }
            }}
            rating={rating}
            labelTooltipContext={tooltipContext()}
            name="rating"
          />
          {errors.rating.message && (
            <FormHelperText
              data-testid="rating-input-helper-text"
              sx={{
                color: "error.main",
              }}
            >
              <WarningAmberIcon
                fontSize="inherit"
                sx={{
                  mb: "-1px",
                }}
                color="error"
              />{" "}
              {errors.rating.message}
            </FormHelperText>
          )}
          <Button
            loading={status === "submitting"}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </CardContent>
      <Toast
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handleClose}
        open={open}
        alertSeverity={status === "error" ? "error" : "success"}
        toastMessage={
          status === "error"
            ? "Something went wrong  while submitting your feedback please try again later."
            : "We've received  your feedback.  Thank you 😊"
        }
      />
    </Card>
  );
};

export default FeedbackForm;
