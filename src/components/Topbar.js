import React, { useState, useContext } from "react";
import { BoardContext } from "../context/context";
import "../style/components/_topbar.scss";
import Button from "../UI/Button";
import DeleteBoard from "./DeleteBoard";
import NewTask from "./NewTask";

const Topbar = ({ singleBoard }) => {
  const [deleteBoardChecker, setDeleteBoardChecker] = useState(false);
  const [newTaskChecker, setNewTaskChecker] = useState(false);
  const theme = useContext(BoardContext).theme;

  const deleteBoardHandler = () => {
    setDeleteBoardChecker((prev) => !prev);
  };

  const addNewTaskHandler = () => {
    setNewTaskChecker((prev) => !prev);
  };

  return (
    <>
      {deleteBoardChecker ? (
        <DeleteBoard
          singleBoard={singleBoard}
          deleteBoardHandler={deleteBoardHandler}
        />
      ) : null}

      {newTaskChecker ? (
        <NewTask
          singleBoard={singleBoard}
          addNewTaskHandler={addNewTaskHandler}
        />
      ) : null}
      <div className={`topbar topbar__${theme}`}>
        <h4>{singleBoard.title}</h4>

        {singleBoard.id >= 0 ? (
          <div className="topbar__buttons">
            <Button className="topbar__purpleBtn" onClick={addNewTaskHandler}>
              +Add New Task
            </Button>
            <Button className="topbar__dotsBtn" onClick={deleteBoardHandler}>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Topbar;
