import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const API = process.env.REACT_APP_API_URL;

export default function NewEntryForm() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const addNewEntry = () => {
    axios
      .post(`${API}/transactions`, transaction)
      .then((res) => navigate("/transactions"))
      .catch((err) => console.log(err));
  };

  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: 10,
    date: "",
    from: "",
    category: "",
  });

  const handleChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

    
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.stopPropagation();
    }
    if (event.target.checkValidity()) {
      addNewEntry();
    }
    setValidated(true);
  };

  return (
    <div>
      <br />
      <Container>
        <h1>Add A New Entry:</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md>
              <Form.Group>
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
              <Form.Group>
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  required
                  id="date"
                  type="date"
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
              <Form.Group>
                <Form.Label>From:</Form.Label>
                <Form.Control
                  required
                  id="from"
                  type="text"
                  name="from"
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
              <Form.Group>
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
        </Form>
      </Container>
    </div>
  );
}
