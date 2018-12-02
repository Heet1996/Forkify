export class Like
{
    constructor()
    {
        this.likes=[];
    }
    addLikeItem(id,title,author,img)
    {
        const like={id,title,author,img};
        this.likes.push(like);
        this.persistentLikes();
        return like;
    }
    deleteLikeItem(id)
    {
        const index=this.likes.findIndex(el=>el.id==id);
        this.likes.splice(index,1);
        
    } 
    persistentLikes()
    {
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }
    readStorage(){
        const storage=JSON.parse(localStorage.getItem('likes'));
        //Restore from local storage
        if(storage) this.likes=storage;
        
    }
    isLike(id)
    {
        return this.likes.findIndex((el)=>el.id==id) !==-1;
    }
    getLikes()
    {
        return this.likes.length;
    }
}