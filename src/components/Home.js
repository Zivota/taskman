import React, { useContext } from "react";
import { BoardContext } from "../context/context";
import "../style/components/_home.scss";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Hero from "./Hero";
import { useParams } from "react-router-dom";

const Home = () => {
  const theme = useContext(BoardContext).theme;
  const boards = useContext(BoardContext).boards;
  let singleBoard = { title: "Choose Board", tasks: [] };

  const { boardID } = useParams();

  if (boardID) {
    singleBoard = boards.find((board) => boardID === board.id.toString());

    if (singleBoard == undefined) {
      singleBoard = { title: "Choose Correct Board", tasks: [] };
    }
  }
  return (
    <div className={`home ${theme}`}>
      <div className="home__sidebar">
        <Sidebar />
      </div>
      <div className="home__hero">
        <Topbar singleBoard={singleBoard} />
        <Hero singleBoard={singleBoard} />
      </div>
    </div>
  );
};

export default Home;
