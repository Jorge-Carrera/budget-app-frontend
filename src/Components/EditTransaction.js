import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const API = process.env.REACT_APP_API_URL;

export default function EditTransaction() {
  let { index } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: 100,
    date: "",
    from: "",
    category: "",
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((res) => setTransaction(res.data))
      .catch((err) => console.log(err));
  }, [index]);

  const updateTransaction = () => {
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then((res) => {
        setTransaction(res.data);
        navigate(`/transactions/${index}`);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === false) {
      event.stopPropagation();
    }
    if (event.target.checkValidity() === true) {
      updateTransaction();
    }
    setValidated(true);
  };

  return (
    <div>
      <br />
      <Container>
        <h1 className="mb-4">Add A New Entry:</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md>
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  required
                  id="item_name"
                  value={transaction.item_name}
                  type="text"
                  onChange={handleChange}
                  placeholder="Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please add a name
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <br />
            <Col md>
              <Form.Group controlId="formDate">
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  required
                  id="date"
                  type="text"
                  value={transaction.date}
                  placeholder="Date"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please add a date
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md>
              <Form.Group controlId="formFrom">
                <Form.Label>From:</Form.Label>
                <Form.Control
                  required
                  id="from"
                  type="text"
                  name="post"
                  value={transaction.from}
                  placeholder="From"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please add who its from
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group controlId="formAmount">
                <Form.Label>Amount:</Form.Label>
                <Form.Control
                  required
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Amount"
                  value={transaction.amount}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please add an amount
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Form.Group>
            <Form.Label>Category:</Form.Label>
            <Form.Select
              required
              value={transaction.category}
              id="category"
              defaultValue=""
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a Category
              </option>
              <option value="Housing">Housing</option>
              <option value="Income">Income</option>
              <option value="Transportation">Transportation</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
            </Form.Select>
            <Form.Control.Feedback type="valid">
              Looks Good
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please select a category
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Button variant="secondary" type="submit">
            Submit
          </Button>
          <Link to={`/transactions/${index}`}>
            <Button className="ms-2" variant="secondary">
              Cancel
            </Button>
          </Link>
        </Form>
      </Container>
    </div>
  );
}
