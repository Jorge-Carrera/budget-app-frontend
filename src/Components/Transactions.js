import { useState, useEffect } from "react";
import axios from "axios";
import Transaction from "./Transaction";
const API = process.env.REACT_APP_API_URL;

export default function Transactions() {
  const [TXNS, setTXNS] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((res) => setTXNS(res.data))
      .catch((e) => console.log(e))
  }, [])

  
  return (
    <div className="transactions">
      <section>
        <h1>Total: ${total}</h1>
        <table>
        <thead>
          <th>Date</th>
          <th>Item Name</th>
          <th>Amount</th>
          <th>Category</th>
        </thead>
        <tbody>
        {TXNS.map((txn, index) => {
          return <Transaction key={index} txn={txn} i={index} />
        })}
        </tbody>
        </table>
      </section>
    </div>
  );
}
