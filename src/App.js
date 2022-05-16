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
import { NetworkStatusProvider } from './utils/NetworkStatusProvider';
import HomeWithInfinityScrollLib from './pages/HomeWithInfinityScrollLib';

const App = () => {

  return (
    <>
    <NetworkStatusProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout home><HomeWithInfinityScrollLib/></Layout>} />
          <Route exact path="/old" element={<Layout home><Home/></Layout>} />
          <Route exact path="/:name" element={<Layout><Detail/></Layout>} />
        </Routes>
      </BrowserRouter>
    </NetworkStatusProvider>
    </>
  );
}

export default App;
