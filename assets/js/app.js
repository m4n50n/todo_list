const task_input = document.querySelector("#new-task");
const task_list = document.querySelector("#task-list");
const task_counter = document.querySelector("#task-counter #count");

task_input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        add_task(task_input);
    }
});

const add_task = (task_input) => {
    let val = task_input.value.trim();

    if (val.length === 0) { return false; } 

    render_task(val);
    update_task_counter();
    
    task_input.value = "";
    task_input.focus();
}

const render_task = (task) => {
    let li = document.createElement("li");
    li.classList.add("list-group-item", "ps-5", "d-flex", "align-items-center", "justify-content-between");

    /**
     * Uso stopPropagation() para forzar la captura del evento click sólo en <a> y no en <svg> o <path>
     * https://developer.mozilla.org/es/docs/Web/API/Event/stopPropagation
     */
    let li_content = `${task}
    <div class="d-flex justify-content-end align-items-center">
        <a title="Pin task" href="#" onclick="event.stopPropagation(); pin_task(this.closest(\'li\'));" class="pin-task d-lg-none px-2">    
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
                <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z" />
            </svg>
        </a> 

        <a title="Delete Task" href="#" onclick="event.stopPropagation(); delete_task(this.closest(\'li\'));" class="delete-task d-lg-none px-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </a>
    </div>`;

    li.innerHTML = li_content;
    task_list.appendChild(li);
}

const delete_task = (element) => {
    element.remove();
    update_task_counter();
}

const delete_all_tasks = () => {
    task_list.innerHTML = "";
    update_task_counter();
}

const update_task_counter = () => {
    let counter = task_list.getElementsByTagName("li").length;
    
    task_counter.innerHTML = counter + ((counter === 1) ? " item" : " items");
    document.querySelector(".remove-all").style.display = (counter > 0) ? "block" : "none";
}

const pin_task = (element) => {
    let class_name = "pinned";
    let pin_task_ct = element.querySelector(".pin-task")
    
    if (element.classList.contains(class_name)) { // the element is pinned
        element.classList.remove(class_name);
        pin_task_ct.classList.remove("order-last");

        task_list.append(element);
    }
    else {
        element.classList.add(class_name);
        pin_task_ct.classList.add("order-last");
        task_list.prepend(element);
    }
}
