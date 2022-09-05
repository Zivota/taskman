import React, { useState, useContext } from "react";
import Modal from "../UI/Modal";
import Overlay from "../UI/Overlay";
import Button from "../UI/Button";
import { BoardContext } from "../context/context";

const CreateNewBoard = ({ createBoardHandler }) => {
  const boards = useContext(BoardContext).boards;

  const setBoards = useContext(BoardContext).setBoards;
  const [boardTitle, setBoardTitle] = useState();

  const getValue = (e) => {
    if (e.target.value.replace(/\s+/g, "").length > 0) {
      setBoardTitle(() => e.target.value);
    }
  };

  const createBoard = (e) => {
    e.preventDefault();
    if (boardTitle) {
      setBoards((prevBoards) => [
        ...prevBoards,
        {
          title: boardTitle,
          id: Math.floor(Math.random() * 1000),
          tasks: [],
        },
      ]);
      createBoardHandler();
    }
  };

  return (
    <>
      <Overlay onClick={createBoardHandler} />
      <Modal>
        <h4>Create New Board </h4>
        <form className="modal__form" onSubmit={createBoard}>
          <div className="modal__column">
            <legend>Board Title</legend>
            <input
              type="text"
              placeholder="Enter Board Title"
              onChange={getValue}
            />
          </div>
          <Button className="modal__btn modal__purpleBtn" type="submit">
            Create New Board
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateNewBoard;
