/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Error from "next/error";
import useSWR from "swr";
import validObjectIDList from "../../../public/data/validObjectIDList.json";
import DisplayArtworks from "@/components/DisplayArtworks";

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];
  const { data, error } = useSWR(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
    ),
    [artworkList, setArtworkList] = useState([]);
  useEffect(() => {
    if (data) {
      let updatedData = validObjectIDList.objectIDs.filter((id) =>
          data.objectIDs?.includes(id)
        ),
        results = [];
      for (let i = 0; i < updatedData.length; i += PER_PAGE) {
        const chunk = updatedData?.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
    }
  }, [data]);
  if (error) return <Error statusCode={404}></Error>;
  else if (artworkList)
    return (
      <>
        <h1>Search Results:</h1>
        <DisplayArtworks artworkList={artworkList} />
      </>
    );
  else return null;
}
