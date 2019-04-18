import React, { Component } from 'react';
import './App.css';
import Ia from './Components/Ia';

class App extends Component {
  constructor(){
    super()
    this.state= {
          hitpoints : 100,
          characterToPick : "",
           eggsToPick: [
              {eggOne : "TunaEgg"},
              {eggTwo : "TroutEgg"},
              {eggThree : "LobsterEgg"}
            ],

      charactersFromApi : [
      {One : "Vador"},
      {Two : "Yoda"},
      {Three : "Luke"},
      {Four : "Leila"}
      ]
    }
  this.pickCharactersFromApi = this.pickCharactersFromApi.bind(this)
}

  pickCharactersFromApi=()=>{
      this.setState({ characterToPick : this.state.charactersFromApi[0]});
  }
  render() {
    return (
      <div className="App">
        <Ia callCharacter={this.pickCharactersFromApi} IAName={this.state.characterToPick}/>
      </div>
    );
  }
}

export default App;
