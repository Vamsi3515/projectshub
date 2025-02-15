import React from 'react'
import styled, {ThemeProvider, createGlobalStyle} from "styled-components";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {lightTheme} from "./utils/Themes";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

const Container = styled.div``;
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
  }
`;

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Container>
          <NavBar />
          <Routes>
            <Route path='/' exact element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;