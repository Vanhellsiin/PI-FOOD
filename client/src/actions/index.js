import axios from 'axios';


//Me traigo las recetas desde el back, conecto back y front.

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type : "GET_RECIPES",
            payload : json.data
        })
    }
};



//Me traigo los tipos de dietas.

export function getTypes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/types");
        return dispatch({
            type : "GET_TYPES",
            payload : json.data
        })
    }
}



//Me traigo la receta por nombre ( con esto puedo hacer la busqueda ).

export function getNameRecipes(name){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/recipes?name=" + name);
            return dispatch({
                type : "GET_NAME_RECIPES",
                payload : json.data
            })

        }catch (error){
            console.log(error)

        }
    }
}




//Me traigo la receta por id.

export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/recipes/" + id);
            return dispatch({
                type : "GET_DETAILS",
                payload : json.data
            })

        }catch(error){
            console.log(error)
        }
    }
}



//Me creo una receta.

export function postRecipe(payload){
    return async function(dispatch){
        const data = await axios.get("http://localhost:3001/recipes", payload);
        return data;
    };

}



//Ordeno por alfabeticamente.

export function orderByName (payload){
    return{
        type : "ORDER_BY_NAME",
        payload,
    };
}



//Ordeno por puntaje.

export function orderByScore (payload){
    return{
        type: "ORDER_BY_SCORE",
        payload,
    };
}



//Ordeno por tipo de dieta.

export function filterRecipesByDiets (payload){
    return{
        type : "ORDER_BY_DIETS",
        payload
    };
}




