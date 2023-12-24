const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Bottleneck = require("bottleneck");
const app = express();
const port = 3001;

app.use(cors());

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 200, // milliseconds
});

const fetchBalance = limiter.wrap(async (contractAddress, address, apiKey) => {
  const balanceUrl = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${apiKey}`;
  const balanceResponse = await axios.get(balanceUrl);
  return balanceResponse.data.result;
});

// Endpoint to get token data
app.get("/token-data", async (req, res) => {
  const { address } = req.query;
  try {
    const tokenData = await getBlockchainTokenData(address);
    // If you don't have a specific logo URL, you might use a default URL
    let logoUrl = tokenData.logoUrl || "./components/Images/empty-token.svg";

    // Check if the logo URL actually exists
    const logoExists = await checkLogoExists(logoUrl);
    if (!logoExists) {
      logoUrl = "./components/Images/empty-token.svg"; // Replace with your default logo path
    }

    res.json({
      success: true,
      name: tokenData.name,
      logo: logoUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not fetch token data.",
    });
  }
});
async function getGoPlusTokenData(tokenAddress, chainId) {
  const url = `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${tokenAddress}`;
  try {
    const response = await axios.get(url);
    if (
      response.data &&
      response.data.result &&
      response.data.result[tokenAddress]
    ) {
      return {
        name: response.data.result[tokenAddress].token_name,
        symbol: response.data.result[tokenAddress].token_symbol,
      };
    } else {
      return null; // No data found for this token
    }
  } catch (error) {
    console.error("Error fetching token data from GoPlus API:", error);
    return null;
  }
}

app.get("/api/get-token-data/:tokenAddress", async (req, res) => {
  const { tokenAddress } = req.params;
  const chainId = "56";
  try {
    const tokenData = await getGoPlusTokenData(tokenAddress, chainId);
    res.json({
      success: true,
      data: tokenData,
    });
  } catch (error) {
    console.error("Error in /api/get-token-data:", error);
    res.status(500).json({
      success: false,
      error: "Could not fetch token data.",
    });
  }
});
app.get("/tokens", async (req, res) => {
  const { address } = req.query;
  const apiKey = "JUDPV627WC6YPRF9PJ992PQ4MMAIZVCDVV";
  const chainId = "56"; // Replace with the appropriate chain ID

  try {
    const txUrl = `https://api.bscscan.com/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=${apiKey}`;
    const txResponse = await axios.get(txUrl);

    if (txResponse.data.status === "0") {
      throw new Error(txResponse.data.result);
    }

    const transactions = txResponse.data.result;

    if (Array.isArray(transactions)) {
      const contractAddresses = [
        ...new Set(transactions.map((tx) => tx.contractAddress.toLowerCase())),
      ];

      const tokenBalances = await Promise.all(
        contractAddresses.map(async (contractAddress) => {
          try {
            const balance = await fetchBalance(
              contractAddress,
              address,
              apiKey
            );
            const tokenData = await getGoPlusTokenData(
              contractAddress,
              chainId
            );

            let logoUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${contractAddress}/logo.png`;

            // Check if the logo exists, if not use fallback
            const logoExists = await checkLogoExists(logoUrl);
            if (!logoExists) {
              logoUrl = "./components/Images/empty-token.svg"; // Fallback image path
            }

            return {
              tokenName: tokenData.name, // Name from GoPlus API
              balance,
              contractAddress,
              logoUrl,
            };
          } catch (error) {
            console.error(
              `Error fetching balance for contract ${contractAddress}: `,
              error
            );
            return null;
          }
        })
      );

      const validBalances = tokenBalances.filter(
        (token) => token && token.balance !== "0"
      );
      res.json(validBalances);
    } else {
      res.status(500).json({
        error: "BscScan API response was not an array.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to check if logo exists
const checkLogoExists = async (logoUrl) => {
  try {
    const response = await axios.head(logoUrl);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

app.listen(port, () => console.log(`Server running on port ${port}`));
