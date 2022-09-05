import React, { useState, createContext, useEffect } from "react";

const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("TASKMAN_BOARDS")) || []
  );

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("TASKMAN_THEME")) || "light"
  );

  useEffect(() => {
    window.localStorage.setItem("TASKMAN_THEME", JSON.stringify(theme));
    window.localStorage.setItem("TASKMAN_BOARDS", JSON.stringify(boards));
  }, [theme, boards]);

  return (
    <BoardContext.Provider value={{ theme, setTheme, boards, setBoards }}>
      {children}
    </BoardContext.Provider>
  );
};

// export { BoardContext, BoardProvider };
export { BoardContext, BoardProvider };
