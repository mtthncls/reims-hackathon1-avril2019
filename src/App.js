import React, { Component } from 'react';
import './App.css';





class App extends Component {
  componentDidMount() {
    fetch('http://easteregg.wildcodeschool.fr/api/eggs')
      .then(eggsFromAPI => eggsFromAPI.json())
      .then(eggsData => {
        console.log(eggsData[0].name);
      }
      );

    fetch('http://easteregg.wildcodeschool.fr/api/characters')
      .then(charsFromAPI => charsFromAPI.json())
      .then(charsData => {
        console.log(charsData[0].name);
      }
      );
  };
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
