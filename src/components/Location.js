import React from "react";

const Location = ({
  place,
  setPlace,
  editMode,
  setEditMode,
  setInputValue,
  submitMyForm,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    submitMyForm();
  };
  if (editMode) {
    return (
      <form onSubmit={(e) => handleSubmit(e)} className="active-form">
        <input
          type="text"
          className="active-form"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
			 placeholder="Where?"
        />
      </form>
    );
  } else {
    return (
      <button
        className="location"
        onClick={() => {
          setEditMode(true);
        }}
      >
        in {place}
      </button>
    );
  }
};

export default Location;
