import { projectNameField } from "./dialogs.js";
import { projectListArr } from "./state.js";

export function addProjectToProjectListDOM(projectListDOM) {
  const projectNameVal = projectNameField.value;
  if (projectNameVal.trim().length !== 0) {
    const newProject = document.createElement("li");
    newProject.classList.add("list-item");
    newProject.textContent = `${projectNameVal}`;
    projectListDOM.appendChild(newProject);
    projectListArr.push(projectNameVal);
  }
}

export function setUpdateAndDeleteButtonsVisibility(todoWrapper, visibility) {
  const updateTodoBtn = todoWrapper.querySelector(".btn-update-todo");
  const deleteTodoBtn = todoWrapper.querySelector(".btn-delete-todo");

  if (updateTodoBtn) updateTodoBtn.style.display = visibility;
  if (deleteTodoBtn) deleteTodoBtn.style.display = visibility;
}
