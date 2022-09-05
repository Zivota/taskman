import React, { useState, useContext } from "react";
import { BoardContext } from "../context/context";
import "../style/components/_singletask.scss";
import SingleTaskModal from "./SingleTaskModal";

const SingleTask = ({ task, singleBoard }) => {
  const [openSTModal, setOpenSTModal] = useState(false);
  const theme = useContext(BoardContext).theme;

  const subtasksCount = task.subtasks.filter((obj) => {
    if (obj.status === "DONE") {
      return true;
    }
    return false;
  }).length;

  const openSTModalHandler = () => {
    setOpenSTModal((prev) => !prev);
  };

  return (
    <>
      {openSTModal ? (
        <SingleTaskModal
          subtasksCount={subtasksCount}
          task={task}
          singleBoard={singleBoard}
          openSTModalHandler={openSTModalHandler}
        />
      ) : null}
      <div
        className={`singletask singletask__${theme}`}
        onClick={openSTModalHandler}
      >
        <h6>{task.title}</h6>

        {task.subtasks.length > 0 ? (
          <p>
            {subtasksCount} of {task.subtasks.length} subtasks
          </p>
        ) : (
          <p>There is no subtasks</p>
        )}
      </div>
    </>
  );
};

export default SingleTask;
