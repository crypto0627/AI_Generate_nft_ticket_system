import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Navbar, Nav, } from "react-bootstrap";
// import 'animate.css';
// import TrackVisibility from 'react-on-screen';
// import emailjs from "emailjs-com";
import React from 'react';
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.jsx";
import { mintNFT, verifyNFT, nftused, tokenURI, totalSupply } from "../utils/interact.jsx";
// import { CopyToClipboard } from "react-copy-to-clipboard";


const Banner = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');


    //Wallet
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    setStatus("The web3 is connected!");
                } else {
                    setWallet("");
                    setStatus("🦊 Connect to Metamask using the top right button.");
                }
            });
        } else {
            setStatus(
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
            );
        }
    }



    const connectWalletPressed = async () => {
        //TODO: implement
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
        console.log(status)
    };
    ////////////////////////////////////////////////////////////////

    
    const postData = async() => {
        //send encrypt tokenid
        var body = {"name": name, "phone": phone, "walletAddress": walletAddress, "email": email};
        console.log(body);
        console.log(JSON.stringify(body));
        await fetch('http://127.0.0.1:5000/buy_url', {

            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(body)
        })
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(alert(data))
        })
        
    };  


    return (
        <section className="banner" id="home">
            <Container>
                <div className="App" align="center">
                    <h1>購票資訊</h1>

                    <form>
                        <label>
                            姓名：
                            <input
                                type="text"
                                onChange={(event) => setName(event.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            電話：
                            <input
                                type="tel"
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Email：
                            <input
                                type="email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </label>
                        <br />

                        <div text={walletAddress} title="Copy Wallet address">
                            <button type="button" className="connectwallet" onClick={connectWalletPressed} >
                                <span>
                                    {walletAddress && walletAddress.length > 0
                                        ? `已連結錢包: ${walletAddress.substring(
                                            0,
                                            6
                                        )}...${walletAddress.substring(38)}`
                                        : "點擊以連結錢包"}
                                </span>
                            </button>
                            
                        </div>
                        <br></br>
                        </form>                            
                        <button onClick={postData}>確認購買</button>
                    

                </div>
            </Container>
        </section>
    );
}

export default Banner;