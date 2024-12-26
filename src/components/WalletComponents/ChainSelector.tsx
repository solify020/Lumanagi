import { useEffect, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSwitchChain } from "../../hooks/useSwitchChain";

import ethereum_Logo from "../assets/ethereum_Logo.png";
import bsc_Logo from "../assets/svg/bsc_Logo.svg";

function ChainSelector() {
  const switchChain = useSwitchChain();
  const { chainId, isActive } = useWeb3React();
  const [selected, setSelected] = useState<any>(1);

  const labelToShow = (logo: string, alt: string) => {
    return (
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <img
          src={logo}
          alt={alt}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            marginRight: "5px",
          }}
        />
      </div>
    );
  };

  const items = [
    {
      label: "Ethereum",
      key: "1",
      icon: labelToShow(ethereum_Logo, "Ethereum_logo"),
    },
    {
      label: "Goerli",
      key: "5",
      icon: labelToShow(ethereum_Logo, "Ethereum_logo"),
    },
    {
      label: "Sepolia",
      key: "11155111",
      icon: labelToShow(ethereum_Logo, "Ethereum_logo"),
    },
    { label: "BNB Chain", key: "56", icon: labelToShow(bsc_Logo, "BNB_logo") },
    {
      label: "BNB Testnet",
      key: "97",
      icon: labelToShow(bsc_Logo, "BNB_logo"),
    },
  ];

  useEffect(() => {
    if (!chainId) return undefined;
    setSelected(items.find((item: any) => item?.key === chainId.toString()));
    return;
  }, [chainId]);

  const handleChange = async (event: any) => {
    await switchChain(parseInt(event.target.value));
    // window.location.reload();
  };

  if (!chainId || !isActive) return null;

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Chain"
      onChange={handleChange}
      size="small"
      color="primary"
      sx={{
        fontSize: {
          xl: 14,
          lg: 14,
          md: 14,
          sm: 10,
          xs: 8,
        },
        "& *": {
          p: 0,
        },
        px: 1,
        py: {
          lg: 1.5,
          md: 1.5,
          sm: 0.5,
          xs: 0.5,
        },

        "&:hover": {
          backgroundColor: "transparent",
        },
        height: "100%",
        border: "1px solid #FF49C1",
        borderRadius: 35,
        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
        color: "#fff",
        background: "transparent",
        fontFamily: "montserrat-medium",
        fontWeight: 700,
        textShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",

        "& fieldset": { display: "none" },
        "& svg": { color: "#fff" },
      }}
      value={selected}
      renderValue={(value) => (
        <Grid container display={"flex"} alignItems="center">
          <Grid display={"flex"} alignItems="center" item xs={5} sm={5} md={3}>
            {value.icon}
          </Grid>
          <Grid item xs={7} sm={7} md={9}>
            {value.label}
          </Grid>
        </Grid>
      )}
    >
      {items.map((item) => (
        <MenuItem value={item.key} key={item.key}>
          <Grid container display={"flex"} alignItems="center">
            <Grid display={"flex"} alignItems="center" item xs={2.75}>
              {item.icon}
            </Grid>
            <Grid item>{item.label}</Grid>
          </Grid>
        </MenuItem>
      ))}
    </Select>
  );
}

export default ChainSelector;
