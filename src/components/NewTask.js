import React, { useState, useContext } from "react";
import { BoardContext } from "../context/context";
import Modal from "../UI/Modal";
import Overlay from "../UI/Overlay";
import Button from "../UI/Button";

const NewTask = ({ singleBoard, addNewTaskHandler }) => {
  const boards = useContext(BoardContext).boards;
  const setBoards = useContext(BoardContext).setBoards;
  const [taskValues, setTaskValues] = useState({
    title: "",
    description: "",
    status: "",
  });

  //   dynamic subtasks logic
  //   https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
  const [inputFields, setInputFields] = useState([]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newField = {
      title: "",
      status: "TODO",
      id: Math.floor(Math.random() * 100),
    };

    setInputFields([...inputFields, newField]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const getTaskValues = (e) => {
    setTaskValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      id: Math.floor(Math.random() * 1000),
      subtasks: inputFields,
    }));
  };

  const submitTask = (e) => {
    e.preventDefault();
    if (taskValues.status && taskValues.subtasks) {
      const id = boards.findIndex((board) => board.id === singleBoard.id);
      const newState = [...boards];
      let newTasks = newState[id].tasks;
      newTasks.push(taskValues);
      newState[id].tasks = newTasks;
      setBoards(() => newState);
      addNewTaskHandler();
    } else {
      alert("Please choose task status");
    }
  };

  return (
    <>
      <Overlay onClick={addNewTaskHandler} />
      <Modal>
        <h4>Add New Task</h4>
        <form className="modal__form" onSubmit={submitTask}>
          <div className="modal__column">
            <legend>Title</legend>
            <input
              type="text"
              placeholder="e.g. Take coffe break"
              name="title"
              onChange={getTaskValues}
              required
            />
          </div>
          <div className="modal__column">
            <legend>Description</legend>
            <textarea
              placeholder="It's always right time for coffee!"
              name="description"
              onChange={getTaskValues}
              required
            ></textarea>
          </div>
          <div className="modal__column">
            <legend>Subtasks</legend>
            {inputFields.map((input, index) => {
              return (
                <div key={index} className="modal__row">
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="Enter subtask title..."
                    onChange={(event) => handleFormChange(index, event)}
                  />
                  <Button type="button" onClick={() => removeFields(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </div>
              );
            })}
            <Button
              className="modal__btn modal__whiteBtn"
              type="button"
              onClick={addFields}
            >
              +Add New Subtask
            </Button>
          </div>
          <div className="modal__column">
            <legend>Status</legend>
            <select name="status" onChange={getTaskValues} required>
              <option hidden>Choose here</option>
              <option value="TODO">Todo</option>
              <option value="DOING">Doing</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <Button className="modal__btn modal__purpleBtn" type="submit">
            Create New Board
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NewTask;
