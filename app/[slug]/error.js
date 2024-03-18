"use client";
const Error = ({ error, reset }) => {
  return (
    <div>
      <p>Error reading blog</p>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Reload</button>
    </div>
  );
};
export default Error;
