import React, { useState } from "react";
import { Row, Col, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "./ArtworkCard";

export default function DisplayArtworks(props) {
  const [page, setPage] = useState(1),
    previousPage = () => (page > 1 ? setPage(page - 1) : null),
    nextPage = () => (page < artworkList.length ? setPage(page + 1) : null),
    artworkList = props.artworkList;
  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          <>
            {artworkList[page - 1].map((artwork) => (
              <Col lg={3} key={artwork}>
                <ArtworkCard data={artwork} />
              </Col>
            ))}
          </>
        ) : (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <h4>Nothing Here!</h4>
              <p>Try searching for something else!</p>
            </Card.Body>
          </Card>
        )}
      </Row>
      {artworkList.length > 1 ? (
        <Row style={{ marginTop: "2em" }}>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} disabled={page <= 1} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next
                onClick={nextPage}
                disabled={page >= artworkList.length}
              />
            </Pagination>
          </Col>
        </Row>
      ) : null}
    </>
  );
}
