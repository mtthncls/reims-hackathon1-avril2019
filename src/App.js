import React, { Component } from 'react';
import DisplayEgg from "./DisplayEgg";
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Ia from './Components/Ia';
import CharacterChoice from './Components/CharacterChoice';



class App extends Component {
  constructor() {
    super()
    this.state = {
      charactersRandomizedFromApi: [],
      eggsRandomizedFromApi: [],
      IAHitpoints: "20",
      userHitpoints: "20",
      selectedEggs: [],
      selectedEggsIA: [],
      isSelectedCharacter: [],
      isSelectCharacterIA: [],
      isBattlefieldDisplayed: false,
      isCharacterSelected: false,
      areEggsSelected: false
    }
  }


  componentDidMount() {
    fetch('http://easteregg.wildcodeschool.fr/api/eggs')
      .then(eggsFromAPI => eggsFromAPI.json())
      .then(eggsData => {
        // console.log(eggsData[0].name);
        let eggsToRandomize = this.randomizeAPIDisplay(eggsData);
        // console.log(eggsToRandomize[0].name);
        let eggsToDisplay = this.selectNumberOfDisplay(eggsToRandomize, 30)
        // console.log(eggsToDisplay)
        this.setState({ eggsRandomizedFromApi: eggsToDisplay })

      }
      );

    fetch('http://easteregg.wildcodeschool.fr/api/characters')
      .then(charsFromAPI => charsFromAPI.json())
      .then(charsData => {
        // console.log(charsData[0].name);
        let charsToRandomize = this.randomizeAPIDisplay(charsData);
        // console.log(charsToRandomize[0].name);
        let charsToDisplay = this.selectNumberOfDisplay(charsToRandomize, 10)
        // console.log(charsToDisplay)
        this.setState({ charactersRandomizedFromApi: charsToDisplay })
      }
      );

  };
  randomizeAPIDisplay = (apiResponse) => {
    let currentIndex = apiResponse.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = apiResponse[currentIndex];
      apiResponse[currentIndex] = apiResponse[randomIndex];
      apiResponse[randomIndex] = temporaryValue;
    };
    return apiResponse
  };

  selectNumberOfDisplay = (apiRandomizedResponse, displayNumber) => {
    let selectedDisplays = []
    for (let i = 0; i < displayNumber; i++) {
      selectedDisplays.push(apiRandomizedResponse[i])
    }
    return selectedDisplays
  };



  throwEggsToIA = () => {
    let farminglevel = this.state.selectedEggs[0].farming;
    const hitpoints = this.state.IAHitpoints;
    this.setState({ IAHitpoints: hitpoints - farminglevel, selectedEggs : this.state.selectedEggs.slice(1)});
  };

  throwEggsToUser = () => {
    let farminglevel = this.state.selectedEggsIA[0].farming;
    const hitpoints = this.state.userHitpoints;
    this.setState({ userHitpoints: hitpoints - farminglevel, selectedEggsIA : this.state.selectedEggsIA.slice(1) })
  };

  updateArray = (egg) => {
    this.setState(function (prevState) {
      return {
        selectedEggs: this.state.selectedEggs.length === 0 ?
          [egg] : [...prevState.selectedEggs, egg],
      };
    }
    )
  };

  selectEgg = (egg) => {
    this.state.selectedEggs.length < 3 && this.setState({ selectedEggs: [...this.state.selectedEggs, egg],  eggsRandomizedFromApi : this.state.eggsRandomizedFromApi.slice(1) })
    this.state.selectedEggs.length === 2 && this.setState({ isBattlefieldDisplayed: true, areEggsSelected: true })
    !this.state.areEggsSelected && this.setState({ selectedEggsIA: [this.state.eggsRandomizedFromApi[6],
       this.state.eggsRandomizedFromApi[9], this.state.eggsRandomizedFromApi[12]]})
  };

  selectCharacter = (character) => {
    this.state.selectedEggs.length < 1 && this.setState({ isSelectedCharacter: [...this.state.isSelectedCharacter, character] })
    this.state.isSelectedCharacter.length === 0 && this.setState({ isCharacterSelected: true })
    !this.state.isCharacterSelected && this.setState({ isSelectCharacterIA: this.state.charactersRandomizedFromApi[3] })
  }


  render() {
    return (
      <div className="App battleField">


        {!this.state.isCharacterSelected && <Container>
          <Row>
            {this.state.charactersRandomizedFromApi.length === 0 ? <p>loading</p> :
              this.state.charactersRandomizedFromApi.map(
                character => <CharacterChoice key={character.id}
                  character={character} IAName={character} onSelectCharacter={this.selectCharacter} IAHitpoints={this.state.IAHitpoints} />)
            }
          </Row>
        </Container>
        }
        {!this.state.areEggsSelected && <Container>
          <Row>
            {this.state.eggsRandomizedFromApi.length === 0 
            ? <p>loading</p> 
            : this.state.eggsRandomizedFromApi.map(egg => <DisplayEgg key={egg.id} egg={egg} areEggsSelected={this.state.selectedEggs} onSelectEgg={this.selectEgg} />)
            }
          </Row>
        </Container>
        }

        {this.state.areEggsSelected && <Container fluid>
          <Row>

            <Col xs={2}>
              <div className="user1 d-flex align-items-center bg-dark">
                {this.state.charactersRandomizedFromApi.length === 0 
                  ? <p>Wait</p>
                  : <Ia selectedEggs={this.state.selectedEggs} hitMethod={() => this.throwEggsToIA()} IAHitpoints={this.state.userHitpoints} IAName={this.state.isSelectedCharacter[0]} />} </div></Col>

            <Col xs={2}>
              <div >
                { this.state.selectedEggs.length === 0 && this.state.selectedEggsIA.length === 0
                 ? this.state.userHitpoints > this.state.IAHitpoints 
                 ? <h1 className="endMessage">Bravo {this.state.isSelectedCharacter.name} vous avez gagné !</h1>
                 : <h1 className="endMessage">Dommage {this.state.isSelectedCharacter.name} vous avez perdu !</h1> 
                 : this.state.selectedEggs.length === 0 
                 ? <p className="noMoreEggs">No more Eggs !</p> : this.state.selectedEggs.map(egg => <DisplayEgg key={egg.id} egg={egg} onSelectEgg={console.log("coucou")} />)}  </div></Col>
            
            <Col offset={4} />

            <Col xs={2}>
              <div>{this.state.selectedEggs.length === 0 && this.state.selectedEggsIA.length === 0
                  ? <p>Nice</p> 
                  : this.state.selectedEggsIA.length === 0 
                  ? <p className="noMoreEggs">No more Eggs !</p> 
                  : this.state.selectedEggsIA.map(egg => <DisplayEgg key={egg.id} egg={egg} onSelectEgg={console.log("coucou")} />)}  </div></Col>
            
            <Col xs={2}>
              <div className="user2 d-flex align-items-center bg-dark">{this.state.charactersRandomizedFromApi.length === 0 ? <p>Wait</p>
                : <Ia selectedEggs={this.state.selectedEggsIA}hitMethod={() => this.throwEggsToUser()} IAHitpoints={this.state.IAHitpoints} IAName={this.state.isSelectCharacterIA} />} </div></Col>

          </Row>
        </Container>
        }


      </div>
    );
  }
}

export default App;
