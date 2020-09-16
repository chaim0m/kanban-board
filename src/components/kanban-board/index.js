import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
        { name: "1", stage: 0 },
        { name: "2", stage: 0 },
      ],
      stagesTasks: [],
      input: "",
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
    this.addNewTask = this.addNewTask.bind(this);
    this.updateTasksView = this.updateTasksView.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.moveTask = this.moveTask.bind(this);
    this.removeTask = this.removeTask.bind(this)
  }
  addNewTask = (e) => {
    if (this.state.input){
      this.setState(
        { tasks: [...this.state.tasks, { name: this.state.input, stage: 0 }],
          input: ""
        },
        this.updateTasksView
      );
    }
  };
  // Task name input
  updateInput = (e) => {
    this.setState({ input: e.target.value });
  };
  // Move task between boards
  moveTask(direction, currentTaskName) {
    let currentTaskIndex = this.state.tasks.findIndex(t => t.name === currentTaskName);
    let operator = 1;
    if (direction === "back") {
      operator = -1;
    }
      let tasks = [];
      tasks = [...this.state.tasks];
      let task = { ...tasks[currentTaskIndex] };
      task.stage = task.stage + operator;
      tasks[currentTaskIndex] = task;
      this.setState({ tasks }, this.updateTasksView);
  }
  removeTask(taskName){
    let currentTaskIndex = this.state.tasks.findIndex(t => t.name === taskName);
    this.setState({
      tasks: this.state.tasks.filter((_, i) => i !== currentTaskIndex)
    }, this.updateTasksView);
  }
  // Used for updating the view
  updateTasksView = () => {
    let stages = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stages.push([]);
    }
    for (let task of this.state.tasks) {
      const stageId = task.stage;
      stages[stageId].push(task);
    }
    this.setState({ stagesTasks: stages });
  };
  componentDidMount() {
    this.updateTasksView();
  }
  render() {
    const { stagesTasks, input } = this.state;
    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input
            id="create-task-input"
            type="text"
            className="large"
            placeholder="New task name"
            data-testid="create-task-input"
            value={input}
            onChange={this.updateInput}
          />
          <button
            type="submit"
            className="ml-30"
            data-testid="create-task-button"
            onClick={this.addNewTask}
          >
            Create task
          </button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li className="slide-up-fade-in" key={`${i}${index}`}>
                          <div className="li-content layout-row justify-content-between align-items-center">
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div className="icons">
                              <button
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-back`}
                                  disabled={task.stage === 0}
                                  onClick={() => this.moveTask("back", task.name)}
                              >
                                <i className="material-icons">arrow_back</i>
                              </button>
                              <button
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                                  disabled={task.stage === stagesTasks.length -1}
                                onClick={() => this.moveTask("forward", task.name)}
                              >
                                <i className="material-icons">arrow_forward</i>
                              </button>
                              <button
                                className="icon-only danger x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-delete`}
                                  onClick={() => this.removeTask(task.name)}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
