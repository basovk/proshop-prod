import React, { useEffect } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

const CartScreen = ({ cartItems }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    router.push("/login?redirect=shipping");
  };

  const itemsInTotal = cartItems.reduce(
    (totalCount, currentItem) => totalCount + currentItem.qty,
    0
  );

  const priceInTotal = cartItems
    .reduce(
      (totalCount, currentItem) =>
        totalCount + currentItem.qty * currentItem.price,
      0
    )
    .toFixed(2);

  return (
    <Row>
      <Head>
        <title>
          {itemsInTotal} Items in Cart - ${priceInTotal} - ProShop
        </title>
      </Head>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <Message>
              Your cart is empty.{" "}
              <Link href="/">
                <a>Go Back</a>
              </Link>
              .
            </Message>
          </>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => {
              return (
                <ListGroup.Item key={cartItem._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        href={`/product/[productId]`}
                        as={`/product/${cartItem._id}`}
                      >
                        <a>{cartItem.name}</a>
                      </Link>
                    </Col>
                    <Col md={2}>${cartItem.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={cartItem.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(cartItem._id, Number(e.target.value))
                          );
                        }}
                      >
                        {[...Array(cartItem.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(cartItem._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>Subtotal ({itemsInTotal}) items</h2>
              <p>${priceInTotal}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={() => checkoutHandler()}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={8}></Col>
    </Row>
  );
};

export default CartScreen;
