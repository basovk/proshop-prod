import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import NavLink from "./navigation/NavLink";
import { logout } from "../actions/userActions";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavLink href="/" text="ProShop" brand />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              <NavLink href="/" iconClassName="fas fa-home" text="Home" />
              <NavLink
                href="/cart"
                iconClassName="fas fa-shopping-cart"
                text="Cart"
              />
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item variant="dark">
                    <NavLink
                      href="/profile"
                      iconClassName="fas fa-user"
                      text="Profile"
                      variant="dark"
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Item variant="dark" onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink
                  href="/login"
                  iconClassName="fas fa-user"
                  text="Sign In"
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
