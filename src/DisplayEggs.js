import React from 'react'
import "./DisplayEggs.css";
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const DisplayEggs = ({image, name, farming}) => {
    return (
        <section className='card'>
                <Card body inverse color="warning">
                    <img src={image} alt={name} className ="egg"/>
                    <CardTitle>Oeuf n°1  {name}</CardTitle>
                    <CardText>Attack Points: {farming}</CardText>
                    <Button color="secondary">Attack</Button>
                </Card>
        </section>
    )
}

export default DisplayEggs;