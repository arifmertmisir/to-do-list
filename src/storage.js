import {
  projects,
  projectListArr,
  setProjects,
  setProjectListArr,
} from "./state.js";
import Todo from "./todo.js";

const PROJECTS_KEY = "todoapp_projects";
const PROJECT_LIST_KEY = "todoapp_projectListArr";

export function saveState() {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  localStorage.setItem(PROJECT_LIST_KEY, JSON.stringify(projectListArr));
}

export function loadState() {
  const savedProjects = localStorage.getItem(PROJECTS_KEY);
  const savedProjectListArr = localStorage.getItem(PROJECT_LIST_KEY);

  if (savedProjects) {
    const parsed = JSON.parse(savedProjects);
    const restored = parsed.map((project) => ({
      key: project.key,
      value: project.value.map((t) => Todo.fromJSON(t)),
    }));
    setProjects(restored);
  }

  if (savedProjectListArr) {
    setProjectListArr(JSON.parse(savedProjectListArr));
  }
}
