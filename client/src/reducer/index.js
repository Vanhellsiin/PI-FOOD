
// Creo el estado inicial
// Estado global
const initialState = {
    recipes : [],
    allRecipe: [],
    types: [],
    detail:[]

}


function rootReducer (state= initialState, action ) {
    switch(action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipe: action.payload
             } 
        case 'GET_NAME_RECIPES':
            return{
                ...state,
                recipes: action.payload
            }
        case 'FILTER_BY_DIETS':
            let allRecipes = [...state.allRecipe];
            let dietsFiltered = action.payload === 'All' ? allRecipes : allRecipes.filter(el => el.diets?.includes(action.payload))
            //console.log(dietsFiltered)
             
            return{
                ...state,
                recipes: dietsFiltered
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'POST_RECIPE':
            return{
                ...state,
            }
        case 'ORDER_BY_NAME':
            let sortArr = action.payload === 'asc' ?
            state.recipes.sort(function (a,b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.recipes.sort(function (a,b){
                if(a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                recipes: sortArr
            }
            case "ORDER_BY_SCORE":
                let sortArre = action.payload === 'low' ?
                state.recipes.sort(function (a,b){
                    if (a.score > b.score) {
                        return 1;
                    }
                    if (b.score > a.score){
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a,b){
                    if(a.score > b.score){
                        return -1;
                    }
                    if (b.score > a.score){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    recipes: sortArre
                }

            case "GET_DETAILS":
                return{
                    ...state,
                    detail: action.payload[0]
                }
    
             default:
                return state;

    }   
}
export default rootReducer;