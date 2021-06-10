class Task {
    constructor(title, description, dueDate, priority, project = "default") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

// Tasks Form Information
const TASKS_FORM = document.forms['tasks-form'];

// prevent form default behaviour
TASKS_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
});

// Task Creation Module (IIFE);
export const taskCreation = (() => {
    // create task and display it on the UI
    const createNewTask = (tasksArr) => {
        const TASK_BTN = document.querySelector("#task-btn");
        TASK_BTN.addEventListener('click', () => {
            const TASK_NAME = TASKS_FORM.querySelector("#task-name").value;
            const TASK_DESCRIPTION = TASKS_FORM.querySelector("#task-description").value;
            const TASK_DATE = TASKS_FORM.querySelector("#task-date").value;
            const TASK_PRIORITY = TASKS_FORM.querySelector("#task-priority").value;
            const TASK_PROJECT = TASKS_FORM.querySelector("#task-project").value;

            // create new task instance
            newTask(tasksArr, TASK_NAME, TASK_DESCRIPTION, TASK_DATE, TASK_PRIORITY, TASK_PROJECT);

            // render task to the UI
            renderTask(TASK_PROJECT, tasksArr);

            document.querySelector('#tasks-form').reset();
        })
    }

    // create task object
    const newTask = (tasksArr, name, description, date, priority, project) => {
        const newTask = new Task(name, description, date, priority, project);
        tasksArr.push(newTask);
    }

    // render tasks in the UI
    const renderTask = (taskProject, tasksArr) => {
        const TASKS_LIST = document.querySelector("#tasks-list");

        TASKS_LIST.innerHTML = ``;
        let projectTasks = tasksArr.filter(task => task.project === taskProject);

        for (let i = 0; i < projectTasks.length; i++) {
            TASKS_LIST.innerHTML += `
          <li class="list-group-item list-group-item-dark">${projectTasks[i].title}</li>
        `;
        }
    }

    return {
        createNewTask
    }
})();

export default { taskCreation };