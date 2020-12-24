import React from "react";

const Summary = ({ history }) => {
  return (
    <>
      <h1>hello i am summary page !@#</h1>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        go back
      </button>
    </>
  );
};

export default Summary;
