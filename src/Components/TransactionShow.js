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
      <Card className="mr-5" style={{ width: "40rem" }}>
        <Card.Header as="h5">Entry Number: {Number(index) + 1}</Card.Header>
        <Card.Title className="mt-3">Name: {transaction.item_name}</Card.Title>
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
            <Button className="me-2" variant="secondary">
              Back
            </Button>
          </Link>
          <Link to={`/transactions/${index}/edit`}>
            <Button className="me-2" variant="secondary">
              Edit
            </Button>
          </Link>
          <Button variant="secondary" onClick={handleDelete}>
            Delete Entry
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
