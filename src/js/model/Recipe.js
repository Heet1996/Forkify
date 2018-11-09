import axios from 'axios';
import {key,url} from '../config';
export default class Recipe
{
    constructor(id)
    {
        this.id=id;
    }
    async getRecipe()
    {   
        try{
            const recipe=await axios(`${url}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title=recipe.data.recipe.title;
            this.author=recipe.data.recipe.publisher;
            this.img=recipe.data.recipe.image_url;
            this.url=recipe.data.recipe.source_url;
            this.ingredients=recipe.data.recipe.ingredients;   
            }
         catch(error){
            console.log(error); 
            alert(`Something went wrong :(`);
         }   

    }
    calcTime()
    {
        this.time=Math.ceil((this.ingredients.length/3)*15);

    }
    calcServings()
    {
        this.servings=4;
    }
} 