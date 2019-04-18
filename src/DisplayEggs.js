import React from 'react'
import "./DisplayEggs.css";
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';

const DisplayEggs = ({eggs}) => {
    return (
        <article className='card'>
                <Col>
                    <Card body inverse color="warning">
                        <img src={eggs.image} alt={eggs.name} className ="egg"/>
                        <CardTitle className = "eggsTitle">{eggs.name}</CardTitle>
                        <CardText className = "eggsText">Attack Points: {eggs.farming}</CardText>
                        <Button color="secondary">Select</Button>
                    </Card>
                </Col>
        </article>
    )
}

export default DisplayEggs;