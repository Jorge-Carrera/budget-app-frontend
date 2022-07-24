import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL;


export default function NewEntryForm() {
  const navigate = useNavigate();

  const addNewEntry = () => {
    axios
      .post(`${API}/transactions`, transaction)
      .then((res) => navigate('/transactions'))
      .catch(err => console.log(err))
  }

  const [transaction, setTransaction] = useState({
    item_name: '',
    amount: 100,
    date: '',
    from: '',
    category: ''
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewEntry();
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          id="item_name"
          value={transaction.item_name}
          type="text"
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <br/>
        <label>Date:</label>
        <input
          id="date"
          type="text"
          required
          value={transaction.date}
          placeholder="Date"
          onChange={handleChange}
        />
         <br/>
        <label>From:</label>
        <input
          id="from"
          type="text"
          name="post"
          value={transaction.from}
          placeholder="From"
          onChange={handleChange}
        />
         <br/>
        <label>Amount:</label>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder='Amount'
          value={transaction.amount}
          onChange={handleChange}
        />
        <br />
        <label>Category:</label>
        <select value={transaction.category} id='category' onChange={handleChange} >
          <option value='housing'>Housing</option>
          <option value='Income'>Income</option>
          <option value='transportation'>Transportation</option>
          <option value='food'>Food</option>
          <option value='utilities'>Utilities</option>
          <option value='entertainment'>Entertainment</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  )
}
