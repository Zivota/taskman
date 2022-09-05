import React, { useContext } from "react";
import { BoardContext } from "../context/context";
import { useParams } from "react-router-dom";
import Modal from "../UI/Modal";
import Overlay from "../UI/Overlay";
import Button from "../UI/Button";

const DeleteBoard = ({ deleteBoardHandler, singleBoard }) => {
  const boards = useContext(BoardContext).boards;
  const setBoards = useContext(BoardContext).setBoards;
  const { boardID } = useParams();

  const deleteBoard = () => {
    let newBoards = boards.filter((board) => board.id.toString() !== boardID);
    setBoards(() => newBoards);

    deleteBoardHandler();
  };

  return (
    <>
      <Overlay onClick={deleteBoardHandler} />
      <Modal>
        <h4>Delete Board</h4>
        <div className="modal__column">
          <legend>
            Are you sure you want to delete "<span>{singleBoard.title}</span>"?
          </legend>
        </div>
        <Button className="modal__btn modal__redBtn" onClick={deleteBoard}>
          Delete Board
        </Button>
      </Modal>
    </>
  );
};

export default DeleteBoard;
