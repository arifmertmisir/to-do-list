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
  setTitle(title) {
    this.#title = title;
  }
  getDescription() {
    return this.#description;
  }
  setDescription(description) {
    this.#description = description;
  }
  getDueDate() {
    return this.#dueDate;
  }
  setDueDate(dueDate) {
    this.#dueDate = dueDate;
  }
  getPriority() {
    return this.#priority;
  }
  setPriority(priority) {
    this.#priority = priority;
  }
  getNotes() {
    return this.#notes;
  }
  setNotes(notes) {
    this.#notes = notes;
  }
  getChecklist() {
    return this.#checklist;
  }
  setChecklist(checklist) {
    this.#checklist = checklist;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      notes: this.#notes,
      checklist: this.#checklist,
    };
  }

  static fromJSON(obj) {
    return new Todo(
      obj.id,
      obj.title,
      obj.description,
      obj.dueDate,
      obj.priority,
      obj.notes,
      obj.checklist,
    );
  }
}
