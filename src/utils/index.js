export const doTaskMapping = (task, arr) =>
  arr.reduce((acc, [k, fn]) => ({ ...acc, [k]: fn(task) }), {});

  export const handleOnSnapshotEvent = (tasks, loadTasks, fn) => snapshot => {
  const changes = snapshot.docChanges();
  const l = changes.reduce((acc, change) => {
    console.log(change)
    switch (change.type) {
      case "added":
        if (Object.values(tasks).length === 0) {
          acc = [
            ...acc,
            fn(change, [
              ["id", c => c.doc.id],
              ["title", c => c.doc.data().title || ""],
              ["body", c => c.doc.data().body || ""]
            ])
          ];
        }
        break;
      default:
        break;
    }
    return acc;
  }, []);

  if(l.length > 0) loadTasks(l)
};
