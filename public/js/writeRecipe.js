const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //get values from form
  const title = form.title.value;
  const image = form.image.value;
  const content = form.content.value;

  try {
    const res = await fetch("/write-recipe ", {
      method: "POST",
      body: JSON.stringify({ title, image, content }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.recipe) {
      location.assign("/recipes");
    }
  } catch (err) {
    console.error(err);
  }
});
