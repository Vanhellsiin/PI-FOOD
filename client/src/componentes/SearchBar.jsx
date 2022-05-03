import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";

export default function Search(){
 const dispatch = useDispatch(); 
 const [name,setName] = useState("")

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameRecipes(name))

}

 return(

    <div>
        <input 
        type= 'text'
        placeholder="Search Recipe..."
        onChange={(e) => handleInputChange(e)} className="search"/>

    <button type='submit' onClick={(e) => handleSubmit(e)}className="btnsearch">Search</button>
    </div>
 )

}