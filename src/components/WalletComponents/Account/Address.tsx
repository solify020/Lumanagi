import React, { useEffect, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import Skeleton from "@mui/material/Skeleton";
import Jazzicons from "../Jazzicons";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { SxProps } from "@mui/material";

import { getEllipsisTxt } from "../../../utils/formatters";

export interface AddressProps {
  style: SxProps;
  avatar: string;
  size: number | undefined;
  copyable: boolean;
}

const Check = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="#21BF96"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
    <title id="copied-address">Copied!</title>
  </svg>
);
const Address: React.FC<AddressProps> = (props) => {
  const { account } = useWeb3React();
  const [address, setAddress] = useState<string | null>();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (account !== undefined) setAddress(account);
  }, [account]);

  useEffect(() => {
    if (isClicked === true)
      setTimeout(() => {
        setIsClicked(false);
      }, 5000);
  }, [isClicked]);

  if (address === undefined)
    return <Skeleton variant="text" sx={{ fontSize: "1rem" }} />;

  const Copy = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        if (address) navigator.clipboard.writeText(address);
        setIsClicked(true);
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33333 2.58333H12.4788C13.5008 2.58333 13.8712 2.68967 14.2443 2.8895C14.6173 3.08933 14.9107 3.38267 15.1105 3.75575C15.3103 4.12883 15.4167 4.49917 15.4167 5.52125V12.6667C15.4167 12.9098 15.5132 13.1429 15.6852 13.3148C15.8571 13.4868 16.0902 13.5833 16.3333 13.5833C16.5764 13.5833 16.8096 13.4868 16.9815 13.3148C17.1534 13.1429 17.25 12.9098 17.25 12.6667V5.45067C17.25 3.81625 17.0795 3.22317 16.7605 2.6255C16.4479 2.03499 15.965 1.55209 15.3745 1.2395C14.7768 0.9205 14.1838 0.75 12.5493 0.75H5.33333C5.09022 0.75 4.85706 0.846577 4.68515 1.01849C4.51324 1.19039 4.41667 1.42355 4.41667 1.66667C4.41667 1.90978 4.51324 2.14294 4.68515 2.31485C4.85706 2.48676 5.09022 2.58333 5.33333 2.58333ZM12.4109 4.72283C12.0378 4.523 11.6675 4.41667 10.6454 4.41667H3.68792C2.66583 4.41667 2.2955 4.523 1.92242 4.72283C1.55335 4.91821 1.25154 5.22002 1.05617 5.58908C0.856333 5.96217 0.75 6.3325 0.75 7.35458V14.3121C0.75 15.3333 0.856333 15.7045 1.05617 16.0776C1.256 16.4507 1.54933 16.744 1.92242 16.9438C2.2955 17.1437 2.66583 17.25 3.68792 17.25H10.6454C11.6666 17.25 12.0378 17.1437 12.4109 16.9438C12.784 16.744 13.0773 16.4507 13.2772 16.0776C13.477 15.7045 13.5833 15.3342 13.5833 14.3121V7.35458C13.5833 6.3325 13.477 5.96217 13.2772 5.58908C13.0818 5.22002 12.78 4.91821 12.4109 4.72283Z"
        fill="white"
      />
      <title id="copy-address">Copy Address</title>
    </svg>
  );

  return (
    <Grid
      container
      sx={{
        background: "#060E36",
        p: 2,
        py: 3,
        borderRadius: "0.75rem",
        ...props.style,
      }}
    >
      {props.avatar === "left" && address && (
        <Grid item xs={1.25} alignItems="center" display="flex">
          <Jazzicons seed={address} />
        </Grid>
      )}
      <Grid item xs={9.5} alignItems="center" display="flex">
        <Typography
          sx={{
            color: "#FFFFFF",
            fontFamily: "Montserrat !important",
            fontSize: "1rem",
          }}
        >
          {props.size && address
            ? getEllipsisTxt(address, props.size)
            : address}
        </Typography>
      </Grid>
      {props.avatar === "right" && address && (
        <Grid item xs={1.25} alignItems="center" display="flex">
          <Jazzicons seed={address} />
        </Grid>
      )}
      <Grid
        item
        xs={1.25}
        alignItems="center"
        display="flex"
        justifyContent="end"
      >
        {props.copyable && (isClicked ? <Check /> : <Copy />)}
      </Grid>
    </Grid>
  );
};

export default Address;
