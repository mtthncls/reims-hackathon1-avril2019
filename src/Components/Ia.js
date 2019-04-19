import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
const Ia = ({hitMethod, IAName, IAHitpoints, selectedEggs, displayNoneButton}) => {
    return ( 
        <section className='card text-white bg-dark mb-3'>
            <Container>
                <Row>
                    <div className='picture'><img src={IAName.image} className="card-img-top" alt={IAName.name}/></div>
                    <p>{IAName.name}</p>  
                    <Col><img src="https://i.pinimg.com/originals/d3/65/d8/d365d88fb1a2d967df2efce34f80fbce.png" className="life" alt="life"/></Col>
                    <Col><p>{IAHitpoints}</p></Col>
                    {displayNoneButton && selectedEggs.length > 0 && <Button onClick={hitMethod}>Hit the opponent !</Button>}
                </Row>
            </Container>
        </section>
    );
}

export default Ia;
