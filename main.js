const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#userInput");
const listContainer = document.querySelector("#listContainer");
const showCompleted = document.querySelector("#show-comleted");
const sortBy = document.querySelector("#sort-by");

let tasks = [];

// Load data from local storage
showCompleted.checked = localStorage.getItem("showCompleted") === "true";
sortBy.value = localStorage.getItem("sortBy") || "time-asc";
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderList(tasks);
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  tasks.push({
    timeStamp: new Date().toLocaleString("en-UK"),
    description: formData.get("userInput"),
    completed: false,
  });
  renderList(tasks);
});
showCompleted.addEventListener("change", () => {
  renderList(tasks);
});

sortBy.addEventListener("change", () => {
  renderList(tasks);
});

function renderList(taskArr) {
  if (taskArr.length === 0) {
    localStorage.removeItem("tasks");
  } else {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  }
  buildList(filterAndSort(taskArr));
  saveStateToLocalStorage();
}

function filterAndSort(arr) {
  return arr
    .filter((e) => (!showCompleted.checked ? !e.completed : e))
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
  taskArr.forEach((task, i) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");

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
    if (task.completed) {
      taskContainer.classList.add("completed");
    }
    completedElem.addEventListener("change", () => {
      tasks[i].completed = completedElem.checked;
      saveStateToLocalStorage();
      if (tasks[i].completed) {
        taskContainer.classList.add("completed");
      } else {
        taskContainer.classList.remove("completed");
      }
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      tasks[i].description = descriptionElem.value;
      saveStateToLocalStorage();
      descriptionElem.readOnly = !descriptionElem.readOnly;
      editButton.textContent = descriptionElem.readOnly ? "Edit" : "Save";
      if (!descriptionElem.readOnly) descriptionElem.focus();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      tasks.splice(i, 1);
      saveStateToLocalStorage();
      renderList(tasks);
    });

    taskContainer.append(
      timeStampElem,
      descriptionElem,
      completedElem,
      editButton,
      deleteButton
    );
    listContainer.prepend(taskContainer);
  });
}

function saveStateToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("showCompleted", showCompleted.checked);
  localStorage.setItem("sortBy", sortBy.value);
}