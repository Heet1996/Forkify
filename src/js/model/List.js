import uniqid from 'uniqid';
export default class List
{
    constructor()
    {
        this.items=[];
    }
    addItem(count,unit,ingredient)
    {   
        let item={
            id:new uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }
    deleteItem(id)
    {
        //Search the item
        const itemIndex=this.items.findIndex((el)=>el.id==id);
        //Delete the item
        this.items.splice(itemIndex,1);
    }
    updateList(id,newCount)
    {   //will return element which needs to be find
        this.items.find(el=>el.id==id).count=newCount;
    }
}