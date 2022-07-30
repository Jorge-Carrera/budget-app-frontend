import { Link } from "react-router-dom";
import React from "react";
import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import GiTakeMyMoney from "../Icons";

export default function NavBar() {
  return (
    <Navbar className="NavBar">
      <Link to="/">
        <GiTakeMyMoney className="navBarIcon" />
      </Link>
      <h1 className="me-auto ms-1 font-link ">
        <Button className="navBarBttn navH1" variant="outline-dark">
          <Link to="/transactions"> Budget App </Link>
        </Button>
      </h1>
      <Button
        className="justify-content-end me-4 font-link navBarBttn"
        variant="outline-dark"
      >
        <Link to="/transactions/new"> New Entry </Link>
      </Button>
    </Navbar>
  );
}
