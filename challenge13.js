let newTask = "";
let input = document.querySelector(".input");
if (!JSON.parse(window.localStorage.getItem("tasks")))
  window.localStorage.setItem("tasks", JSON.stringify([]));
input.addEventListener("input", function (e) {
  newTask = e.target.value;
});
// Click On Add Task Button
let add = document.querySelector(".add");
add.addEventListener("click", (e) => {
  if (newTask === "") e.preventDefault();
  else {
    let storedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    storedTasks.push({
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    });
    window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
    createTask(newTask, Date.now().toString());
    newTask = "";
    input.value = "";
  }
});
// To Create The Element
function createTask(taskText, idNumber, status) {
  let task = document.createElement("div");
  if (status) {
    task.classList.add("completed");
  }
  let p = document.createElement("p");
  let title = document.createTextNode(taskText);
  p.appendChild(title);
  task.appendChild(p);
  let btn = document.createElement("span");
  let btnText = document.createTextNode("Delete");
  btn.appendChild(btnText);
  task.appendChild(btn);
  let id = document.createAttribute("id-text");
  task.setAttributeNode(id);
  task.setAttribute("id-text", idNumber);
  document.querySelector(".tasks").appendChild(task);
}
function update() {
  if (JSON.parse(window.localStorage.getItem("tasks")).length > 0) {
    for (
      let i = 0;
      i < JSON.parse(window.localStorage.getItem("tasks")).length;
      i++
    ) {
      createTask(
        JSON.parse(window.localStorage.getItem("tasks"))[i].title,
        JSON.parse(window.localStorage.getItem("tasks"))[i].id,
        JSON.parse(window.localStorage.getItem("tasks"))[i].completed
      );
    }
  }
}
onload = () => update();

// To Delete Item
document.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN" && e.target.textContent === "Delete") {
    if (e.target.parentElement.hasAttribute("id-text")) {
      let atrr = e.target.parentElement.getAttribute("id-text");
      console.log(atrr);
      e.target.parentElement.remove();
      let myTasks = JSON.parse(window.localStorage.getItem("tasks"));
      let myNewTasks = myTasks.filter((a) => a.id !== atrr);
      window.localStorage.setItem("tasks", JSON.stringify(myNewTasks));
    }
  }
});
// To Completed Tasks
document.querySelector(".tasks").addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") {
    e.target.classList.toggle("completed");
    if (e.target.classList.contains("completed")) {
      let Data = JSON.parse(window.localStorage.getItem("tasks"));
      let updatedData = Data.map((a) => {
        if (+a.id === +e.target.getAttribute("id-text")) {
          a.completed = true;
        }
        return a;
      });
      window.localStorage.setItem("tasks", JSON.stringify(updatedData));
    } else {
      let Data = JSON.parse(window.localStorage.getItem("tasks"));
      let updatedData = Data.map((a) => {
        if (+a.id === +e.target.getAttribute("id-text")) {
          a.completed = false;
        }
        return a;
      });
      window.localStorage.setItem("tasks", JSON.stringify(updatedData));
    }
  }
});
