import React from "react";

const Loader = () => {
  return (
    <div className="flex fixed top-1/2 left-1/2 justify-center items-center max-h-screen">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
