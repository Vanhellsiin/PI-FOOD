import axios from "axios";




// conecto back y front.




export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes", {});
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}



// export function getRecipes(){
//   return function(dispacth){
//     return axios.get("http://localhost:3001/recipes")
//       .then(json =>{
//         dispacth({ type: "GET_RECIPES", payload: json.data})
//       })
//       .catch(error =>{
//         console.log(error)
//       })
//   }
// }






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
  return async function () {
    var data = await axios.post("http://localhost:3001/recipes", payload);
    return data;
  };
}






export function filterRecipesByDiets(payload) {

  //console.log(payload)
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}





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






export function getNameRecipes(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/recipes?name=" + name);
      return dispatch({
        type: "GET_NAME_RECIPES",
        payload: json.data, // personaje filtrado ( el que escribi en la barra de busqueda).
      });
    } catch (error) {
      console.log(error);
    }
  };
}





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
