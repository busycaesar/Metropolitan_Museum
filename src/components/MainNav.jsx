import React, { useState } from "react";
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

export default function MainNav() {
  const [searchField, setSearchField] = useState(""),
    [isExpanded, setIsExpanded] = useState(false),
    changeSearchField = (e) => setSearchField(e.target.value),
    router = useRouter(),
    [searchHistory, setSearchHistory] = useAtom(SearchHistoryAtom),
    onSubmit = (e) => {
      e.preventDefault();
      let queryString = `title=true&q=${searchField}`;
      setIsExpanded(false);
      setSearchHistory((currentList) => [...currentList, queryString]);
      router.push(`/artwork?${queryString}`);
    };
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
            <Link legacyBehavior passHref href="/search">
              <Nav.Link
                active={router.pathname === "/search"}
                onClick={() => setIsExpanded(false)}
              >
                Advanced Search
              </Nav.Link>
            </Link>
          </Nav>
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
            <NavDropdown title="Username" id="basic-nav-dropdown">
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
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
