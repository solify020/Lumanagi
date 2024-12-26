import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import coinbase_Logo from "../../assets/coinbase_Logo.png";
import metamask_Logo from "../../assets/svg/metamask_Logo.svg";
import walletconnect_Logo from "../../assets/svg/walletconnect_Logo.svg";
import { coinbaseWallet } from "../../../connectors/coinbaseWallet";
import { metaMask } from "../../../connectors/metaMask";
import { walletConnect } from "../../../connectors/walletConnect";
import ConnectButton from "./ConnectButton";
import { Typography, IconButton, SxProps, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { enqueueSnackbar } from "notistack";

interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedWallet: React.Dispatch<
    React.SetStateAction<
      "MetaMask" | "WalletConnect" | "Coinbase Wallet" | null
    >
  >;
}

const ConnectModal: React.FC<ConnectModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  setSelectedWallet,
}) => {
  const style: SxProps = {
    background: "rgba(34, 51, 123, 0.6)",
    backdropFilter: "blur(147px)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    px: 4,
    pb: 4,
    pt: 2,
    borderRadius: "10px",
    "& *": {
      fontFamily: "Outfit !important",
    },
  };

  const activateConnector = async (label: string) => {
    try {
      switch (label) {
        case "MetaMask":
          await metaMask.activate();
          setSelectedWallet(label);
          window.localStorage.setItem("connectorId", "injected");
          break;

        case "WalletConnect":
          await walletConnect.activate();
          setSelectedWallet(label);
          window.localStorage.setItem("connectorId", "wallet_connect");
          break;

        case "Coinbase Wallet":
          await coinbaseWallet.activate();
          setSelectedWallet(label);
          window.localStorage.setItem("connectorId", "injected");
          break;

        default:
          break;
      }
    } catch (error: any) {
      if (error && error.message !== "User closed modal") {
        enqueueSnackbar(
          error && error.message ? error.message : "Something went wrong",
          {
            variant: "warning",
            autoHideDuration: 3000,
          }
        );
      }
    } finally {
      setIsModalOpen(false);
    }
  };
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={style}>
        <Grid pb={4} container>
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
              Connect Your Wallet
            </Typography>
          </Grid>
          <Grid item xs={1} display={"flex"} pb={1}>
            <IconButton
              sx={{
                p: 0,
              }}
              onClick={() => setIsModalOpen(false)}
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

        {/* <Box style={{ display: "flex", flexDirection: "column" }}> */}
        <Stack alignItems="center">
          <ConnectButton
            label="MetaMask"
            image={metamask_Logo}
            onClick={() => activateConnector("MetaMask")}
          />

          <ConnectButton
            label="WalletConnect"
            image={walletconnect_Logo}
            onClick={() => activateConnector("WalletConnect")}
          />

          <ConnectButton
            label="Coinbase Wallet"
            image={coinbase_Logo}
            onClick={() => activateConnector("Coinbase Wallet")}
          />
        </Stack>
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 500,
              fontSize: "1rem",
              color: "#fff",
              mb: 2,
            }}
          >
            Need help installing a wallet?{" "}
            <a
              href="https://metamask.zendesk.com/hc/en-us/articles/360015489471-How-to-Install-MetaMask-Manually"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FF49C1" }}
            >
              Click here
            </a>
          </Typography>

          <Typography
            style={{
              fontWeight: 400,
              fontSize: "1rem",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Wallets are provided by External Providers and by selecting you
            agree to Terms of those Providers. Your access to the wallet might
            be reliant on the External Provider being operational.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConnectModal;
