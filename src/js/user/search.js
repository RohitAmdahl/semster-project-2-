import { ProfileLogOut } from "../handler/logout.js";
const searchUrl = "https://nf-api.onrender.com/api/v1/auction/listings?_tag";
const searchForm = document.querySelector("#searchForm");
const input = document.querySelector("#inputvalue");
const cardsDiv = document.querySelector("#auction");

async function searchApiCall() {
  try {
    const data = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${searchUrl}=${input.value}`, data); // .toLowerCase()
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const results = await response.json();
    cardsDiv.innerHTML = "";
    results.forEach((element) => {
      const endTime = new Date(element.endsAt).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      cardsDiv.innerHTML += `<div class="col-12 col-lg-4 col-md-6 col-sm-12 mt-4">
              <div class="card explore-cards">
                <img
                  src="${element.media[0]}"
                  class="card-img-top explore-media"
                />
                <div class="card-body">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Title ;- ${element.title}</li>
                    <li class="list-group-item lead">Bid :-  ${
                      element._count.bids
                    }</li>
                    <li class="list-group-item">
                    ${new Date(element.endsAt).toLocaleDateString()}</li>
                     <li class="list-group-item">Finishing Time: ${endTime}</li>
                  </ul>
                  <a  class="btn big-btn btn-sm d-flex justify-content-center p-2 rounded-2 fw-bold mt-3"
                   href="specific.html?id=${element.id}">View item</a>
                </div>
              </div>
            </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchForm = e.target;
  console.log(searchForm);

  searchApiCall();
});
const token = localStorage.getItem("Token");
const signup = document.querySelector(".cta-signup");
const login = document.querySelector(".cta-login");
const logout = document.querySelector(".cta-logout-cta");
const user = document.querySelector("#user");
if (token) {
  logout.style.display = "block";
  login.style.display = "none";
  user.style.display = "block";
  signup.style.display = "none";
} else {
  login.style.display = "block";
  signup.style.display = "block";
  logout.style.display = "none";
  user.style.display = "none";
}
ProfileLogOut();
