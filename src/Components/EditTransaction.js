import {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL;


export default function EditTransaction() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    item_name: '',
    amount: 100,
    date: '',
    from: '',
    category: ''
  })

  const handleChange = (e) => {
    setTransaction({...transaction, [e.target.id]: e.target.value})
  }

  useEffect(() => {
    axios.get(`${API}/transactions/${index}`)
    .then((res) => setTransaction(res.data))
    .catch(err => console.log(err))
  },[index])

  const updateTransaction = () => {
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then (res => {
        setTransaction(res.data)
        navigate(`/transactions/${index}`)
      })
      .catch(err => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransaction();
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
        <br/>
        <label>Category:</label>
        <select value={transaction.category} id='category' onChange={handleChange} >
          <option value='housing'>Housing</option>
          <option value='Income'>Income</option>
          <option value='transportation'>Transportation</option>
          <option value='food'>Food</option>
          <option value='utilities'>Utilities</option>
          <option value='entertainment'>Entertainment</option>
        </select>
        <br/>
        <input type="submit" />
      </form>
      <Link to={`/transactions/${index}`}>
        <button>Cancel</button>
      </Link>
    </div>
  )
}
