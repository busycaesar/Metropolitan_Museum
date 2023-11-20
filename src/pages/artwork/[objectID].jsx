import React from "react";
import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";

export default function ObjectID() {
  const router = useRouter(),
    objectId = router.query;
  return (
    <Row>
      <Col>
        <ArtworkCardDetail data={objectId} />
      </Col>
    </Row>
  );
}
