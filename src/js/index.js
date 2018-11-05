//https://www.food2fork.com/api/search

//378ef23321788deb13758dc2fd450344

// Global State:
// 1)Shopping List object
// 2)search object
// 3)liked recipe
// 4)current recipe object


import Search from "./model/Search";

let state={ };

const searchController=async ()=>{
    //1.New query
    let query='pizza';
    if(query){
    //2.Getting the Search object
    state.search=new Search(query);
    //3.Loading the View

    //4.Getting the result
    await state.search.getResults();

    //5.Rendering to UI
    console.log(state.search.result);
    }
}

//Adding listener to Serach box
document.querySelector('.search').addEventListener('submit',(e)=>{
    e.preventDefault();
    searchController();
})



search.getResults();