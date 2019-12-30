export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("NerdBro-User"));
  console.log("user");
  console.log(user);

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
