import "./styles.css";
import {
  createDialog,
  createProjectDialog,
  createToDoDialog,
} from "./dialogs.js";
import { projectListArr } from "./state.js";
import { addTodo } from "./todoController.js";
import {
  addProjectToProjectListDOM,
  setUpdateAndDeleteButtonsVisibility,
} from "./domUtils.js";

const projectListDOM = document.querySelector(".project-list");
const addProjectButton = document.querySelector(".add-project-btn");
const projectName = document.querySelector(".project-name");
const mainContent = document.querySelector(".main-content");
const dialogWrapper = document.querySelector(".dialog-wrapper");
const createTodoButton = document.querySelector(".btn-create-todo");
const todoWrappersContainer = document.querySelector(".todos-wrapper");

const domElements = {
  projectListDOM,
  projectName,
  mainContent,
  dialogWrapper,
  createTodoButton,
  todoWrappersContainer,
};

function createProject() {
  createDialog(
    dialogWrapper,
    mainContent,
    (header, fieldsDiv) => createProjectDialog(header, fieldsDiv, mainContent),
    () => addProjectToProjectListDOM(projectListDOM),
  );
}

addProjectButton.addEventListener("click", createProject);

createTodoButton.addEventListener("click", () => {
  createDialog(dialogWrapper, mainContent, createToDoDialog, () =>
    addTodo(projectName.textContent, domElements),
  );
});

projectListDOM.addEventListener("click", (e) => {
  const todoWrappers = document.querySelectorAll(".todo-wrapper");
  const selectedProject = projectListArr.find(
    (item) => item === e.target.textContent,
  );

  if (e.target.classList.contains("list-item")) {
    mainContent.style.visibility = "visible";
    createTodoButton.style.display = "";
    projectName.textContent = selectedProject;
    projectName.style.display = "";

    todoWrappers.forEach((todoWrapper) => {
      setUpdateAndDeleteButtonsVisibility(todoWrapper, "");

      if (todoWrapper.dataset.projectName !== selectedProject) {
        todoWrapper.style.display = "none";
      } else {
        todoWrapper.style.display = "";
      }
    });
  } else {
    createTodoButton.style.display = "none";
    projectName.style.display = "none";

    todoWrappers.forEach((todoWrapper) => {
      todoWrapper.style.display = "";
      setUpdateAndDeleteButtonsVisibility(todoWrapper, "none");
    });
  }
});
