import { Link, NavLink } from "react-router-dom";
import React from "react";
import Navbar from "react-bootstrap/NavBar";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <h1><Link to="/transactions"> Budget App </Link></h1> 
      <Button variant="outline-light">
        <Link to="/transactions/new"> New Entry </Link>
      </Button>
      </Container>
    </Navbar>
  );
}
