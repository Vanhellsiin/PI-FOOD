import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./RecipeCreate.css";



export default function RecipeCreate() {
  function Validation(input) {
    let error = { required: false };
    if (!input.name) {
      error.name = "Please enter the name of the recipe";
      error.name = true;
    } else if (!/\S{1,15}[^0-9]/.test(input.name)) {
      error.name = "invalid name";
      error.required = true;
    }
    if (input.summary) {
      error.summary = "the summary of the dish is required";
      error.require = true;
    }
    if (input.score <= 0 || input.score > 100) {
      error.score = "score must be between 0 and 100";
      error.require = true;
    }
    if (input.healthScore <= 0 || input.healthScore > 100) {
      error.healthScore = "healthy score must be between 0 and 100";
      error.require = true;
    }
    if (input.step) {
      error.step = "the step to step of the dish is required";
      error.require = true;
    }

    return error;
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [error, setError] = useState({ required: true });

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
      [e.target.name]: e.target.value,
    });
    let objError = Validation({ ...input, [e.target.name]: e.target.value });
    setError(objError);
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
    console.log(input)
    if( input.img.length === 0){
      input.img = "https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_960_720.jpg"
    }
    dispatch(postRecipe(input));
    alert("Recipe Created");
    setInput({
      name: "",
      summary: "",
      img: "",
      score: "",
      healthScore: "",
      step: "",
      diets: [],
    });
    history.push("/home");
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
          {!error.name ? null : <span>{error.name}</span>}
        </div>
        <div>
          <label>Resumen:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          {!error.summary ? null : <span>{error.summary}</span>}
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
          <label>Score:</label>
          <input
            type="number"
            value={input.score}
            name="score"
            onChange={(e) => handleChange(e)}
          />
          {!error.score ? null : <span>{error.score}</span>}
        </div>
        <div>
          <label>Healt Score:</label>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
          {!error.healtScore ? null : <span>{error.healtScore}</span>}
        </div>
        <div>
          <label>Step:</label>
          <input
            type="text"
            value={input.step}
            name="step"
            onChange={(e) => handleChange(e)}
          />
          {!error.step ? null : <span>{error.step}</span>}
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




  //  function handleSelect(e){
  //    setInput({
  //      ...input,
  //      diets: [...input.diets, e.target.value]
  //    })
  //  }


  // function handleDelete(el){
  //   setInput({
  //     ...input,
  //     diet: input.diet.filter( occ => occ !== el)
  //   })
  // }