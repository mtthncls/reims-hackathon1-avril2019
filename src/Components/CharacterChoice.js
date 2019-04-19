import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import "./CharacterChoice.css"

const CharacterChoice = ({IAName, IAHitpoints, hitMethod, onSelectCharacter, character}) => {
    return (
        <section className='card text-white bg-dark mb-3'>
            <Container onClick={() => onSelectCharacter(character)}>
                <Row>
                    <div className='picture'><img src={IAName.image} className="card-img-top" alt={IAName.name}/></div>
                    <p>{IAName.name}</p>  
                    <Col><img src="https://i.pinimg.com/originals/d3/65/d8/d365d88fb1a2d967df2efce34f80fbce.png" className="life" alt="life"/></Col>
                    <Col><p>{IAHitpoints}</p></Col>
                    <button onClick={hitMethod} className="hitButton">Hit the opponent !</button>
                </Row>
            </Container>
        </section>
    )
}


export default CharacterChoice