import { save } from "../storage/localStorage.js";
export const loginUrl = "https://nf-api.onrender.com/api/v1/auction/auth/login";
const method = "post";

export async function login(url, data) {
  try {
    const postData = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(loginUrl, postData);

    const results = await response.json();

    const accessToken = results.accessToken;
    localStorage.setItem("Token", accessToken);
    const user = results.name;
    localStorage.setItem("userName", user);
    const credit = results.credits;
    localStorage.setItem("credits", credit);

    save("user", {
      name: results.name,
      email: results.email,
      avatar: results.avatar,
      credits: results.credits,
    });

    if (response.ok) {
      window.location.replace("/profile.html");
    }
  } catch (error) {
    console.log(error);
  }
}
