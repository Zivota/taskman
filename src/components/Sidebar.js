import React, { useState, useContext } from "react";
import "../style/components/_sidebar.scss";
import Logo from "../UI/Logo";
import { BoardContext } from "../context/context";
import { Link } from "react-router-dom";
import CreateNewBoard from "./CreateNewBoard";

const Sidebar = () => {
  const theme = useContext(BoardContext).theme;
  const setTheme = useContext(BoardContext).setTheme;
  const boards = useContext(BoardContext).boards;

  const [sidebarState, setSidebarState] = useState("opened");
  const [boardCreation, setBoardCreation] = useState(false);

  const createBoardHandler = () => {
    setBoardCreation((prev) => !prev);
  };

  const themeSwitcher = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const sidebarStateHandler = () => {
    if (sidebarState === "opened") {
      setSidebarState("closed");
    } else {
      setSidebarState("opened");
    }
  };

  return (
    <>
      {boardCreation ? (
        <CreateNewBoard createBoardHandler={createBoardHandler} />
      ) : null}
      <div className={`sidebar sidebar__${theme} ${sidebarState}`}>
        <div className="sidebar__logo">
          <Logo />
          {/* if sidebar state is closed - hide element */}
          <h3 className={`state__${sidebarState}`}>taskman</h3>
        </div>

        <div className="sidebar__boards">
          <p>
            <span className={`state__${sidebarState}`}>ALL BOARDS</span>{" "}
            <span> ({boards.length}) </span>
          </p>

          {/* mapping through every single task in state and displaying them individually*/}

          {boards.map((board) => {
            return (
              <Link to={`/${board.id}`} key={board.id}>
                <div
                  className={`sidebar__board board__${sidebarState}`}
                  data-name={board.title}
                >
                  <i className="fa-solid fa-clipboard-list"></i>
                  <legend className={`state__${sidebarState}`}>
                    {board.title}
                  </legend>
                </div>
              </Link>
            );
          })}

          {/* create new board */}
          <div
            className={`sidebar__board board__${sidebarState}`}
            data-name="+Create New Board"
            id="createNewBoardBtn"
            onClick={createBoardHandler}
          >
            <i className="fa-solid fa-clipboard-list"></i>
            <legend className={`state__${sidebarState}`}>
              +Create New Board
            </legend>
          </div>
        </div>

        {/* sidebar theme handler */}
        <div className={`sidebar__themeHandler themeHandler__${theme}`}>
          <i className={`fa-regular fa-sun state__${sidebarState}`}></i>
          <div
            className={`themeSwitcher theme__${theme}`}
            onClick={themeSwitcher}
          >
            <span></span>
          </div>
          <i className={`fa-solid fa-moon state__${sidebarState}`}></i>
        </div>

        {/* sidebar state handler */}
        <div
          className={`sidebar__board board__${sidebarState}`}
          data-name="Show Sidebar"
          onClick={sidebarStateHandler}
          id="hideSidebarBtn"
        >
          <i className="fa-solid fa-eye-slash"></i>
          <legend className={`state__${sidebarState}`}>Hide Sidebar</legend>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
