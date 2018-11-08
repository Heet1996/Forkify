export const elements={
    inputField:document.querySelector('.search__field'),
    searchBox:document.querySelector('.search'),
    recipeList:document.querySelector('.results__list'),
    recipeSearch:document.querySelector('.results'),
    resultPages:document.querySelector('.results__pages')
};
export const elementString={
    loader:'loader'
}
export const clearLoader=()=>{
    const loader=document.querySelector(`.${elementString.loader}`);
    if(loader)
    elements.recipeSearch.removeChild(loader);

}
export const renderLoader=(parent)=>{
    const loader=`<div class="${elementString.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>`;
parent.insertAdjacentHTML('afterbegin',loader);
}
