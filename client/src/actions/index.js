import axios from "axios";




//Me traigo las recetas desde el back, conecto back y front.
export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes", {});
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}




//Me traigo los tipos de dietas.
export function getTypes() {
  return async function (dispacth) {
    var json = await axios.get("http://localhost:3001/types");
    return dispacth({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}


//Me creo una receta.
export function postRecipe(payload) {
  return async function (dispacth) {
    var data = await axios.post("http://localhost:3001/recipes", payload);
    return data;
  };
}




//Ordeno por tipo de dieta.

export function filterRecipesByDiets(payload) {
  // el payload es el valor que me va a llegar.
  //console.log(payload)
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}



//Ordeno por alfabeticamente.

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}




//Ordeno por puntaje.
export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload,
  };
}





//Me traigo la receta por nombre ( con esto puedo hacer la busqueda ).
export function getNameRecipes(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/recipes?name=" + name);
      return dispatch({
        type: "GET_NAME_RECIPES",
        payload: json.data, // me trae el personaje filtrado ( el que escribi en la barra de busqueda). es lo que devuelve la ruta a la que le pego.
      });
    } catch (error) {
      console.log(error);
    }
  };
}




//Me traigo la receta por id.
export function getDetail(id) {
  return async function (dispacth) {
    try {
      var json = await axios.get("http://localhost:3001/recipes/" + id);
      return dispacth({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
