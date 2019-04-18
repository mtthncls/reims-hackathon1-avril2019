import React, { Component } from 'react';
import './App.css';
import UserCards from './Components/UserCard';


class App extends Component {
  render() {
    return (
      <div className="App">
        <UserCards/>
      </div>
    );
  }
}

export default App;
