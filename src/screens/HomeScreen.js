import React from "react";
import Home from "../components/Home";
import Products from "./Products";

function HomeScreen() {
  return (
    <>
      <header>
        <Home />
      </header>
      <main>
        <section>
          {/* <section className="products-center">
            <ProductsSlider />
          </section> */}
          <section className="products-center">
            <Products />
          </section>
        </section>
      </main>
    </>
  );
}

export default HomeScreen;
