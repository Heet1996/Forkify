import {elements} from './dom';
export const getInput=()=>elements.inputField.value;
const render=(recipe)=>{
    let mark=`<li>
    <a class="results__link" href="#23456">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
elements.recipeList.insertAdjacentHTML('beforeend',mark);
}
const limitTitle=(title,limit=17)=>{
    const newTitle=[];
    if(title.length>limit)
    {
        title.split(' ').reduce((acc,cur)=>{
        if(acc+cur.length<17)
        {
            newTitle.push(cur);
        }
        return acc+cur.length;
    },0);
    return `${newTitle.join(' ')} ...`;

     }
return title;
}
const showButton=(page,type)=>`  
<button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? page-1 : page+1}>
    <span>Page ${type==='prev' ? page-1 : page+1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left' : 'right'}"></use>
    </svg>
</button>`
const renderPageBtn=(page,numPage,resultPerPage)=>{
    const pages=Math.ceil(numPage/resultPerPage);
    let createButton;
    if(page==1 && pages>1)
    {
        //Only Button to go for next page
        createButton=showButton(page,'next');
    }
    else if(page==pages && pages>1)
    {
        //only button to go for previous page
        createButton=showButton(page,'prev');
    }
    else if(page>1)
    {
        //both the buttons
        createButton=`${showButton(page,'prev')}${showButton(page,'next')}`;
    }
    elements.resultPages.insertAdjacentHTML('afterbegin',createButton);
}
export const renderView=(renderArray,page=1,numResult=10)=>{
    const start=(page-1)*numResult;
    const end=page*numResult;
    renderArray.slice(start,end).forEach(element => render(element));
    renderPageBtn(page,renderArray.length,numResult);

};
export const clearFields=()=>{
    
    elements.inputField.value='';
};
export const clearSearch=()=>{
    elements.recipeList.innerHTML=' ';
    elements.resultPages.innerHTML=' ';
}
