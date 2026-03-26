import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import ToDoList from './ToDoList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/todo" element={<ToDoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
