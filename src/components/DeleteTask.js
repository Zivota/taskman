import Modal from "../UI/Modal";
import Overlay from "../UI/Overlay";
import Button from "../UI/Button";

const DeleteTask = ({
  openSTModalHandler,
  task,
  deleteTaskChecker,
  deleteTaskHandler,
}) => {
  return (
    <>
      <Overlay onClick={openSTModalHandler} />
      <Modal>
        <h4>Delete Task</h4>
        <div className="modal__column">
          <legend>
            Are you sure you want to delete "<span>{task.title}</span>"?
          </legend>
        </div>
        <Button
          className="modal__btn modal__redBtn"
          onClick={deleteTaskHandler}
        >
          Delete Task
        </Button>
        <Button className="modal__btn mt1" onClick={deleteTaskChecker}>
          <i className="fa-solid fa-chevron-left"></i> Return
        </Button>
      </Modal>
    </>
  );
};

export default DeleteTask;
