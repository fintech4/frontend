import React from "react";

function Wallet({ walletName }) {
  return (
    <>
      <div>
        <h2>{walletName}</h2>
        <img src="" alt="logo" />
        <p>₩100,000,000</p>
      </div>
    </>
  );
}

export default Wallet;
