// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import TaskForm from "./containers/TaskForm";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const localIsDarkTheme = localStorage.getItem("isDarkTheme");
    if (localIsDarkTheme === null) return false;
    return JSON.parse(localIsDarkTheme);
  });

  useEffect(() => {
    const theme = isDarkTheme ? "dark" : "light";
    document.body.setAttribute("data-bs-theme", theme);
    localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <Container>
      <ThemeSwitcher
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
      />
      <TaskForm />
    </Container>
  );
}

export default App;
