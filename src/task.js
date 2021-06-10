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
            let color = getColor(projectTasks, i);

            TASKS_LIST.innerHTML += `
              <li class="">
                  <p>
                    <button class="btn btn-${color} w-100" type="button" data-bs-toggle="collapse" data-bs-target="#task-${i}" aria-expanded="false" aria-controls="task-${i}">
                      ${projectTasks[i].title}
                    </button>
                  </p>
                    
                  <div class="collapse" id="task-${i}">
                    <div class="card card-body bg-${color} mb-4">
                      <ul class="list-group ">
                          <li class="list-group-item bg-${color} text-white"><span class="fw-bold">Description</span>: ${projectTasks[i].description}</li>
                          <li class="list-group-item bg-${color} text-white"><span class="fw-bold">Due Date</span>: ${projectTasks[i].dueDate}</li>
                          <li class="list-group-item bg-${color} text-white"><span class="fw-bold">Priority</span>: ${projectTasks[i].priority}</li>
                      </ul>
                    </div>
                  </div>
              </li>
            `;
        }
    }

    const getColor = (arr, i) => {
        let color;
        if (arr[i].priority === 'low') {
            color = 'success';
        } else if (arr[i].priority === 'medium') {
            color = 'info';
        } else {
            color = 'danger';
        }
        return color;
    }

    return {
        createNewTask
    }
})();

export default { taskCreation };