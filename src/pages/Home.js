import React from "react";
import { useProduct } from "../context/productProvider";
import ProductCard from "./../components/ProductCard";

const Home = () => {
  const {
    state: { loading, products, error },
  } = useProduct();

  let content;

  if (loading) {
    content = <p>Loading ......</p>;
  }
  if (error) {
    content = <p>Somthing Went Wrong</p>;
  }
  if (!loading && !error && products.length === 0) {
    content = <p>No Products Found</p>;
  }
  if (!loading && !error && products.length) {
    content = products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
      {content}
    </div>
  );
};

export default Home;
