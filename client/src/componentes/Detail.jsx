import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import "./Detail.css"


export default function Detail(props){
    const dispatch = useDispatch()
     
    useEffect(() =>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myRecipe = useSelector((state) => state.detail)
    //console.log(myRecipe[0].name)
    return (
        <div className="detailContainer" >
            { 
                myRecipe.name ?
                <div className="detail">
                    <h1>{myRecipe.name}</h1>
                    <img src={myRecipe.img} alt= "not found image"/>
                    <h2>Dishtype: {myRecipe.dishType}</h2>
                    <h2>Score: {myRecipe.score}</h2>
                    <h2>Health Score: {myRecipe.healthScore}</h2>
                    <h2>Diets: {!myRecipe.createdInDB?myRecipe.diets.join(", "):myRecipe.diets.map(e => e.name).join(", ")}</h2>
                    <h3>Summary: {myRecipe.summary.replace(/<[^>]+>/g, "")}</h3>
                    <h3>Step By Step: {myRecipe.step}</h3>
                    </div> : <p className="loading">...Loading 
                    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gifss.com%2Fprofesiones%2Fcocineros%2Findex2.htm&psig=AOvVaw1ZMrMS7X1xrWmkmfSZ8Eko&ust=1649358187134000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCNDfn56QgPcCFQAAAAAdAAAAABAD" alt="not image" />
                    </p>
            } console.log()
            <Link to= '/home'>
                <button className="button">Volver</button>
            </Link>



        </div>
    )




}