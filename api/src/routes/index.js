const { Router } = require('express');
const axios = require ('axios');
const { Recipe, Diet } = require ('../db')
const { API_KEY } = process.env
//const Sequelize = require('sequelize');
//const Op = Sequelize.Op;



const router = Router();



const getApiInfo = async () => {
    try{
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=e415a6e889e54b2b8d2c37f7eb796f3c&addRecipeInformation=true&number=10`);
        const apiInfo = await apiUrl.data.results.map(info => {      // me traigo solo la data que necesito de la api.
            return {
                name : info.title,
                id : info.id,
                dishType: info.dishTypes.map((e) => e),
                summary : info.summary,
                score : info.spoonacularScore,
                healthScore : info.healthScore,
                step : info.analyzedInstructions.map(e => e.steps.map(e => e.step)),
                img : info.image,
                diets : info.diets.map((diet) => diet)
            };
        });
        return apiInfo;       // me retorna solo la info de la api que pedi.

    } catch(err){
        console.log(err)
    }
};




const getDbInfo = async () => {        // me traigo los datos de la base de datos
    try {
        let data = await Recipe.findAll({
          include: {
            model: Diet,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
        return data;
      } catch (error) {}
    };






const getAllRecipes = async () => {       // concateno los datos de api + db.
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const total = apiInfo.concat(dbInfo);
    return total
}






//RUTEO-------------------------------x--------------------------------






router.get('/recipes', async (req, res) => {
    let name = req.query.name
    const nam = await getAllRecipes();
    if (name) {
        const resp = await nam.filter(x => x.name.toLowerCase().includes(name.toLowerCase()))
        resp.length ?
            res.status(200).json(resp) :
            res.status(404).send('no se encuentra la receta');
    } else {
        res.status(200).json(nam)
    }

})



router.get('/recipes/:id',(req, res) =>{
    const id = req.params.id; //la hago utilizando params
      getAllRecipes() // Una promesa
      .then((x) => {if(id){
        console.log(x)
        return x.filter(element => element.id.toString() === id); 
     }})
     .then((a) =>{     // A es el elemento que tenga el id 
        console.log(a)
        a.length ?   // a existe? de ser asi retornalo
        res.status(200).json(a) :
        res.status(404).send("Recipe doesn't exist");
     })
     .catch((error) => {
        res.status(404).send(error)
     })
})





// router.get('/recipes/:id', async (req, res) =>{
//     const id = req.params.id; //la hago utilizando params
//     const allRecipe = await getAllRecipes();
//     if(id){
//        const fillRecipe = await allRecipe.filter(element => element.id.toString() === id);
//        fillRecipe.length ?
//         res.status(200).json(fillRecipe) :
//         res.status(404).send("Recipe doesn't exist");
//     }
    
// })




router.get('/types', async (req, res) => {
    const allData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=26d5763899234397a365874505290732&addRecipeInformation=true&number=100`); 
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
        const dietcreated = await Recipe.create({
            name,
            img,
            summary,
            score,
            healthScore,
            step,
            diets,
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
