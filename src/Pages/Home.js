import React from "react";
import logo from "../images/money-map.jpg";


export default function Home() {
  return (
    <div className="article">
      <img src={logo} alt='map-home-page' className="homeImg" />
      <section className="h1Section">
      <h1 className="homeH1 font-link">Conquer your wallet, then the World...</h1>
      </section>
    </div>
  );
}
