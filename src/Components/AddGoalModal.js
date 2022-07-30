import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import { currencyFormatter } from "../utils";

export default function AddGoalModal({
  show,
  handleClose,
  maxGoal,
  minGoal,
  setMinGoal,
  setMaxGoal,
}) {
  const maxRef = useRef();
  const minRef = useRef();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.stopPropagation();
    }
    if (e.target.checkValidity()) {
      setMaxGoal(maxRef.current.value);
      sessionStorage.setItem("maxGoal", maxRef.current.value);
      setMinGoal(minRef.current.value);
      sessionStorage.setItem("minGoal", minRef.current.value);
      handleClose();
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Set A New Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="maximum">
            <Form.Label>New Goal</Form.Label>
            <Form.Control
              ref={maxRef}
              placeholder={`Current goal: ${currencyFormatter.format(maxGoal)}`}
              type="number"
              required
              min={0}
            />
             <Form.Control.Feedback type="invalid">
                  Please set a new savings goal
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Looks Good! Best of Luck!
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="minimum">
            <Form.Label>Set Minimum</Form.Label>
            <Form.Control
              ref={minRef}
              placeholder={`Current Min: ${currencyFormatter.format(minGoal)}`}
              type="number"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
