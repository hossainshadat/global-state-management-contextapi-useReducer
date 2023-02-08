import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";

export const PRODUCT_CONTEXT = createContext();

function ProductProvider({ children }) {
  const [data, setData] = useState([]);

  // const [state, dispatch] = useReducer(reducer,initialstate)
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const value = {
    data,
  };
  return (
    <PRODUCT_CONTEXT.Provider value={value}>
      {children}
    </PRODUCT_CONTEXT.Provider>
  );
}

export const useProduct = () => {
  const context = useContext(PRODUCT_CONTEXT);
  return context;
};

export default ProductProvider;
