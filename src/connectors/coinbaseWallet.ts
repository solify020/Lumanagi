import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";

import { URLS } from "../constants/networks";

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        appName: "Lumangi",
        url: URLS[1][0],
      },
    })
);
