
let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasksContainer = document.querySelector(".tasks");
let dataArr = [];


if (localStorage.getItem("savedTasks")) {
	dataArr = JSON.parse(localStorage.getItem("savedTasks"));
	renderExistingTasks(dataArr)
}

function renderExistingTasks(tasks) {
	tasks.forEach(task => {
		createTaskElement(task.Title ,task.id, task.Completed)
	});
}

function addDataToLocalStorageFrom(dataArr){
	window.localStorage.setItem("savedTasks", JSON.stringify(dataArr))
}

function createTaskElement (val , id, isCompleted = false) {
	let checkBox = document.createElement("input")
	checkBox.type = "checkbox";
	checkBox.classList.add("task-check");
	checkBox.checked = isCompleted

	let rSideHandler = document.createElement("div")
	rSideHandler.classList.add("r-side-handler")

	let deleteBtn = document.createElement("button");
	deleteBtn.textContent = "Delete";

	let tasksContent = document.createElement("div");
	tasksContent.setAttribute("data-id", id)
	tasksContent.innerHTML = `<h5 class ="theTask">${val}</h5>`;

	if (isCompleted) {
		tasksContent.querySelector(".theTask").style.textDecoration = "line-through"
    tasksContent.style.opacity = ".5";
	}

	rSideHandler.appendChild(deleteBtn)
	rSideHandler.appendChild(checkBox)

	tasksContent.appendChild(rSideHandler)
	tasksContainer.appendChild(tasksContent);

	deleteBtn.onclick = function() {
		tasksContent.remove()
		dataArr = dataArr.filter((task) => task.id !== id);
		addDataToLocalStorageFrom(dataArr)
	}
	checkBox.onchange = function () {
		dataArr.forEach((task) => {
			if (task.id === id) {
				task.Completed = checkBox.checked
			}
			addDataToLocalStorageFrom(dataArr);

			if (checkBox.checked) {
				tasksContent.querySelector(".theTask").style.textDecoration = "line-through"
        tasksContent.style.opacity = ".5";
			}else {
        tasksContent.querySelector(".theTask").style.textDecoration = "none";
        tasksContent.style.opacity = "1";
    }
		})
	}
}

let addTask = function () {
  if (input.value !== "") {
		const task = {
			id: Date.now(), Title: input.value, Completed: false
		}

		dataArr.push(task)

		createTaskElement(task.Title ,task.id)

		addDataToLocalStorageFrom(dataArr)

		input.value = "";
  }
};

add.addEventListener("click", addTask);
