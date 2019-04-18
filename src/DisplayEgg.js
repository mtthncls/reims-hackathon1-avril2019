import React from 'react'
import "./DisplayEgg.css";
import { Card, CardTitle, CardText, Col } from 'reactstrap';

const DisplayEgg = ({ egg, onSelectEgg }) => {
    return (
        <article className='card'>
            <Col>
                <Card onClick={() => onSelectEgg(egg)} body inverse color="warning">
                    <img src={egg.image} alt={egg.name} className="egg" />
                    <CardTitle className="eggsTitle">{egg.name}</CardTitle>
                    <CardText className="eggsText">Attack Points: {egg.farming}</CardText>
                </Card>
            </Col>
        </article>
    )
}

export default DisplayEgg;
