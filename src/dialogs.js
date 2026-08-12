export let projectNameField;
export let todoTitleField;
export let todoDescriptionField;
export let todoDueDateField;
export let todoPriorityField;
export let todoNotesField;
export let todoChecklistField;

export function createDialog(
  dialogWrapper,
  mainContent,
  fieldBuilderFunction,
  onSave,
) {
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

  closeButton.addEventListener("click", () => dialog.close());
  saveButton.addEventListener("click", () => {
    onSave();
    dialog.close();
  });

  dialog.append(header, dialogFieldsDiv, saveButton, closeButton);
  dialogWrapper.append(dialog);
  mainContent.append(dialogWrapper);
  dialog.showModal();
}

export function createProjectDialog(header, dialogFieldsDiv, mainContent) {
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

export function createToDoDialog(header, dialogFieldsDiv) {
  if (header) header.textContent = "Create a New Todo";

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
  todoDueDateField.type = "datetime-local";
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

export function updateTodoDialog(todo) {
  todoTitleField.value = todo.getTitle();
  todoDescriptionField.value = todo.getDescription();
  todoDueDateField.value = todo.getDueDate();
  todoPriorityField.value = todo.getPriority();
  todoNotesField.value = todo.getNotes();
  todoChecklistField.value = todo.getChecklist();
}
