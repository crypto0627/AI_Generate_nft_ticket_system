import React from "react";
import { useState, useEffect, useRef } from "react";
import parse from 'html-react-parser';
import { Container, Row, Col, Navbar, Nav, } from "react-bootstrap";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.jsx";
import { mintNFT, verifyNFT, nftused, tokenURI, totalSupply } from "../utils/interact.jsx";
import AES from 'crypto-js/aes';

const Ticket_admin = () => {
  //////////admin login in settings
  const admin_account = "admin";
  const admin_password = "admin";
  /////////////////////////////////
  
  // LoggedIn
  const [isLoggedIn, setisLoggedIn] = useState("false");
  const [account, setaccount] = useState("");
  const [password, setpassword] = useState("");
    
  const Login_in = () => {
    console.log("123");
    if (account == admin_account && password == admin_password){
      setisLoggedIn("true");
    }
  };

  
  // const [addr, setAddr] = useState("");
  var addr_data;
  function setAddr(addr) {
      addr_data = addr;
      console.log(addr_data);
      return addr_data;
  }
  //get mint address
  const getData = async() =>{
      var obj ;
      await fetch('http://127.0.0.1:5000/buyer_mint', {mode: 'cors'})
      .then((response) => {return response.json()})
      .then(json => {setAddr(json.results)})
      .catch(err => console.error(err));
      data_array(addr_data);
  };


    
    //
    var entokenid = "";
  const postData = async() => {
    //send encrypt tokenid
    var tokenid = await totalSupplyOfcall();
    entokenid = AES.encrypt(tokenid.toString(), 'kaikai').toString();
    console.log(minted_phone +"    " + entokenid);

    var test_data = "123";
    var body = { "phone": minted_phone, "entokenid": entokenid};
    // console.log(minted_phone);
    // console.log(obj['key1']=phone);
    console.log(body);
    console.log(JSON.stringify(body));
    await fetch('http://127.0.0.1:5000/minted', {

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
            console.log(data)
        })
      
  };



    const [List, setList] = useState("");
    const select_val = [];
    const [minted_phone, setmintedWallet] = useState("");
  // Define recursive function to print nested values
    function data_array(addr) {
        var test = "<ul className='list-group'>";
        for(var i = 0; i < addr.length; i++) {
            select_val[i] = addr[i].WalletAddress;
            console.log(select_val[i]);
            if(i==0){
                test = test + "<li className='list-group-item active'>" + addr[i].WalletAddress + "</li>";
            }else{
                test = test + "<li className='list-group-item'>" + addr[i].WalletAddress + "</li>";
            }
        }
        console.log(addr[0].Phone);
        test = test + "</ul>";
        setList(test);
        setmintedWallet(addr[0].Phone);
        
    };
  
  /////////////////////////////////////////////
  //Wallet
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const connectWalletPressed = async () => {
    //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    console.log(status)
  };

  //mintNFT
  const [count, setcount] = useState(1);
  const onMint = async () => {
      setcount(1);
      console.log(count);
      const { success, status } = await mintNFT(count);
      console.log(status);
      alert(status);
      if (success) {
          alert(`鑄造NFT成功`);
          postData();
      } else {
          alert("鑄造NFT失敗!");
      }
      postData();
  };
  //totalSupply return(uint256)
  const totalSupplyOfcall = async () => {
    const { status } = await totalSupply();
    console.log(status);
    alert(parseInt(status.toString())-1);
    return parseInt(status.toString()) - 1;
}

  /////////////////////////////////////////////

  
  return(

    
    <div className="Ticketadmin" align="center">


    {isLoggedIn == "true" &&
      
    <Container>  
    <h1>鑄造NFT</h1>
    <button onClick={getData}>取得需鑄造資料</button>   
    <form>
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
    
    <button type="button" className="btn btn-primary" onClick ={onMint} >鑄造NFT</button>
    </form>      
    <div>
      {parse(List)}
    </div>        
    </Container>
    }

    {isLoggedIn == "false" &&
    <Container>
        <form>
            <div className="mb-3 mt-3">
                <label className="form-label">admin account:</label>
                <input type="text" className="form-control" placeholder="Enter admin account"  onChange={(event) => setaccount(event.target.value)}/>
            </div>
                <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => setpassword(event.target.value)}/>
            </div>
            
            <button className="btn btn-primary" onClick={Login_in}>Login in</button>
        </form>                
    </Container>
    }

    </div>
  );        
};

export default Ticket_admin;


