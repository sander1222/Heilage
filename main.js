const wishForm = document.querySelector("#wish-form");
const wishInput = document.querySelector("#user-input");
const listContainer = document.querySelector("#list-container");
const showCompleted = document.querySelector("#show-completed");
const sortBy = document.querySelector("#sort-by");

let wishes = [];

// Load data from localStorage
showCompleted.checked = localStorage.getItem("showCompleted") === "true";
sortBy.value = localStorage.getItem("sortBy") || "time-asc"; // Default to "time-asc"
const storedWishes = localStorage.getItem("wishes");
if (storedwishes) {
  wishes = JSON.parse(storedwishes);
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

showCompleted.addEventListener("change", () => renderList(wishes));
sortBy.addEventListener("change", () => renderList(wishes));

function renderList(wishArr) {
  if (wishArr.length === 0) {
    localStorage.removeItem("wishes");
    localStorage.removeItem("showCompleted");
    localStorage.removeItem("sortBy");
  }
  buildList(filterAndSort(wishArr));
  saveStateToLocalStorage();
}

function filterAndSort(arr) {
  return arr
    .filter((e) => (!showCompleted.checked ? !e.completed : true))
    .sort((a, b) => {
      if (sortBy.value === "time-asc") {
        return new Date(a.timeStamp) - new Date(b.timeStamp);
      } else if (sortBy.value === "time-desc") {
        return new Date(b.timeStamp) - new Date(a.timeStamp);
      } else if (sortBy.value === "alpha-asc") {
        return a.description.localeCompare(b.description);
      } else if (sortBy.value === "alpha-desc") {
        return b.description.localeCompare(a.description);
      }
    });
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

    const completedElem = document.createElement("input");
    completedElem.type = "checkbox";
    completedElem.checked = wish.completed;
    completedElem.addEventListener("change", () => {
      wishes[i].completed = completedElem.checked;
      renderList(wishes);
    });

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
      completedElem,
      editButton,
      deleteButton
    );
    listContainer.append(wishContainer);
  });
}

function saveStateToLocalStorage() {
  localStorage.setItem("wishes", JSON.stringify(wishes));
  localStorage.setItem("showCompleted", showCompleted.checked);
  localStorage.setItem("sortBy", sortBy.value);
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
