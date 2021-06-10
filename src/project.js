class Project {
    constructor(title) {
        this.title = title;
    }
}

// Project Form Information
const PROJECT_FORM = document.forms['project-form'];

// prevent form default behaviour
PROJECT_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
})

// Project Creation Module (IIFE);
export const projectCreation = (() => {

    // Create and display project in the UI
    const addProject = (projectArr) => {
        const PROJECT_BTN = document.querySelector('#project-btn');

        PROJECT_BTN.addEventListener('click', () => {
            // create new project
            createProject(projectArr);

            // Render projects in views
            renderProjectView(projectArr);

            // reset project form
            document.querySelector('#project-form').reset();
        })
    };

    // Project Helper methods
    const createProject = (projectArr) => {
        const PROJECT_TITLE = PROJECT_FORM.querySelector("#project-title").value;

        const NEW_PROJECT = new Project(PROJECT_TITLE);
        projectArr.push(NEW_PROJECT);
    }
    const renderProjectView = (projectArr) => {
        const PROJECT_LIST = document.querySelector("#project-list");
        PROJECT_LIST.innerHTML = `
          <li class="list-group-item list-group-item-dark btn my-1" id="project-list">All Projects</li>
        `;

        for (let i = 0; i < projectArr.length; i++) {
            PROJECT_LIST.innerHTML += `
        <li class="list-group-item list-group-item-dark btn my-1" id="project-list">${projectArr[i].title}</li>
      `;
        }
    }

    // Display the project's specific tasks in the UI
    const displayProjectTasks = (tasksArr) => {
        const PROJECT_LIST = document.querySelector('#project-list');

        PROJECT_LIST.addEventListener('click', (e) => {
            const PROJECT_NAME = e.target.textContent;

            projectSelection(e, PROJECT_LIST);

            taskOptions(PROJECT_NAME);

            renderTasks(PROJECT_NAME, tasksArr);
        });
    }

    // Project's tasks Helper Method
    const taskOptions = (projectName) => {
        // Create selection on tasks based on objects
        const TASK_PROJECT = document.querySelector('#project');
        TASK_PROJECT.innerHTML = ``;
        TASK_PROJECT.innerHTML += `
        <input type="hidden" value="${projectName}" id="task-project" class="form-control" aria-label="Default select example">
    `;
    }
    const projectSelection = (event, projectList) => {
        const  PROJECT = event.target;

        let children = [...projectList.children];
        children.forEach(function(project){
            project.classList.remove('active');
        });

        PROJECT.classList.add('active');
        const TASK_DISPLAY = document.querySelector('#task-display');
        TASK_DISPLAY.classList.remove('d-none');
    }
    const renderTasks = (projectName, tasksArr) => {
        const TASK_LIST = document.querySelector("#tasks-list");
        TASK_LIST.innerHTML = ``;
        const ADD_TASK_BTN = document.querySelector('#add-task');
        const FORM = document.querySelector('#multiCollapseExample2');

        if (projectName === "All Projects") {
            ADD_TASK_BTN.classList.add('d-none');
            FORM.classList.add('d-none');
            for (let i = 0; i < tasksArr.length; i++) {
                let color = getColor(tasksArr, i);

                TASK_LIST.innerHTML += `
                  <li class="">
                      <p>
                        <button class="btn btn-${color} w-100" type="button" data-bs-toggle="collapse" data-bs-target="#task-${i}" aria-expanded="false" aria-controls="task-${i}">
                          ${tasksArr[i].title}
                        </button>
                      </p>
                        
                      <div class="collapse" id="task-${i}">
                        <div class="card card-body bg-${color} mb-4">
                          <ul class="list-group">
                              <li class="list-group-item bg-${color} text-white"><span class="fw-bold">Description</span>: ${tasksArr[i].description}</li>
                              <li class="list-group-item bg-${color} text-white"><span class="fw-bold">Due Date</span>: ${tasksArr[i].dueDate}</li>
                              <li class="list-group-item bg-${color} text-white"><span class="fw-bold">Priority</span>: ${tasksArr[i].priority}</li>
                          </ul>
                        </div>
                      </div>
                  </li>
            `;
            }
        } else {
            ADD_TASK_BTN.classList.remove('d-none');
            FORM.classList.remove('d-none');
            let projectTasks = tasksArr.filter(task => task.project === projectName);
            for (let i = 0; i < projectTasks.length; i++) {
                let color = getColor(projectTasks, i);

                TASK_LIST.innerHTML += `
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
        addProject, displayProjectTasks
    }
})();

export default { projectCreation };