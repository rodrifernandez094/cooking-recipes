const form = document.querySelector("form");
const emailError = document.querySelector(".email.error");
const passwordError = document.querySelector(".password.error");
const UserNameError = document.querySelector(".userName.error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //reset error messages
  emailError.textContent = "";
  passwordError.textContent = "";

  //get values from form
  const userName = form.userName.value;
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.email || data.password || data.userName) {
      emailError.textContent = data.email;
      passwordError.textContent = data.password;
      UserNameError.textContent = data.userName;
    }

    if (data.user) {
      location.assign("/verification");
    }
  } catch (err) {
    console.error(err);
  }
});
