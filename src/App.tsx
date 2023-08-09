import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, RouterProvider, Routes } from "react-router";
import Home from "./Components/Dictionary/Home";
import Details from "./Components/Dictionary/Details";
import routes from "./Components/utils/Routes";
import { Provider } from "react-redux/es/exports";
import { store } from "./Components/Redux/store";
import Switch from "@mui/material/Switch";
type ThemeContextType = {
  theme: string;
  themeToggle: () => void;
};
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  themeToggle: () => {},
});
function App() {
  const [theme, setTheme] = useState<string>("light");
  const themeToggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
      setTheme("dark");
    }
  }, []);
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, themeToggle }}>
        <div className="App" id={theme === "light" ? "light" : "dark"}>
          <div style={{ display: "flex", marginLeft: "16px" }}>
            {theme === "light" ? (
              <p style={{ color: "black" }}>Dark Mode</p>
            ) : (
              <p style={{ color: "white" }}>Light Mode</p>
            )}
            <div style={{ marginTop: "8px" }}>
              <Switch onChange={themeToggle} />
            </div>
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/search" element={<Home />} />
              <Route path="details/:id" element={<Details />} />
              <Route path="*" element={<Navigate to="/search" replace />} />,
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
