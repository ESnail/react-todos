import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Todos from './pages/TodosHook/Todos.js'
import TsTodos from './pages/TsTodosHook/Todos.tsx'

import logo from './logo.svg';
import './App.css';

function Index () {
  return (
      <div className="App">
          <header className="App-header">
              <img src={ logo } className="App-logo" alt="logo" />
              <p>
            Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
              </a>

              <Link className="App-link" to="/todos-hook">todos-hook</Link>
              <Link className="App-link" to="/ts-todos-hook">ts-todos-hook</Link>
          </header>
      </div>
    )
}

function App() {
  return (
      // <Router>
      //     <Route path="/" exact component={ Index } />
      //     <Route path="/todos-hook" component={ Todos } />
      // </Router>
      <Router>
          <Route path="/" exact component={ Index } />
          <Route path="/todos-hook" component={ Todos } />
          <Route path="/ts-todos-hook" component={ TsTodos }/>
      </Router>
      
  );
}

export default App;
