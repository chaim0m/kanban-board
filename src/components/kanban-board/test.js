import React, { useState, useEffect } from "react";
import "./index.css";

const KanbanBoard = (props) => {
  // Each task is uniquely identified by its name.
  // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
  const [tasks, setTasks] = useState([
    { name: "1", stage: 0 },
    { name: "2", stage: 0 },
  ]);
  const [stagesTasks, setStagesTasks] = useState([]);

  const stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
  const updateTasksView = () => {
    let stages = [];
    for (let i = 0; i < stagesNames.length; ++i) {
      stages.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stages[stageId].push(task);
    }
    return stages;
  };
  useEffect(() => {
    let updatedStageTasks = updateTasksView();
    setStagesTasks({ stagesTasks: updatedStageTasks });
  });
  const addNewTask = (event) => {
    setTasks({ tasks: [...tasks, event.target.value] });
    updateTasksView();
  };
  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
        />
        <button
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
          onClick={addNewTask}
        >
          Create task
        </button>
      </section>
      <div className="mt-50 layout-row">
        {stagesTasks && stagesTasks.length > 0 && stagesTasks.map((tasks, i) => (
          <div className="card outlined ml-20 mt-0" key={`${i}`}>
            <div className="card-text">
              <h4>{stagesNames[i]}</h4>
              <ul className="styled mt-50" data-testid={`stage-${i}`}>
                {tasks.map((task, index) => (
                  <li className="slide-up-fade-in" key={`${i}${index}`}>
                    <div className="li-content layout-row justify-content-between align-items-center">
                      <span
                        data-testid={`${task.name.split(" ").join("-")}-name`}
                      >
                        {task.name}
                      </span>
                      <div className="icons">
                        <button
                          className="icon-only x-small mx-2"
                          data-testid={`${task.name.split(" ").join("-")}-back`}
                        >
                          <i className="material-icons">arrow_back</i>
                        </button>
                        <button
                          className="icon-only x-small mx-2"
                          data-testid={`${task.name
                            .split(" ")
                            .join("-")}-forward`}
                        >
                          <i className="material-icons">arrow_forward</i>
                        </button>
                        <button
                          className="icon-only danger x-small mx-2"
                          data-testid={`${task.name
                            .split(" ")
                            .join("-")}-delete`}
                        >
                          <i className="material-icons">delete</i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default KanbanBoard;
