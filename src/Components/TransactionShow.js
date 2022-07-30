import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


const API = process.env.REACT_APP_API_URL;

export default function TransactionShow() {
  const [transaction, setTransaction] = useState({});
  const { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((res) => setTransaction(res.data))
      .catch((err) => console.log(err));
  }, [index]);
  
  const handleDelete = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then((res) => navigate("/transactions"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex align-items-center justify-content-center text-center mt-5">
      <Card responsive className="mr-5 showCard" >
        <Card.Header as="h3">Entry Number: {Number(index) + 1}</Card.Header>
        <Card.Title className="mt-3 showCardTitle">Name: {transaction.item_name}</Card.Title>
        <Card.Body>
          <ul>
            <Card.Text>
              <li>Amount: ${transaction.amount}</li>
              <li>Date: {transaction.date}</li>
              <li>From: {transaction.from}</li>
              <li>Category: {transaction.category}</li>
            </Card.Text>
          </ul>
          <Link to={`/transactions`}>
            <Button className="me-4 mt-4" variant="outline-dark">
              Back
            </Button>
          </Link>
          <Link to={`/transactions/${index}/edit`}>
            <Button className="me-4 mt-4" variant="outline-dark">
              Edit
            </Button>
          </Link>
          <Button className="mt-4" variant="outline-dark" onClick={handleDelete}>
            Delete Entry
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
