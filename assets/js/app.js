window.onload = function() {    
    const nt_input = document.querySelector("#new-task");
    
    nt_input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            add_task(nt_input);
        }
    });

    nt_input.addEventListener("focusout", (e) => {
        add_task(nt_input);
    });

    document.addEventListener("click", (e) => {
        let tg = e.target;
        
        if (tg.classList.contains("remove-all")) {
            delete_all_tasks();
        }
    });
}

const tasks_counter = (action = true) => {
    let elmnt = document.querySelector("#task-counter #count");
    let count = elmnt.getAttribute("data-counter");

    if (action) { count++; } else { count--; }

    elmnt.setAttribute("data-counter", count);
    elmnt.innerHTML = (count === 1) ? count + " item" : count + " items";

    fadeIn(elmnt);

    document.querySelector(".remove-all").style.display = (count > 0) ? "block" : "none";

    return false;
}

const reset_tasks_counter = () => {
    let elmnt = document.querySelector("#task-counter #count");
    elmnt.setAttribute("data-counter", 0);
    elmnt.innerHTML = "0 items";

    fadeIn(elmnt);

    document.querySelector(".remove-all").style.display = "none";
}

const add_task = (element) => {
    let val = element.value;

    if (val.trim().length === 0) { return false; } 

    let li = document.createElement("li");
    li.classList.add("list-group-item", "ps-5", "d-flex", "align-items-center", "justify-content-between");

    /**
     * Uso stopPropagation() para forzar la captura del evento click sólo en <a> y no en <svg> o <path>
     * https://developer.mozilla.org/es/docs/Web/API/Event/stopPropagation
     */
    let li_content = `${val}
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
    document.querySelector("#task-list").appendChild(li);

    element.value = "";
    element.focus();
    tasks_counter();
}

const pin_task = (element) => {
    let ul = document.querySelector("#task-list");
    let class_name = "pinned";
    let pin_task_ct = element.querySelector(".pin-task")
    
    if (element.classList.contains(class_name)) {
        element.classList.remove(class_name);
        pin_task_ct.classList.remove("order-last");

        ul.append(element);
        
        return false;
    }

    element.classList.add(class_name);
    pin_task_ct.classList.add("order-last");
    ul.prepend(element);
}

const delete_task = (element) => {
    fadeOut(element);
    tasks_counter(false);

    setTimeout(() => {
        element.remove();
    }, 220);
}

const delete_all_tasks = () => {
    document.querySelector("#task-list").innerHTML = "";
    reset_tasks_counter();
}

/**
 * Fade animations: 
 * Source: https://dev.to/bmsvieira/vanilla-js-fadein-out-2a6o
 */
const fadeIn = (el) => {
    el.style.opacity = 0;
    el.style.display = "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

const fadeOut = (el) => {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};