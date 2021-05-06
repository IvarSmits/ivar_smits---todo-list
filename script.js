var allTasks = [];
const addTaskButton = document.querySelector(".js-add-task-btn");
const taskList = document.querySelector(".task-list");

const renderAllTasks = async (taskArr) => {
  if (!taskArr) {
    taskArr = await getAllTasks();
  }
  taskList.innerHTML = "";
  taskArr.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `${task.description} 	&#128465;`;
    li.setAttribute("data-id", task._id ? task._id : null);
    li.setAttribute("id", "task");
    taskList.append(li);
  });
};

const createTask = async () => {
  const taskInput = document.querySelector("#add-task");
  const description = taskInput.value;
  allTasks.push({
    description: description,
    done: false,
  });

  taskInput.value = "";

  //Render tasks without id, so we are not waiting for the server to respond.
  // Not sure if this is the most elegant or effective way
  renderAllTasks(allTasks);
  const task = await postTask(description);
  //Append ID to global list
  allTasks[allTasks.length - 1]._id = task._id;

  //Rerender with id's
  renderAllTasks();
};

const removeTask = async (event) => {
  let task = event.target;
  let id = task.getAttribute("data-id");
  task.remove();
  await deleteTask(id);
};

const addEventListeners = () => {
  document.addEventListener("click", (event) => {
    if (event.target && event.target.id == "task") {
      removeTask(event);
    }
  });

  addTaskButton.addEventListener("click", createTask);
};

renderAllTasks();
addEventListeners();
