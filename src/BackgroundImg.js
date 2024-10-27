import {React} from 'react';

import Slide2 from './images/Slide 2.png';
import Slide3 from './images/Slide 3.png';
import Slide4 from './images/Slide 4.jpg';
import Slide5 from './images/Slide 5.png';
import Slide6 from './images/Slide 6.png';
import Slide7 from './images/Slide 7.png';
import Slide8 from './images/Slide 8.png';
import Slide9 from './images/Slide 9.png';
import Slide10 from './images/Slide 10.png';
import Slide11 from './images/Slide 11.png';
import Slide12 from './images/Slide 12.png';
import Slide13 from './images/Slide 13.png';

import './BackgroundImg.css';

export default function BackgroundImg({slide}) {   
    console.log("slide is " + slide);

    const imgArray = [null, null, Slide2, Slide3, Slide4, Slide4, Slide5, Slide6, Slide6, Slide7,
                     Slide8, Slide9, Slide10, Slide11, Slide12, Slide12, Slide12, Slide12, Slide12, Slide12, Slide13]; 
    return (
        <div className="back-cont">
            <img className="background" src={imgArray[slide]} alt="no image found" />
        </div>
    );
}