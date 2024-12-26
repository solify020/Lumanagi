import Button from "@mui/material/Button";
import { SxProps } from "@mui/material";

const styles = {
  connectButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    paddingBlock: "5px",
    marginBottom: "12px",
    boxShadow:
      "0 4px 4px rgba(0,0,0,.25),0 0 5px rgba(0,0,0,.25),inset 0 0 10px #fff",
    textTransform: "none",
    fonFamily: "Outfit",
    fontWeight: 600,
    fontSize: "1.25rem",
    bgcolor: "#fff",
    color: "#000",
    width: "20rem",
    "&:hover": {
      bgcolor: "#ddd",
    },
  } as SxProps,
} as const;

const ConnectButton = ({
  label,
  image,
  onClick,
}: {
  label: string;
  image: string;
  onClick: () => void;
}) => {
  return (
    <Button sx={styles.connectButton} key={label} onClick={onClick}>
      <img
        src={image}
        width={32}
        height={32}
        alt="WalletImage"
        style={{ marginRight: "1rem" }}
      />
      {label}
    </Button>
  );
};

export default ConnectButton;
