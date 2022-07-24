import React from "react";
import { Link } from 'react-router-dom'

export default function Transaction({ txn, i }) {
  return (
    <tr>
      <td>
        <p>{txn.date}</p>
      </td>
      <td>
        <p> {txn.item_name}</p>
      </td>
      <td>
        <p>$ {txn.amount}</p>
      </td>
      <td>
        <p>{txn.category}</p>
      </td>
      <td>
      <Link to={`/transactions/${i}`}> More Info</Link>
      </td>
    </tr>
    
  );
}
