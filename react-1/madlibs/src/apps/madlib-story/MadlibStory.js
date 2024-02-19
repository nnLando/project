// MadlibStory.js
import React from 'react';

const MadlibStory = ({ story, onRestart }) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1>Story:</h1>
          <br/>
          <p className='lead'>{story}</p>
          <br/>
          <button className="btn btn-primary" onClick={onRestart}>Restart</button>
        </div>
      </div>
    </div>
  );
};

export default MadlibStory;
