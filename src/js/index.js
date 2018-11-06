//https://www.food2fork.com/api/search

//378ef23321788deb13758dc2fd450344

// Global State:
// 1)Shopping List object
// 2)search object
// 3)liked recipe
// 4)current recipe object

global._babelPolyfill = false;
import Search from "./model/Search";
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/dom';
const state={ };

const searchController=async ()=>{
    //1.New query
    let query=searchView.getInput();
    //2.Getting the Search object
    state.search=new Search(query);
    //3.Loading the View
    searchView.clearFields();
    searchView.clearSearch();
    renderLoader(elements.recipeSearch);
    //4.Getting the result
    await state.search.getResults();
    clearLoader();
    //5.Rendering to UI
    searchView.renderView(state.search.result);
  };

//Adding listener to Serach box
elements.searchBox.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchController();
});



