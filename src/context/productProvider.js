import React, { useEffect, createContext, useContext, useReducer } from "react";
import {
  initialState,
  productReducer,
} from "./../state/productState/ProductReducer";
import { actionTypes } from "./../state/productState/ActionTypes";

export const PRODUCT_CONTEXT = createContext();

function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);
  useEffect(() => {
    {
      dispatch({ type: actionTypes.FETCHING_START });
    }
    fetch("products.json")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data })
      )
      .catch(() => dispatch({ type: actionTypes.FETCHING_ERROR }));
  }, []);

  const value = {
    state,
    dispatch,
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
