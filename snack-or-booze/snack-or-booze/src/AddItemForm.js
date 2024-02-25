// AddItemForm.js
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SnackOrBoozeApi from "./Api";
import "./AddItemForm.css"; // Import the CSS file

function AddItemForm({ type }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    recipe: "",
    serve: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "snacks") {
      await SnackOrBoozeApi.addSnack(formData);
    } else if (type === "drinks") {
      await SnackOrBoozeApi.addDrink(formData);
    }

    history.push(`/${type}`);
  };

  return (
    <div className="form-container">
      <h2>Add {type === "snacks" ? "Snack" : "Drink"}</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="form-group">
          <Label for="name" className="form-label">
            Name
          </Label>
          <Input type="text" name="name" id="name" onChange={handleChange} required className="form-input" />
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="description" className="form-label">
            Description
          </Label>
          <Input type="text" name="description" id="description" onChange={handleChange} required className="form-input" />
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="recipe" className="form-label">
            Recipe
          </Label>
          <Input type="text" name="recipe" id="recipe" onChange={handleChange} required className="form-input" />
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="serve" className="form-label">
            Serve
          </Label>
          <Input type="text" name="serve" id="serve" onChange={handleChange} required className="form-input" />
        </FormGroup>
        <Button type="submit" color="primary" className="form-button">
          Add {type === "snacks" ? "Snack" : "Drink"}
        </Button>
        <Link to={`/${type}`}>
          <Button color="secondary" className="form-cancel-button">
            Cancel
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default AddItemForm;
