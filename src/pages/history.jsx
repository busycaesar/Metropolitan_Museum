import React from "react";
import { SearchHistoryAtom } from "../../store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Card, ListGroup, Button } from "react-bootstrap";
import styles from "@/styles/history.module.css";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(SearchHistoryAtom),
    router = useRouter();
  let parsedHistory = [];
  searchHistory.forEach((history) => {
    let params = new URLSearchParams(history),
      entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });
  const historyClicked = (e, index) => {
      router.push(`/artwork?${searchHistory[index]}`);
    },
    removeHistoryClicked = (e, index) => {
      e.stopPropagation();
      setSearchHistory((currentList) => {
        let newList = [...currentList];
        newList.splice(index, 1);
        return newList;
      });
    };
  return (
    <>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map((historyQueries, index) => (
            <ListGroup.Item
              onClick={(e) => historyClicked(e, index)}
              key={index}
              className={styles.historyListItem}
            >
              {Object.keys(historyQueries).map((key) => (
                <>
                  {key}: <strong>{historyQueries[key]}</strong>{" "}
                </>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <h4>Nothing Here!</h4>
            <p>Try searching for something else!</p>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
