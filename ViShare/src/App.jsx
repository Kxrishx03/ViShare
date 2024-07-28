import styled, { ThemeProvider } from "styled-components";
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import "./App.css";
import { darkTheme, lightTheme } from "./utils/Themes";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Home } from "./pages/Home";
import { Video } from "./pages/Video";
import { Signin } from "./pages/Signin";
import Search from "./pages/Search";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
padding: 20px 30px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
       <Toaster></Toaster>
        <Container>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/" element={<Home type="random"/>} />
                <Route path="/trends" element={<Home type="trend"/>} />
                <Route path="/sub" element={<Home type="sub"/>} />
                <Route path="search" element={<Search />} />
                <Route path="/signin" element={<Signin/>}/>
                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
