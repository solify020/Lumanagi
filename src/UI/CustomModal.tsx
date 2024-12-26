import React, { ReactElement } from "react";
import { Box, Button, Grid, Modal, Paper } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 4,
};

const paperStyle = {
  maxHeight: "90vh", // Set the maximum height to 80% of the viewport height
  overflowY: "auto", // Enable vertical scrolling when content exceeds maxHeight
  borderRadius: 3,
};

type Props = {
  open: boolean;
  handleClose: any;
  header?: ReactElement;
  body: ReactElement;
  footer?: ReactElement;
};

const CustomModal = ({
  handleClose,
  open,
  header = <></>,
  body = <></>,
  footer = <></>,
}: Props) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid>
            {header}
            <Button
              variant="text"
              sx={{
                position: "absolute",
                top: 0,
                right: 14,
                p: 0,
                minWidth: "fit-content",
                color: "#fff",
                fontSize: "1rem"
              }}
              onClick={handleClose}
            >
              &times;
            </Button>
          </Grid>
          <Paper sx={paperStyle}>{body}</Paper>
          {footer}
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
