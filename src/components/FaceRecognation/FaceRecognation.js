import React from 'react';
import './FaceRecognation.css';

const FaceRecognation = ({ IMAGE_URL,box }) =>{
    return(
        <div className='center ma'>
            <div className = 'absolute mt2'>
            <img id='Inputimage' alt = '' src={IMAGE_URL} width = '500px' height='auto'></img>
            <div className = 'bounding-box' style = {{top : box.topRow,right : box.rightCol, bottom : box.bottomRow, left : box.leftCol}}></div>
        </div>
        </div>
    );



}


export default FaceRecognation;