/* eslint-disable react/no-unescaped-entities */
import React from "react";
import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ArtworkCard(props) {
  const objectId = props.data,
    { data, error } = useSWR(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    );
  if (error)
    return (
      <Error style={{ height: "10em !important" }} statusCode={404}></Error>
    );
  else if (data)
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={
              data?.primaryImageSmall
                ? data.primaryImageSmall
                : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            }
            height={250}
          />
          <Card.Body>
            <Card.Title>{data?.title ? data.title : "N/A"}</Card.Title>
            <Link href={`/artwork/${objectId}`} passHref legacyBehavior>
              <Button variant="primary">{data?.objectID}</Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  else return null;
}
