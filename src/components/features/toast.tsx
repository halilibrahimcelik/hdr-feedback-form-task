import Alert, { type AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarProps } from "@mui/material/Snackbar";
interface ToastProps extends SnackbarProps {
  toastMessage: string;
  alertSeverity: AlertProps["severity"];
}
const Toast: React.FC<ToastProps> = ({
  toastMessage,
  alertSeverity,
  ...props
}) => {
  return (
    <Snackbar {...props}>
      <Alert
        data-testid="toast-message"
        severity={alertSeverity}
        variant="standard"
        sx={{ width: "100%" }}
      >
        {toastMessage}
      </Alert>
    </Snackbar>
  );
};
export default Toast;
