import React from 'react';
import './UserCard.css';
import { Container, Row, Col } from 'reactstrap';

const UserCard = ({ image, name }) => {
    return(
        <section className='card text-white bg-dark mb-3'>
        <div className='picture'><img src="https://images.innoveduc.fr/easter_hackathon/1.jpeg" className="card-img-top" alt={name}/></div>
        <p>Rick Sanchez</p>       
        <Container>
            <Row>
                <Col><img src="https://i.pinimg.com/originals/d3/65/d8/d365d88fb1a2d967df2efce34f80fbce.png" className="life" alt="life"/></Col>
                <Col><p>20</p></Col>
            </Row>
        </Container>
        </section>
    )
}

export default UserCard
