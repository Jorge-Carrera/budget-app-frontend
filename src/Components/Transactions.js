import { useState, useEffect } from "react";
import axios from "axios";
import Transaction from "./Transaction";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { currencyFormatter } from "../utils";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AddGoalModal from "./AddGoalModal";

const API = process.env.REACT_APP_API_URL;

export default function Transactions() {
  const [transaction, setTransaction] = useState([]);
  const [minGoal, setMinGoal] = useState(0);
  const [maxGoal, setMaxGoal] = useState(1000);
  const [showGoalModal, setShowGoalModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((res) => setTransaction(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const storedMaxGoal = sessionStorage.getItem("maxGoal") || 1000;
    setMaxGoal(storedMaxGoal);
  }, []);

  useEffect(() => {
    const storedMinGoal = sessionStorage.getItem("minGoal") || 0;
    setMinGoal(storedMinGoal);
  }, []);

  let amount = transaction.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  const getVariant = (amount, maxGoal, minGoal) => {
    if (amount > maxGoal) {
      return "success";
    } else if (amount > minGoal && amount < maxGoal) {
      return "warning";
    }
    return "danger";
  };

  const getClassNames = (amount, maxGoal, minGoal) => {
    const classNames = [];
    if (amount > maxGoal) {
      classNames.push("bg-success", "bg-opacity-50");
    } else if (amount > minGoal && amount < maxGoal) {
      classNames.push("bg-warning", "bg-opacity-50");
    } else {
      classNames.push("bg-danger", "bg-opacity-50");
    }
    return classNames.join(" ");
  };

  return (
    <div className="transactions">
      <section>
        <Container style={{ marginTop: "6rem" }}>
          <Card className={getClassNames(amount, maxGoal, minGoal)}>
            <Card.Body>
              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowGoalModal(true)}
                >
                  Set A New Goal
                </Button>
              </div>
              <h1 className="mb-3">
                Total In The Bank: {currencyFormatter.format(amount)}
              </h1>
              <p>Goal: {currencyFormatter.format(maxGoal)}</p>
              <ProgressBar
                className="rounded-pill mb-2"
                striped
                variant={getVariant(amount, maxGoal, minGoal)}
                max={maxGoal}
                min={minGoal}
                now={amount}
                animated
              ></ProgressBar>
            </Card.Body>
          </Card>
          <Table className="my-3" striped bordered hover variant="dark">
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
              {transaction.map((txn, index) => {
                return <Transaction key={index} txn={txn} i={index} />;
              })}
            </tbody>
          </Table>
        </Container>
      </section>
      <AddGoalModal
        show={showGoalModal}
        handleClose={() => setShowGoalModal(false)}
        maxGoal={maxGoal}
        minGoal={minGoal}
        setMaxGoal={setMaxGoal}
        setMinGoal={setMinGoal}
      />
    </div>
  );
}
