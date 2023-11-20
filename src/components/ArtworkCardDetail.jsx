import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Error from "next/error";
import useSWR from "swr";
import { useAtom } from "jotai";
import { FavouriteAtom } from "../../store";

export default function ArtworkCardDetail(props) {
  const objectID = props.data?.objectID,
    { data, error } = useSWR(
      objectID
        ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        : null
    ),
    [favouriteList, setFavouriteList] = useAtom(FavouriteAtom),
    [showAdded, setShowAdded] = useState(favouriteList.includes(objectID)),
    favouritesClicked = () => {
      if (showAdded) {
        setFavouriteList((currentFavouriteList) =>
          currentFavouriteList.filter(
            (favouriteElementId) => favouriteElementId != objectID
          )
        );
        setShowAdded(false);
      } else {
        setFavouriteList((currentFavouriteList) => [
          ...currentFavouriteList,
          objectID,
        ]);
        setShowAdded(true);
      }
    };
  if (error) return <Error statusCode={404}></Error>;
  else if (data && data.length <= 0) return null;
  else
    return (
      <Card style={{ width: "18rem" }}>
        {data?.primaryImage ? (
          <Card.Img
            style={{ marginBottom: "2em" }}
            variant="top"
            src={data.primaryImage}
          />
        ) : null}
        <Card.Body>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li>
              <strong>Artist Name:</strong>
              {data?.artistDisplayName ? (
                <>
                  {" " + data.artistDisplayName + ": "}
                  <a
                    href={data.artistWikidata_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Wiki
                  </a>
                </>
              ) : (
                " N/A"
              )}
            </li>
            <li>
              <strong>Credit Line:</strong>
              {data?.creditLine ? " " + data.creditLine : " N/A"}
            </li>
            <li>
              <strong>Dimensions:</strong>
              {data?.dimensions ? " " + data.dimensions : " N/A"}
            </li>
          </ul>
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            + Favourite {showAdded ? " (added)" : null}
          </Button>
        </Card.Body>
      </Card>
    );
}
