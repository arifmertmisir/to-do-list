import "./styles.css";
import Todo from "./todo.js";
/*
const date = new Date("2026-01-01").toDateString();
console.log(typeof date);
*/

const projectListDOM = document.querySelector(".project-list");
const addProjectButton = document.querySelector(".add-project-btn");
const projectName = document.querySelector(".project-name");
const mainContent = document.querySelector(".main-content");
const dialogWrapper = document.querySelector(".dialog-wrapper");
const createTodoButton = document.querySelector(".btn-create-todo");
const todoWrappersContainer = document.querySelector(".todos-wrapper");

createTodoButton.addEventListener("click", () => {
  createDialog(createToDoDialog, () => addTodo(projectName.textContent));
});

let projectNameField,
  todoTitleField,
  todoDescriptionField,
  todoDueDateField,
  todoPriorityField,
  todoNotesField,
  todoChecklistField;

let projectListArr = [];
let projects = [];

function addProjectToProjectListDOM() {
  const projectNameVal = projectNameField.value;
  if (projectNameVal.trim().length !== 0) {
    const newProject = document.createElement("li");
    newProject.classList.add("list-item");
    newProject.textContent = `${projectNameVal}`;
    projectListDOM.appendChild(newProject);
    projectListArr.push(projectNameVal);
  }
}

function createProjectDialog(header, dialogFieldsDiv) {
  mainContent.style.visibility = "hidden";
  header.textContent = "Create a New Project";
  const projectNameLabel = document.createElement("label");
  projectNameLabel.htmlFor = "project-name";
  projectNameLabel.textContent = "Project Name";

  projectNameField = document.createElement("input");
  projectNameField.type = "text";
  projectNameField.id = "project-name";

  dialogFieldsDiv.append(projectNameLabel, projectNameField);
}

function createToDoDialog(header, dialogFieldsDiv) {
  header.textContent = "Create a New Todo";
  const todoTitleLabel = document.createElement("label");
  todoTitleLabel.htmlFor = "todo-title";
  todoTitleLabel.textContent = "Todo Title";

  const todoDescriptionLabel = document.createElement("label");
  todoDescriptionLabel.htmlFor = "todo-description";
  todoDescriptionLabel.textContent = "Todo Description";

  const todoDueDateLabel = document.createElement("label");
  todoDueDateLabel.htmlFor = "todo-due-date";
  todoDueDateLabel.textContent = "Todo Due date";

  const todoPriorityLabel = document.createElement("label");
  todoPriorityLabel.htmlFor = "todo-priority";
  todoPriorityLabel.textContent = "Todo Priority";

  const todoNotesLabel = document.createElement("label");
  todoNotesLabel.htmlFor = "todo-notes";
  todoNotesLabel.textContent = "Todo Notes";

  const todoChecklistLabel = document.createElement("label");
  todoChecklistLabel.htmlFor = "todo-check-list";
  todoChecklistLabel.textContent = "Todo Checklist";

  todoTitleField = document.createElement("input");
  todoTitleField.type = "text";
  todoTitleField.id = "todo-title";

  todoDescriptionField = document.createElement("textarea");
  todoDescriptionField.id = "todo-description";

  todoDueDateField = document.createElement("input");
  todoDueDateField.type = "date";
  todoDueDateField.id = "todo-due-date";

  todoPriorityField = document.createElement("input");
  todoPriorityField.type = "number";
  todoPriorityField.id = "todo-priority";

  todoNotesField = document.createElement("input");
  todoNotesField.type = "text";
  todoNotesField.id = "todo-notes";

  todoChecklistField = document.createElement("input");
  todoChecklistField.type = "checkbox";
  todoChecklistField.id = "todo-check-list";

  dialogFieldsDiv.append(
    todoTitleLabel,
    todoTitleField,
    todoDescriptionLabel,
    todoDescriptionField,
    todoDueDateLabel,
    todoDueDateField,
    todoPriorityLabel,
    todoPriorityField,
    todoNotesLabel,
    todoNotesField,
    todoChecklistLabel,
    todoChecklistField,
  );
}

function displayTodo(selectedProject) {
  const currentProject = projects.find(
    (project) => project.key === selectedProject,
  );

  const lastIndex = currentProject.value.length;
  const todo = currentProject.value[lastIndex - 1];

  const todoWrapper = document.createElement("div");
  const todoContent = document.createElement("div");
  const todoTitle = document.createElement("p");
  const todoDescription = document.createElement("p");
  const todoDueDate = document.createElement("p");
  const todoPriority = document.createElement("p");
  const todoNotes = document.createElement("p");
  const todoChecklist = document.createElement("p");
  const updateToDoButton = document.createElement("button");
  const deleteToDoButton = document.createElement("button");

  todoWrapper.classList.add("todo-wrapper");
  todoContent.classList.add("todo-content");
  updateToDoButton.classList.add("btn-update-todo");
  deleteToDoButton.classList.add("btn-delete-todo");

  todoWrapper.dataset.projectName = currentProject.key;

  projectName.textContent = currentProject.key;
  todoTitle.textContent = todo.getTitle();
  todoDescription.textContent = todo.getDescription();
  todoDueDate.textContent = todo.getDueDate();
  todoPriority.textContent = todo.getPriority();
  todoNotes.textContent = todo.getNotes();
  todoChecklist.textContent = todo.getChecklist();
  updateToDoButton.textContent = "Update";
  deleteToDoButton.textContent = "Delete";

  todoContent.append(
    todoTitle,
    todoDescription,
    todoDueDate,
    todoPriority,
    todoNotes,
    todoChecklist,
  );

  todoWrapper.append(todoContent, updateToDoButton, deleteToDoButton);
  todoWrappersContainer.appendChild(todoWrapper);
}

function addTodo(selectedProject) {
  const todoTitleValue = todoTitleField.value;
  const todoDescriptionValue = todoDescriptionField.value;
  const todoDueDateValue = todoDueDateField.value;

  if (todoTitleValue && todoDescriptionValue && todoDueDateValue) {
    const id = crypto.randomUUID();
    const todo = new Todo(
      id,
      todoTitleField.value,
      todoDescriptionField.value,
      todoDueDateField.value,
      todoPriorityField.value,
      todoNotesField.value,
      todoChecklistField.value,
    );

    const existingProject = projects.find(
      (project) => project.key === selectedProject,
    );

    if (existingProject) {
      existingProject.value.push(todo);
    } else {
      projects.push({ key: selectedProject, value: [todo] });
    }
    displayTodo(selectedProject);
  }
}

function createDialog(fieldBuilderFunction, onSave) {
  dialogWrapper.innerHTML = "";
  const header = document.createElement("header");
  const dialog = document.createElement("dialog");
  const dialogFieldsDiv = document.createElement("div");
  const closeButton = document.createElement("button");
  const saveButton = document.createElement("button");

  saveButton.textContent = "Save";
  closeButton.textContent = "Close";

  dialog.classList.add("dialog");
  dialogFieldsDiv.classList.add("dialog-fields-wrapper");
  closeButton.classList.add("close");
  saveButton.classList.add("save");

  fieldBuilderFunction(header, dialogFieldsDiv);

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  saveButton.addEventListener("click", () => {
    onSave();
    dialog.close();
  });

  dialog.append(header, dialogFieldsDiv, saveButton, closeButton);
  dialogWrapper.append(dialog);
  mainContent.append(dialogWrapper);
  dialog.showModal();
}

function createProject() {
  createDialog(createProjectDialog, addProjectToProjectListDOM);
}

addProjectButton.addEventListener("click", createProject);
projectListDOM.addEventListener("click", (e) => {
  if (e.target.classList.contains("list-item")) {
    mainContent.style.visibility = "visible";
    createTodoButton.hidden = false;

    const selectedProject = projectListArr.find(
      (item) => item === e.target.textContent,
    );

    projectName.textContent = selectedProject;

    //todo: group todo divs by their project name: (learn how to use dataset API)
    const todoWrappers = document.querySelectorAll(".todo-wrapper");
    todoWrappers.forEach((todoWrapper) => {
      if (todoWrapper.dataset.projectName !== selectedProject) {
        todoWrapper.style.display = "none";
      } else {
        todoWrapper.style.display = "";
      }
    });
  }
});
