import { useState, useEffect } from "react";
import axios from "axios";
import Transaction from "./Transaction";
import Table from 'react-bootstrap/Table'
const API = process.env.REACT_APP_API_URL;

export default function Transactions() {
  const [TXNS, setTXNS] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((res) => setTXNS(res.data))
      .then((res) => getTotal(TXNS))
      .catch((e) => console.log(e));
  }, []);

  const getTotal = (TXNS) => {
    let result = 0;
    TXNS.map((txn) => {
      result += Number(txn.amount);
    });
    setTotal(result);
  };

  return (
    <div className="transactions">
      <section>
        <h1>Total: ${total}</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
            <th>Date</th>
            <th>Item Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Show More</th>
            </tr>
          </thead>
          <tbody>
            {TXNS.map((txn, index) => {
              return <Transaction key={index} txn={txn} i={index} />;
            })}
          </tbody>
        </Table>
      </section>
    </div>
  );
}
