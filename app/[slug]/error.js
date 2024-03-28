"use client";
import { useAuth } from "../utils/authProvider";
const Error = ({ error, reset }) => {
  const { user, setUser } = useAuth();
  return (
    <div>
      <p>Error reading blog</p>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Reload</button>
    </div>
  );
};
export default Error;
