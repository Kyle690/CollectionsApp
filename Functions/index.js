import * as Network from 'expo-network';

export const IDGenerator = ()=>{
    return Date.now().toString();
    //return Math.random().toString(36).substr(2);
};

export const FormatDate=(date)=>{
    const d = new Date(date);
    const day = d.getDate();
    const month=d.getMonth()+1;
    const year = d.getFullYear();
    const time = d.getHours()+':'+('0'+d.getMinutes()).slice(-2);

    return day+'/'+month+'/'+year+'  '+time;
}

export const checkNetwork=async()=>{

    const status = await Network.getNetworkStateAsync();

    return status.isConnected && status.isInternetReachable;

};
export const getRandom=(list)=>{

    const listKeys =Object.keys(list);
    const index = Math.floor((Math.random()*listKeys.length));

    const id = listKeys[index];

    return list[id];

};

export const ListStats=(list)=>{
  let total=0;
  let dvd=0;
  let blueRay=0;
  let runtimeTotal=0;

  Object.keys(list).map(item=>{
      const {type,runtime}=list[item];

      total+=1;
      if(type==='DVD'){
          dvd+=1;
      }else{
          blueRay+=1;
      }

      runtimeTotal += runtime!==undefined?parseInt(runtime.split(' ')[0]):0;
  });

  return {
      total,
      dvd,
      blueRay,
      runtimeTotal:(runtimeTotal/60).toFixed(2)
  }



};

const arrType=(type)=>{
    switch(type){
        case 'register':
            return ['email','password','name'];
        case'login':
            return ['email','password'];
        case'profile':
            return ['email','name'];
        default :
            return ['email'];
    }
}

export const Validation=(type,data)=>{
    const reg =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let error=null;

    arrType(type).map(test=>{
        if(data[test] && !error){
            const d = data[test];
            if(!d.length>0){
                error='Please check your '+test+'!'
            }
            if(test==='email' && !reg.test(d)){
                error='Please check your '+test+'!'
            }
        }else{
            error='Please check your '+test+'!'
        }
    })


    return error;
}