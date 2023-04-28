import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
// import AdmitCard from "./components/admitCard";
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
