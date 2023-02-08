import { remove } from "../storage/localStorage.js";
import { clear } from "../storage/localStorage.js";

function ProfileLogOut() {
  const logOut = document.querySelector(".cta-logout-cta");
  logOut.addEventListener("click", (e) => {
    remove("user");
    remove("Token");
    remove("profile");
    remove("userName");
    remove("credits");
  });
}
ProfileLogOut();