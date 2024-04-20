import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const getProvider = () => {
  if ("phantom" in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open("https://phantom.app/", "_blank");
};

export const connect = async () => {
  const provider = getProvider(); // see "Detecting the Provider"
  try {
    const resp = await provider.request({ method: "connect" });
    const publicKey = resp.publicKey.toString();
    return publicKey;
  } catch (err) {
    console.log(err);
    // { code: 4001, message: 'User rejected the request.' }
  }
};

export const disconnect = async () => {
  const provider = getProvider(); // see "Detecting the Provider"
  try {
    await provider.request({ method: "disconnect" });
  } catch (err) {
    console.log(err);
    // { code: 4001, message: 'User rejected the request.' }
  }
};

export const createTransferTransaction = async ({
  from,
  to,
  feePayer,
  lamports = 100,
  connection,
}: {
  from: PublicKey;
  to: PublicKey;
  feePayer?: PublicKey;
  lamports?: number | bigint;
  connection: Connection;
}): Promise<Transaction> => {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports,
    })
  );
  transaction.feePayer = feePayer || from;

  try {
    const anyTransaction: Transaction = transaction;
    anyTransaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
  } catch (error) {
    console.error("Failed getting Blockhash", error);
  }

  return transaction;
};
