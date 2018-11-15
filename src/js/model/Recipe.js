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
    parseIngredients()
    {
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const newIngredients=this.ingredients.map((element)=>{
            //1.Uniform units
            let ingredient=element.toLowerCase();
            unitLong.forEach((unit,i)=>{
                ingredient=ingredient.replace(unit,unitShort[i]);
            });
            //2.Remove the paranthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            
            //3.parse ingredients into count,unit and ingredient
            const arrIngred=ingredient.split(' ');
            const arrIndex=arrIngred.findIndex(el=>unitShort.includes(el)); 
            let objIng;
            
            if(arrIndex>-1)
            {   const arrCount =arrIngred.slice(0,arrIndex);
                let count;
                //unit is present and 1 value is there before
                if(arrCount.length==1)
                {
                    count=eval(arrIngred[0].replace('-','+'));
                }
                //unit is present and 2 values are there before
                else{
                    count=eval(arrIngred.slice(0,arrIndex).join('+'));
                }
                objIng={
                    count,
                    unit:arrIngred[arrIndex],
                    ingredient:arrIngred.slice(arrIndex+1).join(' ')
                }
            }
            else if(parseInt(arrIngred[0],10))
            {
                //unit is not present and first number is present.
                objIng={
                    count:parseInt(arrIngred[0],10),
                    unit:'',
                    ingredient:arrIngred.slice(1).join(' ')
                }
            }   
            else if(arrIndex==-1)
            {
                //There is no unit and no number in 1st position.
                objIng={
                    count:1,
                    unit:'',
                    ingredient:arrIngred.join(' ')
                }
            }
             return objIng;
        });

        this.ingredients=newIngredients;
        console.log(this.ingredients);

    }
} 