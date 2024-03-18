// export const baseURL = "http://127.0.0.1:8080"; //"https://llr-back.cleverapps.io"; //

// let baseURL;

// if (process.env.NODE_ENV === "production") {
//   baseURL = "https://blog-next-vjds.onrender.com";
// } else {
//   baseURL = "http://localhost:3000";
// }

// export { baseURL };

async function detectBaseURL(urls) {
  // Loop through the URLs and check if they are available
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        // If the response is successful, return the URL
        return url;
      }
    } catch (error) {
      // If an error occurs (e.g., network error), log it and continue to the next URL
      console.error(`Error while checking URL ${url}:`, error);
    }
  }

  // If no URL is available, return a default URL
  return "http://localhost:3000";
}

const urls = [
  "https://blog-next-vjds.onrender.com",
  "https://blog-next-7i455j70q-ptar.vercel.app",
];

const baseURL = await detectBaseURL(urls);

export { baseURL };
