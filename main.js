const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#user-input");
const listContainer = document.querySelector("#list-container");
const showCompleted = document.querySelector("#show-completed");
const sortBy = document.querySelector("#sort-by");

let tasks = [];

// Load data from localStorage
showCompleted.checked = localStorage.getItem("showCompleted") === "true";
sortBy.value = localStorage.getItem("sortBy") || "time-asc"; // Default to "time-asc"
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderList(tasks);
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  if (!formData.get("user-input")) {
    showError("You can't submit an empty task");
    return;
  }
  tasks.push({
    timeStamp: new Date().toLocaleString("en-UK"),
    description: formData.get("user-input"),
    completed: false,
  });
  taskInput.value = ""; // Clear input after submission
  renderList(tasks);
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

showCompleted.addEventListener("change", () => renderList(tasks));
sortBy.addEventListener("change", () => renderList(tasks));

function renderList(taskArr) {
  if (taskArr.length === 0) {
    localStorage.removeItem("tasks");
    localStorage.removeItem("showCompleted");
    localStorage.removeItem("sortBy");
  }
  buildList(filterAndSort(taskArr));
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

function buildList(taskArr) {
  while (listContainer.firstChild) {
    listContainer.firstChild.remove();
  }

  if (taskArr.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks to display.";
    listContainer.append(emptyMessage);
    return;
  }

  taskArr.forEach((task, i) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const timeStampElem = document.createElement("p");
    timeStampElem.classList.add("timestamp");
    timeStampElem.textContent = task.timeStamp;

    const descriptionElem = document.createElement("input");
    descriptionElem.classList.add("description");
    descriptionElem.value = task.description;
    descriptionElem.readOnly = true;

    const completedElem = document.createElement("input");
    completedElem.type = "checkbox";
    completedElem.checked = task.completed;
    completedElem.addEventListener("change", () => {
      tasks[i].completed = completedElem.checked;
      renderList(tasks);
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      descriptionElem.readOnly = !descriptionElem.readOnly;
      editButton.textContent = descriptionElem.readOnly ? "Edit" : "Save";
      tasks[i].description = descriptionElem.value;
      saveStateToLocalStorage();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      tasks.splice(i, 1);
      renderList(tasks);
    });

    taskContainer.append(
      timeStampElem,
      descriptionElem,
      completedElem,
      editButton,
      deleteButton
    );
    listContainer.append(taskContainer);
  });
}

function saveStateToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
