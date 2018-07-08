import React from 'react';
import './Demographics.css';

const showpage=()=>{
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

const Demographics=({age,ageValue, gender, genderValue, multicultural, multiculturalValue})=>{
    return (
        <div id='content' className='ma'>
            <div id='resultBox' className='absolute mt2' onLoad={setTimeout(showpage, 3000)}>
                <div id="loader"></div>
                <div style={{display:'none'}} id="myDiv" className="animate-bottom">
                    <ul>
                        <li>Age:{age}, Value:{ageValue}</li>
                        <li>Gender:{gender}, Value:{genderValue}</li>
                        <li>Multicultural appearance:{multicultural},Value:{multiculturalValue}</li>
                    </ul>
                </div> 
            </div>
            
        </div>
    )
}

export default Demographics;

