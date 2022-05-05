import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterRecipesByDiets,
  orderByName,
  orderByScore,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./Card.css";
import "./Home.css";
import Paged from "./Paged";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch(); // uso esta constante para despachar mis acciones.
  const allRecipe = useSelector((state) => state.recipes); // Accede al estado global
  const [orden, setOrden] = useState(""); // dejo el estado vacio y luego lo utilizo en las funciones sort
  const [currentPage, setCurrentPage] = useState(1); // pagina actual, estado local, arranco en la pagina 1
  const [recipesPerPage, setRecipesPerPage] = useState(9); // estado local que va a seter los personajes por pagina, 9 personajes por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage; // 6
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0
  const currentRecipes = allRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe); // Tomo el arreglo de todas las recetas le hago un slice y le digo que tome el indice de la primera receta y el indice de la ultima receta

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  useEffect(() => {
    dispatch(getRecipes());
  }, [] );
  
  

  


  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`orden ${e.target.value}`); // Con esto modifico el estado , para que renderice
  }
  function handleSort2(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value)); // target es una propiedad del evento.
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`);
  }

  function handleFilterDiets(e) {
    //console.log(filterRecipesByDiets(e.target.value))
    dispatch(filterRecipesByDiets(e.target.value));
  }

  return (
    <div className="Nav">
      <div className="createlink">
        <Link to="/recipes">
          <button className="btn">Create Recipe</button>{" "}
        </Link>
        <button className="btn"
          onClick={(e) => {handleClick(e) }}>Reload the Recipes
        </button>
        <Link to="/">
        <button className="btn">Go Back</button>
        </Link>
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
          <Paged
          recipesPerPage={recipesPerPage}
          allRecipe={allRecipe.length}
          paged={paged} />
          <SearchBar />
        </div>
        

        <React.Fragment>
          <div className="container">
            {currentRecipes?.map((el, index) => {
              return (
                <div className="cardContainer" key={index}>
                  <Link to={"/detail/" + el.id}>
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
