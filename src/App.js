import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Layout from './layouts/Layout';
import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';

const App = () => {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout><Home/></Layout>} />
        <Route exact path="/:name" element={<Layout><Detail/></Layout>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
