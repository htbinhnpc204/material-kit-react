import { Dialog, CircularProgress } from "@mui/material";

function LoadingFullSize() {
  return (
    <Dialog
      fullScreen
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={80} />
    </Dialog>
  );
}

export default LoadingFullSize;
