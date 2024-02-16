import React from "react";
import MainNav from "./MainNav";
import { Container } from "react-bootstrap";

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <Container className="mainContainer">{props.children}</Container>
    </>
  );
}
