import axios from'axios';
export const SearchTitle=(search,callback)=>async dispatch=>{

    const response = await axios.get(`http://www.omdbapi.com/?apikey=d4cbbe5a&t=${search}`);

    if(response.data.Response==="True"){
        const {Title, Year,Genre,Actors,Plot,Poster,imdbRating, Director, Runtime, Type,totalSeasons}=response.data;

        const data ={
            title:Title,
            actors:Actors,
            plot:Plot,
            year:Year,
            genre:Genre,
            poster:Poster,
            rating:imdbRating,
            director:Director,
            runtime:Runtime,
            kind:Type,
            totalSeasons:totalSeasons!==undefined?totalSeasons:'0'
        };

        callback({status:1,data});
    }else{
        callback({status:2,msg:response.data.Error})
    }
};
