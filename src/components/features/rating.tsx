import * as React from "react";
import Box from "@mui/material/Box";
import Rating, { type RatingProps } from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Tooltip } from "@mui/material";

interface Props extends RatingProps {
  rating: number | undefined | null;
  label: string;
  labelTooltipContext: React.ReactNode;
}
const RatingComponent: React.FC<Props> = ({
  rating,
  label,
  onChange,
  labelTooltipContext,
  name,
}) => {
  return (
    <Box aria-label="Rating component" aria-describedby="rating-description">
      <Rating
        data-testid="rating-input"
        id="rating-stars"
        aria-checked={rating !== null}
        aria-label={`${label} rating`}
        size="small"
        name={name}
        value={rating}
        onChange={onChange}
      />
      <Tooltip placement="left-start" title={labelTooltipContext}>
        <Typography variant="body1" color="primary" component="legend">
          {label} <TipsAndUpdatesIcon fontSize="inherit" />
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default RatingComponent;
