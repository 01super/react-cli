import React from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
export default () => (
  <>
    <header style={{ color: "red", fontSize: 30 }}>Header test</header>
    <section>
      <h2>url-loader test</h2>
      <label htmlFor="img1">大于8k</label>
      <img src={img1} id="img1" />
      <label htmlFor="img2">小于8k</label>
      <img src={img2} id="img2" />
    </section>
  </>
);
