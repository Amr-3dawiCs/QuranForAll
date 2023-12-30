const log = localStorage.getItem("isLoggedIn");

if (!log) {
  document.location.href = "../index html/homepage.html";
}
