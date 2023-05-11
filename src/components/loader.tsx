import React from "react";

const baseClasses = "h-2.5 w-2.5 bg-current rounded-full";

const Loader = (): JSX.Element => {
  return (
    <div className="flex">
      <div className={`${baseClasses} mr-1 animate-bounce`}></div>
      <div className={`${baseClasses} mr-1 animate-bounce200`}></div>
      <div className={`${baseClasses} animate-bounce400`}></div>
    </div>
  );
};

export default Loader;
