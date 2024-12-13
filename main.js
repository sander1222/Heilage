// JavaScript without 'Show Completed Wishes' and 'Sort by' functionality
const wishForm = document.querySelector("#wish-form");
const wishInput = document.querySelector("#user-input");
const listContainer = document.querySelector("#list-container");

let wishes = [];

// Load data from localStorage
const storedWishes = localStorage.getItem("wishes");
if (storedWishes) {
  wishes = JSON.parse(storedWishes);
  renderList(wishes);
}

wishForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(wishForm);
  if (!formData.get("user-input")) {
    showError("You can't submit an empty wish");
    return;
  }
  wishes.push({
    timeStamp: new Date().toLocaleString("en-UK"),
    description: formData.get("user-input"),
    completed: false,
  });
  wishInput.value = ""; // Clear input after submission
  renderList(wishes);
});

function showError(message) {
  const modal = document.createElement("dialog");
  const errorMsg = document.createElement("p");
  errorMsg.textContent = message;
  const closeModal = document.createElement("button");
  closeModal.textContent = "Got it";
  modal.append(errorMsg, closeModal);
  document.body.append(modal);
  modal.showModal();
  closeModal.addEventListener("click", () => modal.close());
}

function renderList(wishArr) {
  if (wishArr.length === 0) {
    localStorage.removeItem("wishes");
  }
  buildList(wishArr);
  saveStateToLocalStorage();
}

function buildList(wishArr) {
  while (listContainer.firstChild) {
    listContainer.firstChild.remove();
  }

  if (wishArr.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No wishes to display.";
    listContainer.append(emptyMessage);
    return;
  }

  wishArr.forEach((wish, i) => {
    const wishContainer = document.createElement("div");
    wishContainer.classList.add("wish-container");

    const timeStampElem = document.createElement("p");
    timeStampElem.classList.add("timestamp");
    timeStampElem.textContent = wish.timeStamp;

    const descriptionElem = document.createElement("input");
    descriptionElem.classList.add("description");
    descriptionElem.value = wish.description;
    descriptionElem.readOnly = true;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      descriptionElem.readOnly = !descriptionElem.readOnly;
      editButton.textContent = descriptionElem.readOnly ? "Edit" : "Save";
      wishes[i].description = descriptionElem.value;
      saveStateToLocalStorage();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      wishes.splice(i, 1);
      renderList(wishes);
    });

    wishContainer.append(
      timeStampElem,
      descriptionElem,
      editButton,
      deleteButton
    );
    listContainer.append(wishContainer);
  });
}

function saveStateToLocalStorage() {
  localStorage.setItem("wishes", JSON.stringify(wishes));
}

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

document
  .getElementById("creditCardForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Simple validation for demonstration
    const cardNumber = document.getElementById("cardNumber").value;
    const cardNumberError = document.getElementById("cardNumberError");

    if (!/^[0-9]{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
      cardNumberError.textContent =
        "Please enter a valid 16-digit card number.";
      return;
    } else {
      cardNumberError.textContent = "";
    }

    alert("Form submitted successfully!");
    // Further processing can go here
  });
function playAudio() {
  const audio = new Audio("audio/cancer.mp3");
  audio.play();
  document.removeEventListener("click", playAudio);
}
document.addEventListener("click", playAudio);
