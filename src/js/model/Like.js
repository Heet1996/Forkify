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
        return like;
    }
    deleteLikeItem(id)
    {
        const index=this.likes.findIndex(el=>el.id==id);
        this.likes.splice(index,1);
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