import React from 'react';
import {Button} from 'reactstrap'

const Ia = ({callCharacter,  IAName}) => {
    return ( 
        <article>
            <ul>
                <li>{IAName.One}</li>
            </ul>

        <Button onClick={callCharacter}>Pick a name</Button>
        </article>
     );
}
 
export default Ia;