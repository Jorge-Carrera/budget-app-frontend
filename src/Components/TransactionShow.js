import { useState, useEffect } from "react";
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from "axios";
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
      <h2>Name: {transaction.item_name}</h2>
      <ul>
        <li>Amount: ${transaction.amount}</li>
        <li>Date: {transaction.date}</li>
        <li>From: {transaction.from}</li>
        <li>Category: {transaction.category}</li>
      </ul>
      <section>
        <Link to={`/transactions`}>
          <button>Back</button>
        </Link>
      </section>
      <section>
        <button onClick={handleDelete}>Delete Entry</button>
      </section>
    </div>
  )
}
