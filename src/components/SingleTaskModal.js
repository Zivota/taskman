import React, { useState, useContext } from "react";
import { BoardContext } from "../context/context";
import Button from "../UI/Button";
import Overlay from "../UI/Overlay";
import Modal from "../UI/Modal";
import DeleteTask from "./DeleteTask";

const SingleTaskModal = ({
  task,
  openSTModalHandler,
  subtasksCount,
  singleBoard,
}) => {
  const theme = useContext(BoardContext).theme;
  const boards = useContext(BoardContext).boards;
  const setBoards = useContext(BoardContext).setBoards;

  const [deleteTask, setDeleteTask] = useState(false);

  const taskStatusHandler = (e) => {
    const boardID = boards.findIndex((board) => board.id === singleBoard.id);
    const taskID = boards[boardID].tasks.findIndex(
      (singleTask) => singleTask.id === task.id
    );
    const newState = [...boards];

    newState[boardID].tasks[taskID].status = e.target.value;
    setBoards(() => newState);
  };

  const subtaskStateHandler = (id) => {
    const boardID = boards.findIndex((board) => board.id === singleBoard.id);
    const taskID = boards[boardID].tasks.findIndex(
      (singleTask) => singleTask.id === task.id
    );
    const subtaskID = boards[boardID].tasks[taskID].subtasks.findIndex(
      (subtask) => subtask.id === id
    );

    const newState = [...boards];
    const subtaskStatus =
      newState[boardID].tasks[taskID].subtasks[subtaskID].status;

    if (subtaskStatus === "DONE") {
      newState[boardID].tasks[taskID].subtasks[subtaskID].status = "TODO";
    } else {
      newState[boardID].tasks[taskID].subtasks[subtaskID].status = "DONE";
    }

    setBoards(() => newState);
  };

  const deleteTaskChecker = () => {
    setDeleteTask((prev) => !prev);
  };

  const deleteTaskHandler = () => {
    const boardID = boards.findIndex((board) => board.id === singleBoard.id);
    const taskID = boards[boardID].tasks.findIndex(
      (singleTask) => singleTask.id === task.id
    );
    const newState = [...boards];
    const filteredTasks = newState[boardID].tasks.filter(
      (singleTask) => singleTask.id !== task.id
    );

    newState[boardID].tasks = filteredTasks;

    setBoards(() => newState);
  };

  return (
    <>
      {deleteTask ? (
        <DeleteTask
          openSTModalHandler={openSTModalHandler}
          task={task}
          deleteTaskChecker={deleteTaskChecker}
          deleteTaskHandler={deleteTaskHandler}
        />
      ) : (
        <>
          <Overlay onClick={openSTModalHandler} />
          <Modal>
            <div className="modal__row">
              <h5>{task.title}</h5>
              <Button className="threedots" onClick={deleteTaskChecker}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </Button>
            </div>
            <p>{task.description}</p>

            <div className="modal__column">
              <legend>
                Subtasks ({subtasksCount} of {task.subtasks.length})
              </legend>
              {task.subtasks.map((subtask) => {
                return (
                  <div
                    className={`modal__subtask subtask__${theme}`}
                    key={subtask.id}
                  >
                    <p>
                      <span onClick={() => subtaskStateHandler(subtask.id)}>
                        {subtask.status === "TODO" ? (
                          <i className="fa-regular fa-square"></i>
                        ) : (
                          <i
                            className="fa-solid fa-square-check"
                            id="checked"
                          ></i>
                        )}
                      </span>
                      {subtask.title}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="modal__column">
              <legend>Status</legend>
              <select onChange={taskStatusHandler}>
                <option hidden>{task.status}</option>
                <option value="TODO">Todo</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default SingleTaskModal;
