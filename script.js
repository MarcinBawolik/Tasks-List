{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }

        ];
        render();
    }
    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    }
    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const markDoneAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };
    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });

        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });

        });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""} ">
            <button class="button__done js-done">
                ${task.done ? "✔️" : ""}
            </button>
            <span class="tasks__hide ${task.done ? " tasks__item--done" : ""}">
                 ${task.content}
            </span>
            <button class="button__remove js-remove">
                🗑️
            </button>
        </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class="section__header--buttons js-toggleDoneTasksButton">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="section__header--buttons js-doneAllTasksButton"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}
             >
        
                Ukończ wszystkie
            </button>
            `;

    };
    const toggleDoneTasks = () => {
        const toggleDoneTasksButton = document.querySelector(".js-toggleDoneTasksButton");

        if (toggleDoneTasksButton) {
            toggleDoneTasksButton.addEventListener("click", toggleHideDoneTasks)
        }
    }
    const doneAllTasks = () => {
        const doneAllTasksButton = document.querySelector(".js-doneAllTasksButton");

        if (doneAllTasksButton) {
            doneAllTasksButton.addEventListener("click", markDoneAllTasks)
        }

    }

    const render = () => {

        renderTasks();
        renderButtons();

        bindEvents();
        doneAllTasks();
        toggleDoneTasks();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };
        newTaskElement.focus();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}