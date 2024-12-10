document.addEventListener("DOMContentLoaded", () => {
  const wishes = document.querySelectorAll(".wish");

  wishes.forEach((wish) => {
    wish.addEventListener("click", () => {
      if (!wish.classList.contains("chosen")) {
        wish.classList.add("chosen");
      }

      // Extract data for wishlist
      const wishData = {
        heading: wish.querySelector(".wish-thing").textContent,
        description: wish.querySelector(".wish-description").textContent,
      };
    });
  });
});
