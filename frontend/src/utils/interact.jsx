import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import contractABI from "./abi.json";

//web3 api
const web3 = createAlchemyWeb3(
  "https://polygon-mumbai.g.alchemy.com/v2/aC1N39LhBDnTkyZj40eYjhX5-9c73u_n"
);
//
//contract Address
const contractAddress = "0xEf7A256fA14fc31E402Fc3Cf3C2fe6729AC45873";
//



//call tokenURI 
const tokenURI = async(tokenId)=>{
  if (tokenId < 0 || tokenId >= 100) {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress); //loadContract();
  try{
    const used = await window.contract.methods
      .tokenURI(tokenId)
      .call({ from: window.ethereum.selectedAddress });
    return {
      success: true,
      status: used,
    };
  } catch(err){
    return {
      success: false,
      status:
        "😥 Something went wrong: " +
        err.message +
        "Please input tokenId in a textbox.",
    };
  }
  
}

//call nftused 
const nftused = async(tokenId)=>{
  if (tokenId < 0 || tokenId >= 100) {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress); //loadContract();
  try{
    const used = await window.contract.methods
      .nftused(tokenId)
      .call({ from: window.ethereum.selectedAddress });
      console.log(tokenId+":"+used);
    if(used === true){
      return {
        success: true,
        status: "✅ NFT Ticket 尚未使用",
      };
    }else{
      return {
        success: false,
        status: "❌ NFT Ticket 已使用",
      };
    }
    
  } catch(err){
    return {
      success: false,
      status:
        "😥 Something went wrong: " +
        err.message +
        "Please input tokenId in a textbox.",
    };
  }
  
}

//verify nft
const verifyNFT = async(tokenId)=>{
  if (tokenId < 0 || tokenId >= 100) {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress); //loadContract();
  try{
    //check tokenId is wallet address container.

    const ownerOfcall = await window.contract.methods.ownerOf(tokenId).call({ from: window.ethereum.selectedAddress })
    const address = await window.ethereum.request({
      method: "eth_accounts",
    });
    console.log(ownerOfcall)
    console.log(address[0]);
      
      if (ownerOfcall.toLowerCase() === address[0]) { //compare address is match
        //set up your Ethereum transaction
        const transactionParameters = {
          from: window.ethereum.selectedAddress, // must match user's active address.
          to: contractAddress, // Required except during contract publications.
          data: window.contract.methods.tokenVerify(tokenId).encodeABI(), //make call to NFT smart contract
        };
        //tokenId set count=10
        try {
          const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          });
          return {
            success: true,
            status:
              "✅ Check out your transaction on Etherscan: https://mumbai.polygonscan.com/tx/" +
              txHash,
          };
        } catch (err) {
          return {
            success: false,
            status:
              "😥 Something went wrong: " +
              err.message
          };
        }
      } else {
        return {
          success: false,
          status: "OnlyOwner",
        };
      }
  }catch(err){
    return {
      success: false,
      status: "😥 Something went wrong: " + err.message,
    };
  }
  
}


//mint
const mintNFT = async (count) => {
  if (count !== 1) {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting."+count,
    };
  }

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress); //loadContract();

  //set up your Ethereum transaction
  const transactionParameters = {
    from: window.ethereum.selectedAddress, // must match user's active address.
    to: contractAddress, // Required except during contract publications.
    data: window.contract.methods.mint(1).encodeABI(), //make call to NFT smart contract
    value: Number(20000000000000000).toString(16),
  };

  //sign transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
      
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://mumbai.polygonscan.com/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};


//connect
const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "You must install Metamask, a virtual Ethereum wallet, in your browser."};
  }
};


//call totalSupply
const totalSupply = async()=>{
    //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress); //loadContract();
  try{
    const used = await window.contract.methods
      .totalSupply()
      .call({ from: window.ethereum.selectedAddress });
      return {
        success: true,
        status: used,
      };
      
    
  } catch(err){
    return {
      success: false,
      status:
        "load smart contract error!",
    };
  }
  
}

//getcurrentwallet
const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <div>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
          </div>
      ),
    };
  }
};

export { getCurrentWalletConnected, totalSupply,  connectWallet, mintNFT, verifyNFT, nftused, tokenURI};
