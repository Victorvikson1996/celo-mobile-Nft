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

  const apiUrl = `https://api.center.dev/experimental/alchemy/celo-mainnet/nft/v2/${apiKey}/getNFTs?owner=${account}&withMetadata=true`;

  const response = await fetch(apiUrl);
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

export async function FetchNft(account) {
  const nftList = [];

  const celoNfts = await fetchCeloNft(account);
  nftList.push(...celoNfts);

  return nftList;
}
