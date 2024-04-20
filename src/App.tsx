import "./App.css";
import { PaymentGateway } from "./components/PaymentGateway/PaymentGateway";
import { WalletWrapper } from "./services/solana/WalletWrapper";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <WalletWrapper>
        <PaymentGateway />
      </WalletWrapper>
    </div>
  );
}

export default App;
