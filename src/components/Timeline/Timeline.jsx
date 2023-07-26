import React, { useEffect, useState } from 'react';

const Timeline = ({ steps }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const totalSteps = steps.length;

    for (let i = 0; i < totalSteps; i++) {
      const stepDate = new Date(steps[i].date);
      if (currentDate < stepDate) {
        setProgress((i / totalSteps) * 100);
        break;
      } else if (i === totalSteps - 1) {
        setProgress(100);
      }
    }
  }, [steps]);

  return (
    <div className="timelineContainer">
    <div className="timeline">
      <div
        className="progress"
        style={{ height: `${progress}%` }}
      ></div>
          </div>
      <div className="stepContainer">
      {steps && steps.map((step, index) => (
        <div
          key={index}
          className={`step ${progress > (index / steps.length) * 100 ? 'completed' : ''}`}
        >
          {step.name}
        </div>
      ))}
      </div>
    </div>
  );
};

export default Timeline;