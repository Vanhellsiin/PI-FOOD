import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./RecipeCreate.css";








export default function RecipeCreate() {
  function validate(input) {
    let error = {};
    if (!input.name) {
      error.name = "Please enter the name of the recipe";
    } else if (!input.summary) {
      error.summary = "Summary is required";
    } else if (!input.dishType) {
      error.dishType = "the disshType of the dish is required";
    } else if (input.score <= 0 || input.score > 100) {
      error.score = "score must be between 0 and 100";
    } else if (input.healthScore <= 0 || input.healthScore > 100) {
      error.healthScore = "healthy score must be between 0 and 100";
    } else if (!input.step) {
      error.step = "the step to step of the dish is required";
    } 
    return error;  
    }
    




  const dispatch = useDispatch();
  const history = useHistory();
  // const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({ });
  const [input, setInput] = useState({
    name: "",
    summary: "",
    img: "",
    dishType: "",
    score: "",
    healthScore: "",
    step: "",
    diets: [],
  });






  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,  //va tomando el nombre de cada prop, me vaya llenando el estado
    })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value

    }));
   }




  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }





  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(input))
    const error = validate(input)
    if(Object.values(error).length !== 0){
      alert('Corregir errores')
    }else{dispatch(postRecipe(input));
      alert("Recipe Created");
      setInput({    //seteo el input en "vacio"
        name: "",
        summary: "",
        img: "",
        dishType: "",
        score: "",
        healthScore: "",
        step: "",
        diets: [],
      });
      history.push("/home");}
    
  }




  useEffect(() => {
    dispatch(getTypes());
  }, []);




  return (
    <div className="containerRecipe">
      <Link to="/home">
        <button>Volver</button>{" "}
      </Link>
      <h1 className="titleCR">Crea tu Receta</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="list-item">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (<span className ='error'> {errors.name}</span>)}
        </div>
        <div>
          <label>Sumary:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          {errors.summary && (<span className ='error'> {errors.summary}</span>)}
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>dishType:</label>
          <input
            type="text"
            value={input.dishType}
            name="dishType"
            onChange={(e) => handleChange(e)}
          />
          {errors.dishType && (<span className ='error'> {errors.dishType}</span>)}
        </div>
        <div>
          <label>Score:</label>
          <input
            type="number"
            value={input.score}
            name="score"
            onChange={(e) => handleChange(e)}
          />
          {errors.score && (<span className ='error'> {errors.score}</span>)}
        </div>
        <div>
          <label>Health Score:</label>
          <input
            type="number"
            value={input.healtScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
          {errors.healthScore && (<span className ='error'> {errors.healthScore}</span>)}
        </div>
        <div>
          <label>Step:</label>
          <input
            type="text"
            value={input.step}
            name="step"
            onChange={(e) => handleChange(e)}
          />
          {errors.step && (<span className ='error'> {errors.step}</span>)}
        </div>
        <div>
          <label>Types:</label>
          <label>
            <input
              type="checkbox"
              name="pescatarian"
              value="pescatarian"
              onChange={(e) => handleCheck(e)}
            />
            Pescatarian
          </label>
          <label>
            <input
              type="checkbox"
              name="gluten free"
              value="gluten free"
              onChange={(e) => handleCheck(e)}
            />
            gluten free
          </label>
          <label>
            <input
              type="checkbox"
              name=" dairy free"
              value=" dairy free"
              onChange={(e) => handleCheck(e)}
            />{" "}
            dairy free
          </label>
          <label>
            <input
              type="checkbox"
              name="lacto ovo vegetarian"
              value="lacto ovo vegetarian"
              onChange={(e) => handleCheck(e)}
            />
            lacto ovo vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              name="vegan"
              value="vegan"
              onChange={(e) => handleCheck(e)}
            />
            vegan
          </label>
          <label>
            <input
              type="checkbox"
              name="paleolithic"
              value="paleolithic"
              onChange={(e) => handleCheck(e)}
            />
            paleolithic
          </label>
          <label>
            <input
              type="checkbox"
              name="fodmap friendly"
              value="fodmap friendly"
              onChange={(e) => handleCheck(e)}
            />
            fodmap friendly
          </label>
          <label>
            <input
              type="checkbox"
              name="whole 30"
              value="whole 30"
              onChange={(e) => handleCheck(e)}
            />
            whole 30
          </label>

          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </div>
  );
}
