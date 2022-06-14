const { Router } = require('express');
const axios = require ('axios');
const { Recipe, Diet } = require ('../db')
const { API_KEY } = process.env




const router = Router();



const getApiInfo = async () => {
    try{
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0d93ddd483744a09bfb62d78be366df4&addRecipeInformation=true&number=50`);
        const apiInfo = await apiUrl.data.results.map(info => { 
            console.log(info)     // me traigo solo la data que necesito de la api.
            return {
                name : info.title,
                id : info.id,
                dishType: info.dishTypes.map((e) => e),
                summary : info.summary,
                score : info.score,
                healthScore : info.healthScore,
                step : info.analyzedInstructions.map(e => e.steps.map(e => e.step)),
                img : info.image,
                diets : info.diets.map((diet) => diet)
            };
        });
        return apiInfo;       

    } catch(err){
        console.log(err)
    }
};








const getDbInfo = async () => {        
    try {
        let data = await Recipe.findAll({
          include: {
            model: Diet,
            attributes: ["name"],   // Me traigo el modelo de diet mediante el atributo name.
            through: {
              attributes: [],
            },
          },
        });
        return data;
      } catch (error) {}
    };






const getAllRecipes = async () => {       
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const total = apiInfo.concat(dbInfo);
    return total
}






//RUTEO-------------------------------x--------------------------------










router.get('/recipes', async (req, res) => {
    let name = req.query.name      
    const recipesTotal = await getAllRecipes();
    if (name) {
        const recipeName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
            res.status(200).json(recipeName) :
            res.status(404).send('No se encuentra la receta');
    } else {
        res.status(200).json(recipesTotal)  // si no me pasaron un name por query, devuelvo todo!
    }

})





router.get('/recipes/:id', async (req, res) =>{
    const id = req.params.id; 
    const allRecipe = await getAllRecipes();
    if(id){
       const recipeId = allRecipe.filter(element => element.id.toString() === id);
       recipeId.length ?
        res.status(200).json(recipeId) :
        res.status(404).send("La receta no existe");
    }
    
})




// me traigo toda la info. la mapeo y obtengo los array de dietas. vuevlo a mapear  para obtener las dietas individuales.
router.get('/types', async (req, res) => {
    const alltypes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=26d5763899234397a365874505290732&addRecipeInformation=true&number=100`); 
    const diet = alltypes.data.results.map(el => el.diets) // Este map me va a devolver varios arreglos con los tipos de dieta
    const diet2 = []
    
    diet.map(d2 => {                                 //mapeo los arreglos anteriores, les hago un for para que me devuelva cada uno de los elementos 
         for(var i=0;i<d2.length; i++){
                 diet2.push(d2[i]);      
         }
     })
    diet2.forEach(element => {    
        Diet.findOrCreate({        //por cada elemento, entra a mi modelo Diet y hacele un findOrCreate, si no esta lo creo
              where: {name: element}
       })
    
    });
    const allDiet = Diet.findAll();  // me manda todo
    res.json(allDiet);
    

})





router.post("/recipes", async (req, res) => {
    const {
        name,
        img,
        summary,
        score,
        healthScore,
        step,
        diets,
        createdInDb,
    } = req.body;
    try {
        const dietCreated = await Recipe.create({ 
            name,
            img,
            summary,
            score,
            healthScore,
            step,
            diets,
            createdInDb,
        });

        const dietDB = Diet.findAll({      // la dieta la busco en el modelo Diet y me trae lo que coincide con el diets que yo le estoy pasando por body
            where: {
                name: diets
            }
        })

        dietCreated.addDiet(dietDB) //a la receta creada agregale las dietas que coincidieron con el nombre

        res.send("se creo receta")

    } catch (error) {
        console.log(error)
        res.status('404').json('error')
    }
});


router.post('/.createdieta' ,(req, res)=>{
    const as = req.body
    const dietCreate = Diet.create({name: as.name})
    
})




module.exports = router;
