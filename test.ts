import { TodoistAPI } from "./index.ts";
import { initializeEnv } from "./helper.ts";

initializeEnv(["TODOIST_TOKEN"]);

const todoistKey = Deno.env.get("TODOIST_TOKEN");
const todoistAPI = new TodoistAPI(todoistKey!);

Deno.test("inserting, deleting and fetching tasks", async () => {
  // Test task insertion
  const insertObject = await todoistAPI.addTask({ content: `Test` });
  const insertArray = await todoistAPI.getTask();
  const insertFound = insertArray.find((x) => x.id === insertObject.id);

  if (typeof (insertFound) === "undefined") {
    throw Error("Todoist API couldn't insert or fetch tasks");
  }

  // Test task deletion
  await todoistAPI.deleteTask(insertObject.id!);

  const deletionArray = await todoistAPI.getTask();
  const deletionFound = deletionArray.find((x) => x.id === insertObject.id);

  if (typeof (deletionFound) !== "undefined") {
    throw Error("Todoist API couldn't delete or fetch tasks");
  }
});

Deno.test("inserting, deleting and fetching projects", async () => {
  // Test project insertion
  const insertObject = await todoistAPI.addProject({ name: `Test` });
  const insertArray = await todoistAPI.getProject();
  const insertFound = insertArray.find((x) => x.id === insertObject.id);

  if (typeof (insertFound) === "undefined") {
    throw Error("Todoist API couldn't insert or fetch projects");
  }

  // Test project deletion
  await todoistAPI.deleteProject(insertObject.id!);

  const deletionArray = await todoistAPI.getProject();
  const deletionFound = deletionArray.find((x) => x.id === insertObject.id);

  if (typeof (deletionFound) !== "undefined") {
    throw Error("Todoist API couldn't delete or fetch projects");
  }
});

Deno.test("inserting, deleting and fetching sections", async () => {
  // Create temporary project to test sections in
  const insertProject = await todoistAPI.addProject({ name: `Test` });

  // Test section insertion
  const insertObject = await todoistAPI.addSection({
    name: `Test`,
    project_id: insertProject.id!,
  });

  const insertArray = await todoistAPI.getSection();
  const insertFound = insertArray.find((x) => x.id === insertObject.id);

  if (typeof (insertFound) === "undefined") {
    throw Error("Todoist API couldn't insert or fetch sections");
  }

  // Test section deletion
  await todoistAPI.deleteSection(insertObject.id!);

  const deletionArray = await todoistAPI.getSection();
  const deletionFound = deletionArray.find((x) => x.id === insertObject.id);

  if (typeof (deletionFound) !== "undefined") {
    throw Error("Todoist API couldn't delete or fetch sections");
  }

  // Clean up the temporary project
  await todoistAPI.deleteProject(insertObject.id!);
});
