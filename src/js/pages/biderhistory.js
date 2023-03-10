const base_Url = `https://nf-api.onrender.com/`;
const listing_Url = `api/v1/auction/listings`;

const profile = document.querySelector(".profile-info");
const history = document.querySelector("#history");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const userName = localStorage.getItem("user");

const bidForm = document.querySelector(".bidForm");

async function biderHistory() {
  const token = localStorage.getItem("Token");
  try {
    const Data = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${base_Url}${listing_Url}/${id}/?_seller=true&_bids=true`,
      Data
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const results = await response.json();
    const json = results.bids;
    // fetching the data bid history
    json.forEach((element) => {
      const history = document.querySelector("#history");
      const list = document.createElement("li");
      list.classList.add("list-group-item", "list_class");
      list.innerText = element.bidderName;
      const spa_Ner = document.createElement("span");
      spa_Ner.classList.add("ms-3");
      spa_Ner.innerText = element.amount;
      history.appendChild(list);
      list.appendChild(spa_Ner);
    });

    // thumbnail for profile
    const img = document.querySelector(".sellerPicture");
    img.src = results.seller.avatar;
    const profileName = document.querySelector("#profileName");
    profileName.innerHTML = results.seller.name;
    const profileEmail = document.querySelector("#emailName");
    profileEmail.innerHTML = results.seller.email;

    //------------------------------------------------------------
  } catch (error) {
    console.log(error);
  }
}

biderHistory();
