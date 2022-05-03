import React from "react";
import { useState, useEfect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  orderByName,
  orderByScore,
  filterRecipesByDiets,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
//import "./Card.css";
//import "./Home.css";


export default function Home() {
  const dispatch = useDispatch();
  const allRecipe = useSelector((state) => state.recipes); // me guardo el estado en la constante.
  const [orden, setOrden] = useState(""); // dejo el estado seteado
  const [currentPage, setCurrentpage] = useState(1); // seteo la pagina actual en 1
  const [recipesPerPage, setRecipesPerPage] = useState(9); // seteo los personajes por pagina , 9.
  const indexOfLastRecipe = currentPage * recipesPerPage; // pagina actual por la cantidad de recipientes en dicha pagina
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe); // tomo todas las recetas les hago un slice, y tomo elindice de la primer y la receta y la ultima.

  useEfect(() => {
    dispatch(getRecipes());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentpage(1);
    setOrden(`orden ${e.target.value}`);
  }

  function handleSort2(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentpage(1);
    setOrden(`ordenado ${e.target.value}`);
  }

  function handleFilterDiets(e) {
    dispatch(filterRecipesByDiets(e.target.value));
  }

  return (
    <div className="Nav">
      <div className="createlink">
        <Link to="/recipes">
          <button className="btn">Crear Recipe</button>{" "}
        </Link>
        <button
          onClick={(e) => {handleClick(e)}} >Recarguemos las recetas
        </button>
      </div>
      <h1 className="titlehome"> HEALTHY FOOD </h1>
      <div>
        <div className="search">
          <select onChange={(e) => handleSort(e)} className="selecAZ">
            <option value="asc"> A to Z </option>
            <option value="des"> Z to A </option>
          </select>
          <select onChange={(e) => handleSort2(e)} className="selecScore">
            <option value="low"> For Low Score </option>
            <option value="high"> BY High Score </option>
          </select>
          <select onChange={(e) => handleFilterDiets(e)} className="selecdiet">
            <option value="All">All</option>
            <option value="vegan">Vegan</option>
            <option value="lacto ovo vegetarian">Lacto ovo Vegetarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="gluten free">Gluten free</option>
            <option value="dairy free">Dairy free</option>
            <option value="primal">Primal</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="fodmap friendly">Fodmap Friendly</option>
            <option value="whole 30">whole 30</option>
          </select>
          <SearchBar />
        </div>
        <Paged
          recipesPerPage={recipesPerPage}
          allRecipe={allRecipe.length}
          Paged={Paged}
        />

        <React.Fragment>
          <div className="container">
            {currentRecipes?.map((el, index) => {
              return (
                <div className="cardContainer" key={index}>
                  <Link to={"/Home/" + el.id}>
                    <Card
                      name={el.name}
                      score={el.score}
                      img={el.img}
                      diets={el.diets}
                      createdInDB={el.createdInDB}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}
