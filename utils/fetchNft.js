function replaceUri(uri) {
  if (uri.startsWith("ipfs")) {
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  return uri;
}

async function fetchImageUri(uri) {
  if (!uri) {
    return "";
  }
  if (!uri.startsWith("ar")) {
    const replacedUri = await replaceUri(uri);

    return replacedUri;
  } else {
    return "";
  }
}

async function fetchCeloNft(account) {
  const apiKey = "key9456b2860674f97e2606af81";
  // account = "vitalik.eth";
  // account = "0x47561bb7eB538b7969b8152AF9B30aAC2FAB0c81";
  // account = "0xb395F443BA3Df615c7aF8A147c7d380dF6F9Db55";

  const apiUrl = `https://api.center.dev/experimental/alchemy/celo-mainnet/nft/v2/${apiKey}/getNFTs?owner=${account}&withMetadata=true`;

  // const apiUrl = `https://api.center.dev/experimental/alchemy/celo-mainnet/nft/v2/test/getNFTs?owner=${account}&withMetadata=true`;

  // const apiUrl = `https://api.center.dev/experimental/alchemy/ethereum-mainnet/nft/v2/key9456b2860674f97e2606af81/getNFTs?owner=vitalik.eth&withMetadata=true`;

  // account = "0x47561bb7eB538b7969b8152AF9B30aAC2FAB0c81";

  const response = await fetch(apiUrl);

  // const data = {};
  const data = await response.json();

  console.log(data?.ownedNfts);

  const nftList = await data?.ownedNfts?.map(async (nft) => {
    const imageUrl = await fetchImageUri(nft.metadata.image);
    const title = nft.title;
    console.log(title);

    const nftNewFormat = {
      imageUrl: imageUrl || "",
      title: nft.title,
      desc: nft.description,
      tokenId: nft.id.tokenId,
      contractAddress: nft.contract.address,
    };

    return nftNewFormat;
  });
  return Promise.all(nftList);
}

async function _fetchCeloNft(account) {
  const apiKey = "key9456b2860674f97e2606af81";
  const apiUrl = `https://api.center.dev/experimental/alchemy/ethereum-mainnet/nft/v2/key9456b2860674f97e2606af81/getNFTs?owner=vitalik.eth&withMetadata=true`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data, "DATA: " + JSON.stringify(data));

    // process the fetched data here
  } catch (error) {
    console.error(error);
  }
}

async function fetchPolygonNft(account) {
  const apiKey = "BoPAsURuh-S-t-0_2lbNHxyiO-Y9IJPZ";

  const apiUrl = `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs?owner=${account}`;

  const response = await fetch(apiUrl);

  const data = await response.json();

  const nftList = await data?.ownedNfts?.map(async (nft) => {
    const imageUrl = await fetchImageUri(nft.metadata.image);

    const nftNewFormat = {
      imageUrl: imageUrl || "",
      title: nft.title,
      desc: nft.description,
    };
    return nftNewFormat;
  });

  return nftList;
}

async function fetchAlchemyNfts(account) {
  const apiKey = "SKEuiW0Jsc3ULKZs29jy5jgkurQDM2_K";
  account = "0x47561bb7eB538b7969b8152AF9B30aAC2FAB0c81";
  const apiUrl = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs?owner=${account}`;
  // console.log('apiUrl', apiUrl);
  const response = await fetch(apiUrl);

  // const data = {};
  const data = await response.json();

  const nftList = await data?.ownedNfts?.map(async (nft) => {
    const imageUrl = await fetchImageUri(nft.metadata.image);

    const nftNewFormat = {
      imageUrl: imageUrl || "",
      title: nft.title,
      desc: nft.description,
      tokenId: nft.id.tokenId,
      contractAddress: nft.contract.address,
    };

    return nftNewFormat;
  });

  return Promise.all(nftList);
}

export async function FetchNft(account) {
  const nftList = [];
  // const alchemyNfts = await fetchAlchemyNfts(account);
  // nftList.push(...alchemyNfts);

  // const polygonNfts = await fetchPolygonNft(account);
  // nftList.push(...polygonNfts);
  // // console.log(alchemyNfts);

  const celoNfts = await fetchCeloNft(account);
  nftList.push(...celoNfts);

  // const _celoNfts = await _fetchCeloNft(account);
  // nftList.push(..._celoNfts);

  return nftList;
}
