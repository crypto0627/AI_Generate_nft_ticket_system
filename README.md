<div align="center">
<h1>AI_Generate&NFT_Ticket_System</h1>

<img src="./frontend/src/assets/img/bg1.png" width="50%" height="50%"></img>


</div>

### Abstract

AI_Generate_NFT_Ticket_System, provide a platform to deploy your ai generation photo on Ethereum blockchain using ERC-721 standrad protocol.We have web frontend and backend.Frontend input customer data to mint nft,and backend storage customer data and transfer nft to customer cryptocurrency wallet address.

### Introduction

Our solution has the following features and advantages:

- Provide customer mint nft that used to verify ticket.
- Collection NFT ticket forever in cryptocurrency wallet

### Method

- Use [alchemyWeb3](https://dashboard.alchemy.com/) to interact with polygon. It is blockchain oracle provider.
- Use [Flask](https://flask.palletsprojects.com/en/2.3.x/) to build backend environment.
- Use [sqlite3](https://www.sqlite.org/index.html) to build DB.
- Use [metamask](https://metamask.io/) which is cryptocurrency wallet.
- Use [pinata](https://www.pinata.cloud/) to storage metadata on IPFS.
- Use [OpenSea](https://testnets.opensea.io/zh-TW) to define metadata scheme.
- Use React.js and Node.js to build frontend.
- Use RemixIDE to deploy smart contract on polygon testnet mumbai.

### Build & Installation

> Project is a centrailed web system. You can find two file in `./frontend` and `./backend`.

- `./frontend` is the web frontend for project. It is built using react.js, metamask, alchemyWeb.
- `./backend` is the web backend for project.It is built using .
Frist:
```bash
git clone https://github.com/crypto0627/AI_Generate_nft_ticket_system.git 
```

## Backend Set Up

```bash
cd backend
```

## Install pip package
```bash
pip install Flask flask_cors load_dotenv
```

```
python server.py
```
now backend is running.

## Frontend Set Up
```bash
cd frontend
```

```
npm i
```

```
npm run dev
```
now frontend is running.

## IPFS metadata Set UP
go to pinata and create this metadata and img, metadata is a json file.
```bash
{
  "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
  "external_url": "https://openseacreatures.io/3", 
  "image": "你的IPFS圖片網址", 
  "name": "Dave Starbelly",
  "attributes": [ ... ]
}
```
now you have metadata CID which can input to ERC-721 contract as nft photo.

## Deploy the contract
- go to [openzepplin](https://docs.openzeppelin.com/contracts/4.x/wizard)
- choose erc-721 template and click open in Remix
- paste code `./smartcontract/Nft_ticket.sol` on Remix IDE.
- Click solidity compiler and choose 0.8.9 version.
- Now compile smart contract and run script.
- You can choose togle box which name is ticket.sol in deploy and run transactions page.
- Deploy with two variables CUSTOMBASEURI_=ticket, PROXYREGISTRYADDRESS_=your wallet address.
- Now go to receive mumbai faucet on [alchemy polygon](https://mumbaifaucet.com/).
- And you need to metamask network to mumbai testnet.
- Finally, you can deploy contract in mumbai testnet,and remixIDE is going to display a contract address.
- You can go to mumbai explorer to search your contract with contract address.

## Verify the contract
- If you deployed contract in mumbai testnet.You can verify your contract with RemixIDE.
- Click Pugin manager,ahd search "CONTRACT VERIFICATION - ETHERSCAN" to active it.
- go to the polygon explorer to create API KEY,and paste API key on CONTRACT VERIFICATION - ETHERSCAN.
  <img width="183" alt="image" src="https://github.com/crypto0627/AI_Generate_nft_ticket_system/assets/62930885/35456646-7325-40fa-bd34-9c563e191539">
- now, your contract is verified.

## Upload your ai generation photo to contract write "setTokenUI" function
- go to contract write function page on mumbai testnet.
- click connect web3 button.
- select "setTokenURI" function with your pinata ipfs metadata cid.


## Modify `./frontend/src/utils`
- modify abi.json with your contract abi which is deployed on mumbai testnet
- modify interact.jsx about contracAddress and alchemyAPI key.
- If you don't have alchemyAPI key,you can go to alchemy dashbroad to create it.
- Now, All things are setting up.

### Demo step
- First, Start frontend and backend.
- open frontend localhost web page,and click "購買門票".
- input your data and click "連結錢包",now you can click "確認購買" for you wanna buy nft ticket.
- Second, go to admin page.(account:admin, password: admin) and login,,if you are administrator.
- you can connect wallet to mint nft to your manager wallet address.
- Finally, you can see your nft on OpenSea web3 site.
