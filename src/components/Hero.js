import "../style/components/_hero.scss";
import SingleTask from "./SingleTask";

const Hero = ({ singleBoard }) => {
  return (
    <div className="hero">
      <div className="hero__tasks">
        <legend>
          <span className="color color__blue"></span> TODO
        </legend>

        {singleBoard.tasks.map((task) =>
          task.status === "TODO" ? (
            <SingleTask key={task.id} task={task} singleBoard={singleBoard} />
          ) : null
        )}
      </div>

      <div className="hero__tasks">
        <legend>
          <span className="color color__purple"></span> DOING
        </legend>

        {singleBoard.tasks.map((task) =>
          task.status === "DOING" ? (
            <SingleTask key={task.id} task={task} singleBoard={singleBoard} />
          ) : null
        )}
      </div>

      <div className="hero__tasks">
        <legend>
          <span className="color color__green"></span> DONE
        </legend>

        {singleBoard.tasks.map((task) =>
          task.status === "DONE" ? (
            <SingleTask key={task.id} task={task} singleBoard={singleBoard} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Hero;
