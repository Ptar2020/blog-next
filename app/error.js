"use client";

const Error = ({ error, reset }) => {
  return (
    <div>
      <p>Error occurred</p>
      <p className="text-danger" disabled>
        <i>{error.message}</i>
      </p>
      <div>
        <button className="alert-success" onClick={() => reset()}>
          Retry
        </button>
      </div>
    </div>
  );
};
export default Error;
