import React from "react";
import { Button, CircularProgress, Box } from "@mui/material";

import { MotionButtonProps } from "../constants/types";

const MotionButton = ({
  type = "button",
  color,
  label,
  startIcon,
  onClick,
  customStyles,
  loading = false,
  disabled = false,
  fullWidth = false,
}: MotionButtonProps) => {
  return (
    <>
      <Box
        sx={{ position: "relative", display: "flex", justifyContent: "center" }}
      >
        {/* @ts-ignore */}
        <Button
          {...(color ? { color } : {})}
          type={type as any}
          disabled={loading || disabled}
          {...(startIcon ? { startIcon } : {})}
          fullWidth={fullWidth}
          sx={{
            backgroundColor: "#17ECF0",
            color: "#131D4B",
            fontFamily: "montserrat-bold",
            fontSize: {
              xl: 14,
              lg: 14,
              md: 14,
              sm: 10,
              xs: 8,
            },
            px: {
              xl: 4,
              lg: 4,
              md: 4,
              sm: 2,
              xs: 1,
            },
            py: { xl: 2, sm: 1 },
            "&:hover": {
              backgroundColor: "#17ECF0",
            },
            maxWidth: "100%",
            textTransform: "none",
            borderRadius: "10px",
            ...customStyles,
          }}
          {...(onClick ? { onClick } : {})}
        >
          {label}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "green[500]",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </>
  );
};

export default MotionButton;
