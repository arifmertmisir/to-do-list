export default class Todo {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #notes;
  #checklist;

  constructor(id, title, description, dueDate, priority, notes, checklist) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#notes = notes;
    this.#checklist = checklist;
  }

  getId() {
    return this.#id;
  }
  getTitle() {
    return this.#title;
  }
  getDescription() {
    return this.#description;
  }
  getDueDate() {
    return this.#dueDate;
  }
  getPriority() {
    return this.#priority;
  }
  getNotes() {
    return this.#notes;
  }
  getChecklist() {
    return this.#checklist;
  }
}
