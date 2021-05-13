import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../../src/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import CartScreen from "../../src/screens/CartScreen";
import { addToCart } from "../../src/actions/cartActions";

const Cart = () => {
  const [loading, setLoading] = new useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (router && router.query) {
      const { slug } = router.query;
      if (slug) {
        const { qty } = router.query;
        const productId = slug[0];
        dispatch(addToCart(productId, Number(qty)));
        setLoading(false);
        router.push("/cart");
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  return <>{loading ? <Loader /> : <CartScreen {...{ cartItems }} />}</>;
};

export default Cart;
