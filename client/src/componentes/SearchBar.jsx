import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";
import './SearchBar.css'

// Siempre usamos esta logica para imputs de busqueda.


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
        <br />
        <button type='submit' onClick={(e) => handleSubmit(e)}className="btnsearch">Search</button>
    </div>
 )
}