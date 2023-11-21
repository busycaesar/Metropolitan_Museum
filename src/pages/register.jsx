import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "../../lib/authenticate";
import { useRouter } from "next/router";

export default function Register() {
  const [userName, setUserName] = useState(""),
    [password, setPassword] = useState(""),
    [password2, setPassword2] = useState(""),
    [warning, setWarning] = useState(""),
    router = useRouter(),
    handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await registerUser(userName, password, password2);
        router.push("/login");
      } catch (err) {
        setWarning(err.message);
      }
    };
  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          <span>Enter your information below:</span>
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
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            id="password2"
            name="password2"
          />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Register
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
