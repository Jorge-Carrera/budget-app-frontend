import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setMaxGoal(maxRef.current.value);
    sessionStorage.setItem("maxGoal", maxRef.current.value);
    setMinGoal(minRef.current.value);
    sessionStorage.setItem("minGoal", minRef.current.value);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
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
          </Form.Group>
          <Form.Group className="mb-3" controlId="minimum">
            <Form.Label>Set Minimum</Form.Label>
            <Form.Control
              ref={minRef}
              placeholder={`Current Min: ${currencyFormatter.format(minGoal)}`}
              type="number"
              required
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
