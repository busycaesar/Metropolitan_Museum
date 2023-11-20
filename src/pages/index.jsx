/*********************************************************************************
 *  WEB422 – Assignment 5
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: DEV JIGISHKUMAR SHAH Student ID: 131623217 Date: 12/11/2023
 *
 *  Deployment Link: https://web-422-metropolitan-museum-jotai.vercel.app/
 *
 *  GitHub Link: https://github.com/busycaesar/WEB_422_Metropolitan_Museum_Jotai
 *
 ********************************************************************************/

/* eslint-disable react/no-unescaped-entities */
import { Image, Row, Col } from "react-bootstrap";
import homeImage from "@/images/home.jpg";

export default function Home() {
  return (
    <>
      <h1>The Metropolitan Museum of Art</h1>
      <Row>
        <Col md={6}>
          <Image src={homeImage.src} alt="Description of the image" fluid />
        </Col>
        <Col md={3}>
          The Metropolitan Museum of Art in New York City, colloquially "the
          Met", is the largest art museum in the Americas. In 2022 it welcomed
          3,208,832 visitors, ranking it the third most visited U.S museum, and
          eighth on the list of most-visited art museums in the world.[6] Its
          permanent collection contains over two million works, divided among 17
          curatorial departments. The main building at 1000 Fifth Avenue, along
          the Museum Mile on the eastern edge of Central Park on Manhattan's
          Upper East Side, is by area one of the world's largest art museums.
          The first portion of the approximately 2-million-square-foot (190,000
          m<sup>2</sup>) building was built in 1880. A much smaller second
          location, The Cloisters at Fort Tryon Park in Upper Manhattan,
          contains an extensive collection of art, architecture, and artifacts
          from medieval Europe.
        </Col>
        <Col md={3}>
          The Metropolitan Museum of Art was founded in 1870 with its mission to
          bring art and art education to the American people. The museum's
          permanent collection consists of works of art from classical antiquity
          and ancient Egypt, paintings, and sculptures from nearly all the
          European Old Masters, and an extensive collection of American and
          modern art. The Met maintains extensive holdings of African, Asian,
          Oceanian, Byzantine, and Islamic art. The museum is home to
          encyclopedic collections of musical instruments, costumes, and
          accessories, as well as antique weapons and armor from around the
          world. Several notable interiors, ranging from 1st-century Rome
          through modern American design, are installed in its galleries.
          <a
            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
            target="_blank"
            rel="noreferrer"
          >
            …
          </a>
        </Col>
      </Row>
    </>
  );
}
