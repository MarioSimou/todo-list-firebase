export const doTaskMapping = (task, arr) =>
  arr.reduce((acc, [k, fn]) => ({ ...acc, [k]: fn(task) }), {});

export const handleOnSnapshotEvent = (tasks, reducers, fn) => snapshot => {
  const changes = snapshot.docChanges();
  for (const change of changes) {
    switch (change.type) {
      case "added":
        if (!tasks.find(task => task.id === change.doc.id)) {
          reducers.addTask(fn(change, [
            ["id", c => c.doc.id],
            ["title", c => c.doc.data().title || ""],
            ["body", c => c.doc.data().body || ""]
          ]));
        }
        break;
      case "modified":
        reducers.updateTask(fn(change, [
          ["id", c => c.doc.id],
          ["title", c => c.doc.data().title || ""],
          ["body", c => c.doc.data().body || ""]
        ]));
        break
      case "removed":
        reducers.removeTask(change.doc.id)
        break
      default:
        break;
    }
  }
};

export const htmlToString = str => str.replace(/(<.+?>|<.+?>)/g,'')