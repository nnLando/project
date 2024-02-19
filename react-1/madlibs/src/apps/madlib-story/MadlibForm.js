import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MadlibForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    adjective: "",
    noun: "",
    verb: "",
    adverb: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).every(Boolean)) {
      onSubmit(formData);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1>Madlibs!</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="adjective" className="form-label">
              Adjective:
            </label>
            <input
              type="text"
              className="form-control"
              id="adjective"
              name="adjective"
              value={formData.adjective}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="noun" className="form-label">
              Noun:
            </label>
            <input
              type="text"
              className="form-control"
              id="noun"
              name="noun"
              value={formData.noun}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="verb" className="form-label">
              Verb:
            </label>
            <input
              type="text"
              className="form-control"
              id="verb"
              name="verb"
              value={formData.verb}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="adverb" className="form-label">
              Adverb:
            </label>
            <input
              type="text"
              className="form-control"
              id="adverb"
              name="adverb"
              value={formData.adverb}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <button type="submit" className="btn btn-primary">
            Get Story
          </button>
        </div>
      </div>
    </form>
  );
};

export default MadlibForm;
