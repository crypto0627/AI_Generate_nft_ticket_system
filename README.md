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

## Deploy the contract
contract code:
```bash
cd src/contracts
```

