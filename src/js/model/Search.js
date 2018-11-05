import axios from 'axios';
export default class Search
{
    constructor(query){
        this.query=query;
    }
    async getResults()
    {   try{
        const key='378ef23321788deb13758dc2fd450344';
        const url='https://cors-anywhere.herokuapp.com/';
        let res=await axios(`${url}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        
        this.result=res.data.recipes;
        
        }
        catch(err)
        {
            console.log(err);
        }
    }
}