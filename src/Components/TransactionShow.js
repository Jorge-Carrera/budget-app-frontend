import { useState, useEffect } from "react";
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const API = process.env.REACT_APP_API_URL;

export default function TransactionShow() {
  const [transaction, setTransaction] = useState({});
  const { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((res) => setTransaction(res.data))
      .catch(err => console.log(err))
  }, [index]);

  const handleDelete = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then((res) => navigate('/transactions'))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Card>
      <Card.Title>Name: {transaction.item_name}</Card.Title>
      <ul>
        <Card.Text>
        <li>Amount: ${transaction.amount}</li>
        <li>Date: {transaction.date}</li>
        <li>From: {transaction.from}</li>
        <li>Category: {transaction.category}</li>
        </Card.Text>
      </ul>
      </Card>
      <section>
        <Link to={`/transactions`}>
          <Button>Back</Button>
        </Link>
      </section>
      <section>
        <Link to={`/transactions/${index}/edit`}>
        <Button variant="warning">Edit</Button>
        </Link>
      </section>
      <section>
        <Button variant="danger" onClick={handleDelete}>Delete Entry</Button>
      </section>
    </div>
  )
}
