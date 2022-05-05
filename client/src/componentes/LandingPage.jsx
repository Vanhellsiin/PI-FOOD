import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return (
        <div className='Landback'>
            <h1 className='title'>Welcome to my Food Page</h1>
            <Link to = '/home'>
                    <button className='button'>Ready to Go?</button> 
            </Link>    
        </div>


    )
}