let AddedTasks = [];
const TasksList = document.querySelector("#task-list");
const TaskInput = document.querySelector("#new-task");
const TaskCounter = document.querySelector("#task-counter #count");

TaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        AddTask();
    }
});

const DeleteAllTasks = () => {
    AddedTasks = [];
    RenderApp();
}

const DeleteTask = (index) => {
    AddedTasks.splice(index, 1);
    RenderApp();
}

const UpdateTaskCounter = () => {
    let Counter = AddedTasks.length;
    
    TaskCounter.innerHTML = Counter + ((Counter === 1) ? " item" : " items");
    document.querySelector(".remove-all").style.display = (Counter > 0) ? "block" : "none";
}

const AddTask = () => {
    let InsertedTask = TaskInput.value.trim();
    if (InsertedTask.length === 0) { return false; } 

    AddedTasks.push(InsertedTask);
    RenderApp();
}

const RestartInput = () => {
    TaskInput.value = "";
    TaskInput.focus();
}

const RenderTask = (task, index) => {
    let li = document.createElement("li");
    li.classList.add("list-group-item", "ps-5", "d-flex", "align-items-center", "justify-content-between");

    /**
     * Uso stopPropagation() para forzar la captura del evento click sólo en <a> y no en <svg> o <path>
     * https://developer.mozilla.org/es/docs/Web/API/Event/stopPropagation
     */
    let LiContent = `${task}
    <div class="d-flex justify-content-end align-items-center">
        <a title="Delete Task" href="#" onclick="event.stopPropagation(); DeleteTask(${index});" class="delete-task d-lg-none px-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </a>
    </div>`;

    li.innerHTML = LiContent;
    TasksList.appendChild(li);
}

const RenderApp = () => {
    TasksList.innerHTML = "";

    AddedTasks.forEach((task, index) => {
        RenderTask(task, index);
    });

    UpdateTaskCounter();
    RestartInput();
}

window.onload = RenderApp();