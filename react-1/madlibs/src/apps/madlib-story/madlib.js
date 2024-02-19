// Madlib.js
import React, { useState } from 'react';
import MadlibForm from './MadlibForm';
import MadlibStory from './MadlibStory';

const Madlib = () => {
  const [formData, setFormData] = useState({});
  const [story, setStory] = useState('');
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = (data) => {
    const { adjective, noun, verb, adverb } = data;
    const newStory = `There was a ${adjective} ${noun} who loved a ${verb} ${adverb}.`;
    setStory(newStory);
    setShowForm(false);
  };

  const handleRestart = () => {
    setFormData({});
    setStory('');
    setShowForm(true);
  };

  return (
    <div>
      {showForm ? (
        <MadlibForm onSubmit={handleFormSubmit} />
      ) : (
        <MadlibStory story={story} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Madlib;
