import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingComponents({ showLoading = true }) {
  return (
    <>
      {showLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "rgba(8, 8, 8, 0.9)",
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
    </>
  );
}
