// export const baseURL = "http://127.0.0.1:8080"; //"https://llr-back.cleverapps.io"; //

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://blog-backend-pe2z.onrender.com";
} else {
  baseURL = "http://127.0.0.1:5000";
}

export { baseURL };
