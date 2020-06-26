import axios from'axios';
import {Platform} from "react-native";
import {SearchKey} from "../../Keys";

export const SearchTitle=(search,type,callback)=>async dispatch=>{


    const response = await axios.post('https://us-central1-collections-5133b.cloudfunctions.net/Search',{
        search,
        platform:Platform.OS,
        type,
        apiKey:SearchKey
    }).catch(()=>callback({status:2,msg:"Error - Server error"}));



    if(response.data.status===1){
        callback({status:1,data:response.data.data});
    }else{
        callback({status:2,msg:response.data.msg})
    }

};
