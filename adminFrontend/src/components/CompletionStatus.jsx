import React from 'react';
import StatusBlock from './StatusBlock'; // Import the new component

const CompletionStatus = ({ pageStatus }) => {

    const pageNameMapping = {
        configPage: "Configuration Page",
        timeSlotPage: "Timeslot Page",
    };

  return (
    <div className="items-center">
      <h2 className="text-2xl font-semibold text-center font-montserrat">Completion Status</h2>
      <ul className="p-5">
        {Object.entries(pageStatus).map(([page, status]) => (
          <li key={page}>
            <StatusBlock text={pageNameMapping[page] || page}  status={status} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletionStatus;