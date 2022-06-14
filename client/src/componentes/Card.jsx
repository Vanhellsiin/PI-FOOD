import React from "react";
import './Card.css'




export default function Card({ name, img , diets, score }){
    return (
        <div className="Card">
            <h3 className="cardTitle">{name}</h3>
            <h4>Score:{score}</h4>
            <div>{diets.map(x=>{if(typeof x === 'string')return x; 
            else{ return x.name}
            }).join(", ")}</div>
            <img src={img} alt="img not found" className="image" />
        </div>
    )
}