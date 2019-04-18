import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './UserCard.css';

const Ia = ({ IAName }) => {
    return (
        <section className='card text-white bg-dark mb-3'>
            <div className='picture'><img src={IAName[0].image} className="card-img-top img-fluid" alt={IAName[0].name} /></div>
            <p>{IAName[0].name}</p>
            <Container>
                <Row>
                    <Col><img src="https://i.pinimg.com/originals/d3/65/d8/d365d88fb1a2d967df2efce34f80fbce.png" className="life" alt="life" /></Col>
                    <Col><p>20</p></Col>
                </Row>
            </Container>
        </section>
    );
}

export default Ia;
