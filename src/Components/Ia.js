import React from 'react';

const Ia = ({IAName}) => {
    return ( 
        <article>
            <ul>
                <li>{IAName[0].name}</li>
                <li><img src={IAName[0].image} alt={IAName[0].name}></img></li>
            </ul>
        </article>
     );
}
 
export default Ia;