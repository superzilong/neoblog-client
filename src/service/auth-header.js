export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("NerdBro-User"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
