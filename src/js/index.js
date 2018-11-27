//https://www.food2fork.com/api/search

//378ef23321788deb13758dc2fd450344

// Global State:
// 1)Shopping List object
// 2)search object
// 3)liked recipe
// 4)current recipe object


import Search from "./model/Search";
import Recipe from "./model/Recipe";
import List from "./model/List";
import { Like } from "./model/Like";

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';

import {elements,renderLoader,clearLoader} from './views/dom';


const state={ };
window.state=state;

//Seacrh Controller 
const searchController=async ()=>{
    //1.New query
    let query=searchView.getInput();
    //2.Getting the Search object
    state.search=new Search(query);
    //3.Loading the View
    searchView.clearFields();
    searchView.clearSearch();
    renderLoader(elements.recipeSearch);
    try{
    //4.Getting the result
    await state.search.getResults();
    clearLoader();
    //5.Rendering to UI
    console.log(state.search.result);
    searchView.renderView(state.search.result);
    }
    catch(err)
    {   clearLoader();
        console.log(err);
        alert("Couldn't fetch the list");
        
    }
  };

//Adding listener to Serach box
elements.searchBox.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    searchController();
});

elements.resultPages.addEventListener('click',(e)=>{
    const btn=e.target.closest('.btn-inline');
    if(btn)
    {
        const goToPage=parseInt(btn.dataset.goto,10);
        searchView.clearSearch();
        searchView.renderView(state.search.result,goToPage);
    }
});


//Recipe Controller

const controlRecipe=async ()=>{
    //0.Prepare Ui for changes
    recipeView.clearFields();
    renderLoader(elements.recipeView);
    
    //1.Take the id
    const id=window.location.hash.replace('#','');
    
    if(state.search) searchView.highlightSelected(id);
    if(id){
    //Highlight the recipe    
    
    //2.Getting the click object
    
    state.recipe=new Recipe(id);
    
    //3.Get the recipe data
    try{
    await state.recipe.getRecipe();
    //4.Calculating time and servings
    
    state.recipe.calcTime();
    state.recipe.calcServings();
    
    state.recipe.parseIngredients();
    //5.Render the recipe
    clearLoader(); 
    recipeView.renderRecipe(state.recipe,state.like.isLike(id));

        
    }
    catch(err){
        alert("Error while loading Messages :(");
        console.log(err);
    }
    }
    
}
['hashchange','load'].forEach((event)=>window.addEventListener(event,controlRecipe));

 //Contrller for List
 const controlList=()=>{
     //1.Creating the new list
     if(!state.list) state.list=new List();
     //2.Creating the event while adding into shopping list
     state.recipe.ingredients.forEach((el)=>{
     const item=state.list.addItem(el.count,el.unit,el.ingredient);
     listView.createList(item);
     });
    };
  //Controller for Like
  //Testing
  if(!state.like) state.like=new Like();
  //Displaying wishlist
  likeView.toogleLikeList(state.like.getLikes());
  const controlLike=()=>{
      //Taking the id
      const currentId=state.recipe.id;
      //Creating the object
      
      //If the recipe is not like
      if(!state.like.isLike(currentId))
      { //Add to like state
        const likeRecipe=state.like.addLikeItem(currentId,state.recipe.title,state.recipe.author,state.recipe.img);
        //Toggle the like button
        likeView.toogleLikeBtn(true);
        //Update the UI
        likeView.renderLike(likeRecipe);
        
        
      }
      //recipe is like
      else{
        //Remove the like button 
        state.like.deleteLikeItem(currentId);
        //Toogle like button
        likeView.toogleLikeBtn(false);
        //Update on UI
        likeView.deleteItem(currentId);        
      }
        //Displaying wishlist
    likeView.toogleLikeList(state.like.getLikes());

  }
 //Handling delete and update item list
    elements.addListItem.addEventListener('click',e=>{
        //Take the ingredient id which was been click 
        const id=e.target.closest('.shopping__item').dataset.itemid;
        //Delete the item
        if(e.target.matches('.shopping__delete , .shopping__delete *'))
        {
            //1.Delete from the state
            state.list.deleteItem(id);
            //2.Delete it from the view
            listView.deleteList(id);
        }
        else if(e.target.matches('.shopping__count-value'))
        {
            //Get the count
            const count=e.target.value;
            state.list.updateList(id,count);
        }
    });

//Handling recipe button clicks
elements.recipeView.addEventListener('click',e=>{
    if(e.target.matches('.btn-decrease , .btn-decrease *')) //btn decrease or any child close to it (We can't use target.closest as there are more than one selectors)
    {
       //Decrease button is click
       if(state.recipe.servings>1)
       {state.recipe.updateServings('dec');
           //Updating on the view
       recipeView.updateServingsIngredients(state.recipe);
       }
    }else if(e.target.matches('.btn-increase , .btn-increase *'))
    {
       //Increase button is clik
       state.recipe.updateServings('inc');
           //Updating on the view
       recipeView.updateServingsIngredients(state.recipe);
    }else if(e.target.matches('.recipe__btn--add,.recipe__btn--add *'))
    {
       controlList();
    }
    else if(e.target.matches('.recipe__love,.recipe__love *'))
    {
        controlLike();
    }


});