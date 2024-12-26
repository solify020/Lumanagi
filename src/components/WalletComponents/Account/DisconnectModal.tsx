import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Popover from "@mui/material/Popover";

import { useWeb3React } from "@web3-react/core";
import { getExplorer } from "../../../constants/networks";
import Address from "./Address";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import MotionButton from "../../../UI/MotionButton";
interface ConnectModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  disconnect: () => Promise<void>;
  anchorEl: any;
  id: string;
}

const DisconnectModal: React.FC<ConnectModalProps> = ({
  isModalOpen,
  handleClose,
  disconnect,
  anchorEl,
  id,
}) => {
  const { account, chainId } = useWeb3React();

  return (
    <Popover
      id={id}
      open={isModalOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          background: "rgba(34, 51, 123, 0.6)",
          backdropFilter: "blur(147px)",
          px: 2,
          pt: 1,
          pb: 2.5,
          width: "25rem",
        },
      }}
    >
      <Box width={"100%"}>
        <Grid pb={3} container>
          <Grid item xs={11} pb={1}>
            <Typography
              variant="h6"
              sx={{
                p: 0,
                color: "#00FFF8",
                fontWeight: "600",
                fontSize: "2rem",
              }}
            >
              Account
            </Typography>
          </Grid>
          <Grid item xs={1} display={"flex"} pb={1}>
            <IconButton
              sx={{
                p: 0,
              }}
              onClick={handleClose}
            >
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Divider
              sx={{
                borderColor: "#00FFF8",
                m: 0,
                borderWidth: "0.25rem",
                borderRadius: "0.25rem",
              }}
            />
          </Grid>
        </Grid>

        <Address
          avatar="left"
          size={15}
          copyable
          style={{ fontSize: "20px", width: "100%", marginBottom: "1rem" }}
        />
        <Grid
          container
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <Grid item xs={5}>
            {chainId !== undefined && (
              <Button
                sx={{
                  position: "relative",
                  fontFamily: "montserrat-bold",
                  color: "#fff",
                  fontSize: {
                    xl: 14,
                    md: 14,
                    lg: 14,
                    sm: 10,
                    xs: 8,
                  },
                  px: 2,
                  py: 1.5,
                  textTransform: "none",
                  "&::before": {
                    content: `""`,
                    position: "absolute",
                    inset: 0,
                    borderRadius: "10px",
                    padding: "2px",
                    background: "linear-gradient(to right, #FF49C1, #00FFF8)",
                    WebkitMask:
                      "linear-gradient(#FF49C1 0 0) content-box, linear-gradient(#00FFF8 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  },
                }}
                onClick={() => {
                  window.open(
                    `${getExplorer(chainId)}/address/${account}`,
                    "_blank"
                  );
                }}
              >
                View on Explorer
              </Button>
            )}
          </Grid>
          <Grid item xs={5}>
            <MotionButton
              label="Disconnect Wallet"
              customStyles={{
                fontSize: "14px",
                px: 1.5,
                py: 1.5,
                backgroundColor: "#17ECF0",
                fontFamily: "montserrat-bold",
                color: "#131D4B",
                textTransform: "none",
              }}
              onClick={() => disconnect()}
            />
          </Grid>
        </Grid>
      </Box>
    </Popover>
  );
};

export default DisconnectModal;
