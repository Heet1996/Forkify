//https://www.food2fork.com/api/search

//378ef23321788deb13758dc2fd450344

// Global State:
// 1)Shopping List object
// 2)search object
// 3)liked recipe
// 4)current recipe object


import Search from "./model/Search";
import Recipe from "./model/Recipe";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements,renderLoader,clearLoader} from './views/dom';

const state={ };


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
    searchView.renderView(state.search.result);
    }
    catch(err)
    {   clearLoader();
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
    
    if(id){
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
    recipeView.renderRecipe(state.recipe);

        
    }
    catch(err){
        alert("Error while loading Messages :(");
        console.log(err);
    }
    }
    
}

['hashchange','load'].forEach((event)=>window.addEventListener(event,controlRecipe));
