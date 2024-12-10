const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#user-input");
const listContainer = document.querySelector("#list-container");
const showCompleted = document.querySelector("#show-completed");
const sortBy = document.querySelector("#sort-by");

let tasks = [];

// Load data from localStorage
showCompleted.checked = localStorage.getItem("showCompleted") === "true";
sortBy.value = localStorage.getItem("sortBy");
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderList(tasks);
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); //hindre refresh
  const formData = new FormData(taskForm); //lagre form data
  //trigger error if task is empty
  if (!formData.get("user-input")) {
    showError("you can't submit an empty task");
    return;
  }
  //lager nytt task object og pusher til tasks variabel.
  tasks.push({
    timeStamp: new Date().toLocaleString("en-Uk"),
    Description: formData.get("user-input"),
    completed: false,
  }); // lager nytt task object og pusher til tasks variabel.
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
  window.addEventListener("click", () => {
    modal.close();
    window.removeEventListener("click", arguments.callee);
  });
}

showCompleted.addEventListener("change", () => {
  renderList(tasks);
});
sortBy.addEventListener("change", () => {
  renderList(tasks);
});

function renderList(taskArr) {
  // clear local storage if task array is empty
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
    .filter((e) => (!showCompleted.checked ? !e.completed : e))
    .sort((a, b) => {
      if (sortBy.value === "time-asc") {
        return new Date(a.timeStamp) - new Date(b.timeStamp);
      } else if (sortBy.value === "time-desc") {
        return new Date(b.timeStamp) - new Date(a.timeStamp);
      } else if (sortBy.value === "alpha-asc") {
        return b.description.localeCompare(a.description);
      } else if (sortBy.value === "alpha-desc") {
        return a.description.localeCompare(b.description);
      }
    });
}

function buildList(taskArr) {
  //Empty list
  while (listContainer.firstChild) {
    listContainer.firstChild.remove();
  }
  taskArr.forEach((task, i) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    //make the timestamp
    const timeStampElem = document.createElement("p");
    timeStampElem.classList.add("timestamp");
    timeStampElem.textContent = task.timeStamp;
    //make the task description
    const descriptionElem = document.createElement("input");
    descriptionElem.classList.add("description");
    descriptionElem.value = task.description;
    descriptionElem.readOnly = true;
    //add task-completed checkbox
    const completedElem = document.createElement("input");
    completedElem.type = "checkbox";
    completedElem.checked = task.completed;
    if (task.completed) {
      taskContainer.classList.add("completed");
    }
    //update the tasks array and add/remove the completed CSS class
    completedElem.addEventListener("change", () => {
      tasks[i].completed = completedElem.checked;
      saveStateToLocalStorage();
      if (task.completed) {
        taskContainer.classList.add("completed");
      } else {
        taskContainer.classList.remove("completed");
      }
    });
    //add edit-button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      tasks[i].description = descriptionElem.value;
      descriptionElem.readOnly = !descriptionElem.readOnly;
      editButton.textContent = descriptionElem.readOnly ? "Edit" : "Save";
      if (!descriptionElem.readOnly) descriptionElem.focus();
      saveStateToLocalStorage();
    });
    //add delete-button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    //appends
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
  // serialize tasks array to JSON before storing to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // Store boolean value of showCompleted checkbox
  localStorage.setItem("showCompleted", showCompleted.checked);
  // Store the value of the sort by select element
  localStorage.setItem("sortBy", sortBy.value);
}
