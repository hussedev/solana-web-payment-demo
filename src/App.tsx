import { useState } from "react";
import "./App.css";
import {
  connect,
  createTransferTransaction,
  disconnect,
  getProvider,
} from "./services/phantom";
import { Connection, PublicKey } from "@solana/web3.js";
// import { PaymentGateway } from "./components/PaymentGateway/PaymentGateway";
// import { WalletWrapper } from "./services/solana/WalletWrapper";

function App() {
  const [publicKey, setPublicKey] = useState("");

  const provider = getProvider();

  const handleDisconnect = async () => {
    await disconnect();
    setPublicKey("");
  };

  const handleConnect = async () => {
    const publicKey = await connect();
    setPublicKey(publicKey);
  };

  const handleTransaction = async () => {
    const from = new PublicKey(publicKey);
    const to = new PublicKey(publicKey);
    const network = "https://docs-demo.solana-mainnet.quiknode.pro";
    console.info("Start connection");
    const connection = new Connection(network);
    console.info("Connection stablished");
    console.info("Start transaction");
    const transaction = await createTransferTransaction({
      from,
      to,
      connection,
      lamports: 1000000,
    });
    const { signature } = await provider.signAndSendTransaction(transaction);
    await connection.getSignatureStatus(signature);
    console.info("Transaction accomplished", signature);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p>{`Public Key: ${publicKey || "none"}`}</p>
      <p>{provider.isConnected ? "CONNECTED" : "DISCONNECTED"}</p>
      {publicKey ? (
        <>
          <button onClick={handleTransaction}>Transfer</button>
          <button onClick={handleDisconnect}>Disconnect Wallet</button>
        </>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
      {/* <WalletWrapper>
        <PaymentGateway />
      </WalletWrapper> */}
    </div>
  );
}

export default App;
