import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { SearchHistoryAtom } from "../../store";
import { useAtom } from "jotai";
import { addToSearchHistory } from "../../lib/userData";
import { readToken, removeToken } from "../../lib/authenticate";

export default function MainNav() {
  const [searchField, setSearchField] = useState(""),
    [isExpanded, setIsExpanded] = useState(false),
    changeSearchField = (e) => setSearchField(e.target.value),
    router = useRouter(),
    [searchHistory, setSearchHistory] = useAtom(SearchHistoryAtom),
    onSubmit = async (e) => {
      e.preventDefault();
      let queryString = `title=true&q=${searchField}`;
      setIsExpanded(false);
      setSearchHistory(await addToSearchHistory(queryString));
      router.push(`/artwork?${queryString}`);
    },
    logout = () => {
      setIsExpanded(false);
      removeToken();
      router.push("/login");
    };
  let token = readToken();
  return (
    <Navbar bg="primary" variant="dark" expand="lg" expanded={isExpanded}>
      <Container>
        <Navbar.Brand href="#">Dev Jigishkumar Shah</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarbuttons"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="navbarbuttons">
          <Nav className="me-auto">
            <Link legacyBehavior passHref href="/">
              <Nav.Link
                active={router.pathname === "/"}
                onClick={() => setIsExpanded(false)}
              >
                Home
              </Nav.Link>
            </Link>
            {token && (
              <Link legacyBehavior passHref href="/search">
                <Nav.Link
                  active={router.pathname === "/search"}
                  onClick={() => setIsExpanded(false)}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            )}
          </Nav>
          {token && (
            <>
              <Form className="d-flex" onSubmit={onSubmit}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-sm-2"
                  onChange={changeSearchField}
                />
                <Button variant="secondary" type="submit">
                  Search
                </Button>
              </Form>
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link legacyBehavior passHref href="/favourites">
                    <NavDropdown.Item
                      active={router.pathname === "/favourites"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link legacyBehavior passHref href="/history">
                    <NavDropdown.Item
                      active={router.pathname === "/history"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={() => logout()}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          )}
          {!token && (
            <Nav className="d-flex">
              <Link legacyBehavior passHref href="/login">
                <Nav.Link
                  active={router.pathname === "/login"}
                  onClick={() => setIsExpanded(false)}
                >
                  Login
                </Nav.Link>
              </Link>
              <Link legacyBehavior passHref href="/register">
                <Nav.Link
                  active={router.pathname === "/register"}
                  onClick={() => setIsExpanded(false)}
                >
                  Register
                </Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
