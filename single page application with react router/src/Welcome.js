import { Link } from 'react-router-dom';
import './App.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to React App</h1>
      <Link to="/todo">
        <button className="goto-btn">Go to To Do List</button>
      </Link>
    </div>
  );
}

export default Welcome;
