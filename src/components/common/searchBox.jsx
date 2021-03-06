import React from "react";

const SeachBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      value={value}
      placeholder="Search..."
      className="form-control my-3"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SeachBox;
