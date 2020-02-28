import * as Network from 'expo-network';

export const IDGenerator = ()=>{
    return Date.now().toString();
    //return Math.random().toString(36).substr(2);
};

export const checkNetwork=async()=>{

    const status = await Network.getNetworkStateAsync();

    return status.isConnected && status.isInternetReachable;

};
export const getRandom=(list)=>{

    const listKeys =Object.keys(list);
    const index = Math.floor((Math.random()*listKeys.length));

    const id = listKeys[index];

    console.log(listKeys.length, index);

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