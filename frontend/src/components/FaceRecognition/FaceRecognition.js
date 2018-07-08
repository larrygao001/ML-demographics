import React from 'react';
import './FaceRecognition.css';

const FaceRecognition=({imageUrl, results})=>{
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt = '' src={imageUrl} width='500px'/>
                <div className='bounding-box' style={{top:results.topRow,right:results.rightCol, left:results.leftCol, bottom:results.bottomRow}}></div>
            </div>
            
        </div>
    )
}
export default FaceRecognition; 

