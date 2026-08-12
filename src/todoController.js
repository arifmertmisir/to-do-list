import Todo from "./todo.js";
import { format } from "date-fns";
import { projects, projectListArr } from "./state.js";
import {
  createDialog,
  createToDoDialog,
  updateTodoDialog,
  todoTitleField,
  todoDescriptionField,
  todoDueDateField,
  todoPriorityField,
  todoNotesField,
  todoChecklistField,
} from "./dialogs.js";
import { saveState } from "./storage.js";

export function updateTodo(
  todo,
  todoTitle,
  todoDescription,
  todoDueDate,
  todoPriority,
  todoNotes,
  todoChecklist,
) {
  todoTitle.textContent = todoTitleField.value;
  todoDescription.textContent = todoDescriptionField.value;
  todoDueDate.textContent = format(
    new Date(todoDueDateField.value),
    "dd.MM.yyyy HH:mm:ss",
  );
  todoPriority.textContent = todoPriorityField.value;
  todoNotes.textContent = todoNotesField.value;
  todoChecklist.textContent = todoChecklistField.checked;

  todo.setTitle(todoTitleField.value);
  todo.setDescription(todoDescriptionField.value);
  todo.setDueDate(todoDueDateField.value);
  todo.setPriority(todoPriorityField.value);
  todo.setNotes(todoNotesField.value);
  todo.setChecklist(todoChecklistField.value);
  saveState();
}

export function deleteTodo(
  todo,
  currentProject,
  projectListDOM,
  projectName,
  createTodoButton,
  todoWrapper,
) {
  const valueIndexToBeDeleted = currentProject.value.findIndex(
    (item) => item.getId() === todo.getId(),
  );

  if (currentProject.value.length > 0 && valueIndexToBeDeleted !== -1) {
    currentProject.value.splice(valueIndexToBeDeleted, 1);
  }

  if (currentProject.value.length === 0) {
    const projectIndex = projects.findIndex(
      (p) => p.key === currentProject.key,
    );
    const listArrIndex = projectListArr.indexOf(currentProject.key);

    const listItems = Array.from(projectListDOM.querySelectorAll("li"));
    const listItem = listItems.find(
      (item) => item.textContent === currentProject.key,
    );

    if (projectIndex !== -1) projects.splice(projectIndex, 1);
    if (listArrIndex !== -1) projectListArr.splice(listArrIndex, 1);
    if (listItem) listItem.remove();

    projectName.style.display = "none";
    createTodoButton.style.display = "none";
  }

  todoWrapper.remove();
  saveState();
}

export function displayTodo(selectedProject, elements) {
  const {
    projectName,
    todoWrappersContainer,
    dialogWrapper,
    mainContent,
    projectListDOM,
    createTodoButton,
  } = elements;

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
  todoWrapper.dataset.todoId = todo.getId();

  projectName.textContent = currentProject.key;
  todoTitle.textContent = todo.getTitle();
  todoDescription.textContent = todo.getDescription();
  todoDueDate.textContent = format(
    new Date(todo.getDueDate()),
    "dd.MM.yyyy HH:mm:ss",
  );
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

  updateToDoButton.addEventListener("click", () => {
    createDialog(
      dialogWrapper,
      mainContent,
      (header, dialogFieldsDiv) => {
        createToDoDialog(header, dialogFieldsDiv);
        updateTodoDialog(todo);
      },
      () => {
        updateTodo(
          todo,
          todoTitle,
          todoDescription,
          todoDueDate,
          todoPriority,
          todoNotes,
          todoChecklist,
        );
      },
    );
  });

  deleteToDoButton.addEventListener("click", () => {
    deleteTodo(
      todo,
      currentProject,
      projectListDOM,
      projectName,
      createTodoButton,
      todoWrapper,
    );
  });
}

export function addTodo(selectedProject, elements) {
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
      todoChecklistField.checked ? "Completed" : "Not completed",
    );

    const existingProject = projects.find(
      (project) => project.key === selectedProject,
    );

    if (existingProject) {
      existingProject.value.push(todo);
    } else {
      projects.push({ key: selectedProject, value: [todo] });
    }

    displayTodo(selectedProject, elements);
    saveState();
  }
}
