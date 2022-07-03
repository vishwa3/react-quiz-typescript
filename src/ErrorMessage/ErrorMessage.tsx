import React from "react";

const ErrorMessage: React.FC = ({ children }) => {
  return (
    <>
      <span
        style={{
          backgroundColor: "orangered",
          textAlign: "center",
          padding: "10px",
          borderRadius: "5px",
          color: "white",
          width: "100%",
        }}
      >
        {children}
      </span>
    </>
  );
};

export default ErrorMessage;
