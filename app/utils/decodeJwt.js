export function decodeJwt(token) {
  const [headerEncoded, payloadEncoded] = token.split(".");

  const header = JSON.parse(atob(headerEncoded));
  const payload = JSON.parse(atob(payloadEncoded));

  return { header, payload };
}
