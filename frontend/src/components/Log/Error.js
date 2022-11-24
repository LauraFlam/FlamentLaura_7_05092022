import React from "react";


const Error = ({ value, className }) => {
  return (
    <div className={className}>
      <span>{value}</span>
    </div>
  );
};

export default Error;