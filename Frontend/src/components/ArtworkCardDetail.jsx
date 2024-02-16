import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Error from "next/error";
import useSWR from "swr";
import { useAtom } from "jotai";
import { FavouriteAtom } from "../../store";
import { addToFavourites, removeFromFavourites } from "../../lib/userData";

export default function ArtworkCardDetail(props) {
  const objectID = props.data?.objectID,
    { data, error } = useSWR(
      objectID
        ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        : null
    ),
    [favouriteList, setFavouriteList] = useAtom(FavouriteAtom),
    [showAdded, setShowAdded] = useState(false),
    favouritesClicked = async () => {
      if (showAdded) {
        setShowAdded(false);
        setFavouriteList(await removeFromFavourites(objectID));
      } else {
        setShowAdded(true);
        setFavouriteList(await addToFavourites(objectID));
      }
    };
  useEffect(() => {
    setShowAdded(favouriteList?.includes(objectID));
  }, [favouriteList, objectID]);
  if (error) return <Error statusCode={404}></Error>;
  else if (data && data.length <= 0) return null;
  else
    return (
      <Card style={{ width: "18rem" }}>
        {data?.primaryImage ? (
          <Card.Img variant="top" src={data.primaryImage} height={250} />
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
