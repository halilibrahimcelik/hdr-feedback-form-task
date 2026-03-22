import { Container } from "@mui/material";
import "./App.css";
import FeedbackForm from "./components/feedback-form";

function App() {
  return (
    <Container
      component={"main"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FeedbackForm />
    </Container>
  );
}

export default App;
