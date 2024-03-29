import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { authenticateUser } from "../../lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { FavouriteAtom, SearchHistoryAtom } from "../../store";
import { getFavourites, getSearchHistory } from "../../lib/userData";
import Link from "next/link";

export default function Login() {
  const [userName, setUserName] = useState(""),
    [password, setPassword] = useState(""),
    [warning, setWarning] = useState(""),
    [favouriteList, setFavouriteList] = useAtom(FavouriteAtom),
    [searchHistory, setSearchHistory] = useAtom(SearchHistoryAtom),
    router = useRouter(),
    updateAtoms = async () => {
      setFavouriteList(await getFavourites());
      setSearchHistory(await getSearchHistory());
    },
    handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await authenticateUser(userName, password);
        await updateAtoms();
        router.push("/favourites");
      } catch (err) {
        setWarning(err.message);
      }
    };
  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          <span>Enter your login information below:</span>
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="userName"
            name="userName"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
        </Form.Group>
        <br />
        <p>
          <Link href="/register">Dont have an account?</Link>
        </p>
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
        <br />
        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}
      </Form>
    </>
  );
}
