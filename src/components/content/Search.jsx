import React from "react";

const Search = ({ valuses, setvaluses }) => {
  return (
    <>
      <div className="animate__animated animate__lightSpeedInLeft inputBox text-center my-1">
        <input
          type="text"
          value={valuses}
          onChange={(e) => setvaluses(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;
