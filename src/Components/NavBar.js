import { Link } from "react-router-dom";
import React from "react";
import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <h1 className="me-auto ms-4">
        <Link to="/transactions"> Budget App </Link>
      </h1>
      <Button className="justify-content-end me-4" variant="outline-light">
        <Link to="/transactions/new"> New Entry </Link>
      </Button>
    </Navbar>
  );
}
