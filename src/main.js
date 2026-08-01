import "./styles.css";
import Todo from "./todo.js";

/*const todo = new Todo("Cinema", "Go to cinema today", new Date(), 3, "", "");
console.log(todo.getTitle());

const date = new Date("2026-01-01").toDateString();
console.log(typeof date);
*/

const projectListDOM = document.querySelector(".project-list");
const addProjectButton = document.querySelector(".add-project-btn");
const mainContent = document.querySelector(".main-content");
const dialogWrapper = document.querySelector(".dialog-wrapper");
let projectListArr = [];

function createDialogFields(dialogFieldsDiv) {
  const projectNameLabel = document.createElement("label");
  projectNameLabel.htmlFor = "project-name";
  projectNameLabel.textContent = "Project Name";

  const titleLabel = document.createElement("label");
  titleLabel.htmlFor = "title";
  titleLabel.textContent = "Title";

  const descriptionLabel = document.createElement("label");
  descriptionLabel.htmlFor = "description";
  descriptionLabel.textContent = "Description";

  const dueDateLabel = document.createElement("label");
  dueDateLabel.htmlFor = "due-date";
  dueDateLabel.textContent = "Due date";

  const priorityLabel = document.createElement("label");
  priorityLabel.htmlFor = "priority";
  priorityLabel.textContent = "Priority";

  const notesLabel = document.createElement("label");
  notesLabel.htmlFor = "notes";
  notesLabel.textContent = "Notes";

  const checklistLabel = document.createElement("label");
  checklistLabel.htmlFor = "check-list";
  checklistLabel.textContent = "Checklist";

  const projectNameField = document.createElement("input");
  projectNameField.type = "text";
  projectNameField.id = "project-name";

  const titleField = document.createElement("input");
  titleField.type = "text";
  titleField.id = "title";

  const descriptionField = document.createElement("textarea");
  descriptionField.id = "description";

  const dueDateField = document.createElement("input");
  dueDateField.type = "date";
  dueDateField.id = "due-date";

  const priorityField = document.createElement("input");
  priorityField.type = "number";
  priorityField.id = "priority";

  const notesField = document.createElement("input");
  notesField.type = "text";
  notesField.id = "notes";

  const checklistField = document.createElement("input");
  checklistField.type = "checkbox";
  checklistField.id = "check-list";

  dialogFieldsDiv.append(
    projectNameLabel,
    projectNameField,
    titleLabel,
    titleField,
    descriptionLabel,
    descriptionField,
    dueDateLabel,
    dueDateField,
    priorityLabel,
    priorityField,
    notesLabel,
    notesField,
    checklistLabel,
    checklistField,
  );
}

function createDialog() {
  dialogWrapper.innerHTML = "";
  const header = document.createElement("header");
  const dialog = document.createElement("dialog");
  const dialogFieldsDiv = document.createElement("div");
  const closeButton = document.createElement("button");
  const saveButton = document.createElement("button");

  header.textContent = "Create New Project";
  saveButton.textContent = "Save";
  closeButton.textContent = "Close";

  dialog.classList.add("dialog");
  dialogFieldsDiv.classList.add("dialog-fields-wrapper");
  closeButton.classList.add("close");
  saveButton.classList.add("save");

  createDialogFields(dialogFieldsDiv);

  closeButton.addEventListener("click", () => {
    dialog.close();
  });
  saveButton.addEventListener("click", () => {
    //todo
    dialog.close();
  });

  dialog.append(header, dialogFieldsDiv, saveButton, closeButton);
  dialogWrapper.append(dialog);
  mainContent.append(dialogWrapper);
  dialog.show();
}

function createProject() {
  createDialog();
}

addProjectButton.addEventListener("click", createProject);
