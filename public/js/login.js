const form = document.querySelector("form");
const emailError = document.querySelector(".email.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //reset error messages
  emailError.textContent = "";
  passwordError.textContent = "";

  //get values from form
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch("/login ", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    //validation
    if (data.email || data.password) {
      emailError.textContent = data.email;
      passwordError.textContent = data.password;
    }

    //redirect after login
    if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.error(err);
  }
});
