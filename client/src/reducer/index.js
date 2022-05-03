//Creo el estado inicial

const initialState = {
    recipes : [],
    allRecipes : [],
    Types : [],
    detail: []
}



//"GET_RECIPES"
//"GET_TYPES"
//"GET_NAME_RECIPES"
//"GET_DETAILS"

//"ORDER_BY_NAME"
//"ORDER_BY_SCORE"
//"ORDER_BY_DIETS"



function rootReducer (state = initialState, action){    //Con el switch evaluamos que action llega.
    switch(action.type) {
        case 'GET_RECIPES':
            return{
                ...state,                            //copio el estado actual
                recipes: action.payload,
                allRecipes : action.payload
            }
        case "GET_TYPES":
            return{
                ...state,
                types : action.payload
            }
        case "GET_NAME_RECIPES":
            return{
                ...state,
                recipes : action.payload
            }    
        case "GET_DETAILS":
            return{
                ...state,
                detail : action.payload
            }  
        case "POST_RECIPE":
            return{
                ...state,
            }   
        case "ORDER_BY_NAME":
            let sortArr = action.payload === 'asc' ?
            state.recipes.sort(function (a,b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) : 
            state.recipes.sort (function (a,b){
                if ( a.name > b.name){
                    return -1;    
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                recipes : sortArr
            } 
        case "ORDER_BY_SCORE":
            let sortArre = action.payload === 'low' ?
            state.recipes.sort(function(a,b){
                if(a.score > b.score){
                    return 1;
                }
                if (a.score < b.score){
                    return -1;
                }
                return 0;
            }):
            state.recipes.sort(function (a,b){
                if(a.score > b.score){
                    return -1;
                }
                if(a.score < b.score){
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                recipes : sortArre
            }
        case "ORDER_BY_DIETS":
            let allRecipes = [...state.allRecipes];
            let dietsFiltered = action.payload === 'All' ? allRecipes : allRecipes.filter(el => el.diets?.includes(action.payload))  
            return{
                ...state,
                recipes : dietsFiltered
            } 
        default :
        return state;    
    }       
}


export default rootReducer

