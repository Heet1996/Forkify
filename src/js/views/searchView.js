import {elements} from './dom';
export const getInput=()=>elements.inputField.value;
const render=(recipe)=>{
    let mark=`<li>
    <a class="results__link" href="#23456">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
elements.recipeList.insertAdjacentHTML('beforeend',mark);
}
export const renderView=(renderArray)=>{
    renderArray.forEach(element => render(element));
};
export const clearFields=()=>{
    
    elements.inputField.value='';
};
export const clearSearch=()=>{
    elements.recipeList.innerHTML=' ';
}