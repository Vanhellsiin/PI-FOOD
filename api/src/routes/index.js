const { Router } = require('express');
const axios = require ('axios');
const { Recipe, Diet } = require ('../db')
const { API_KEY } = process.env
//const Sequelize = require('sequelize');
//const Op = Sequelize.Op;



const router = Router();



const getApiInfo = async () => {
    try{
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const apiInfo = await apiUrl.data.results.map(info => {      // me traigo solo la data que necesito de la api.
            return {
                title : info.title,
                id : info.id,
                resume : info.summary,
                score : info.spoonacularScore,
                healtScore : info.healtScore,
                stepByStep : info.analyzedInstructions.map(e => e.steps.map(e => e.step)),
                image : info.image,
                diets : info.diets.map((diet) => diet)
            };
        });
        return apiInfo;       // me retorna solo la info de la api que pedi.

    } catch(err){
        console.log(err)
    } 
};




const getDbInfo = async () => {        // me traigo los datos de la base de datos
    return await Recipe.findAll({
        include:{
           model : Diet,
           attributes: ['name'],
           through: {
               attributes : [],
           }

        }
    })
};






const getAllRecipes = async () => {       // concateno los datos de api + db.
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const total = apiInfo.concat(dbInfo);
    return total
}






//RUTEO-------------------------------x--------------------------------






router.get("/recipes", async (req,res,next) => {     // pido las recetas por query
    try {
        const title = req.query.title
        const allRecipes = await getAllRecipes()
        if(title){
             let recipeName = allRecipes.filter(el => el.title.toLowerCase().includes(title.toLowerCase()))
            if(recipeName.length){
                res.status(200).send(recipeName)
            } else {
                res.status(404).send("Recipe doesn´t exist")  
            }
        } else {
            res.status(200).send(allRecipes)
        }

    } catch (error) {
        next(error)
    }
});




router.get('/recipes/:id', async (req, res) =>{
    const id = req.params.id; //la hago utilizando params
    const allRecipe = await getAllRecipes();
    if(id){
       const fillRecipe = await allRecipe.filter(element => element.id.toString() === id);
       fillRecipe.length ?
        res.status(200).json(fillRecipe) :
        res.status(404).send("Recipe doesn't exist");
    }
    
})




router.get('/types', async (req, res) => {
    const allData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`); 
    const diet = allData.data.results.map(el => el.diets) //traigo todos los datos y le aplico un map y armo un array nuevo con las dietas.
    const diet2 = []
    diet.map(d2 => {                                 //mapeo las dietas y pusheo
         for(var i=0;i<d2.length; i++){
                 diet2.push(d2[i]); 
                 //return d2[i];
         }
     })
    diet2.forEach(element => {
       if(element){     
        Diet.findOrCreate({        //le pregunto si lo encontro o si lo creo
              where: {name: element}
       })
    }
    });
    const allDiet = await Diet.findAll();
    res.json(allDiet);

})





router.post("/recipe", async (req, res) => {
    const {
        name,
        img,
        summary,
        score,
        healthScore,
        step,
        diets,
        dishType,
        createdInDb,
    } = req.body;
    try {
        const dietcreated = await Recipe.create({
            name,
            img,
            summary,
            score,
            healthScore,
            step,
            diets,
            dishType,
            createdInDb,
        });

        const dietDB = await Diet.findAll({
            where: {
                name: diets
            }
        })

        await dietcreated.addDiet(dietDB)

        res.send("se creo receta")

    } catch (error) {
        console.log(error)
        res.status('404').json('error')
    }
});






module.exports = router;
