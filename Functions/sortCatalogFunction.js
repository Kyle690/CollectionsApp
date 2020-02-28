export const sortCatalogFunction=(list,sortBy)=>{

    let newList =[];

    if(sortBy==='Title A-Z'){
        const titleList = [];
        list.map(item=>{
            const {title}=item;
            titleList.push(title);
        });

        titleList.sort().map(t=>{

            list.map(item=>{
               const {title}=item;
               if(t===title){
                   newList.push(item)
               }
            });
        });
    }
    else if(sortBy==='Title Z-A'){
        const titleList = [];
        list.map(item=>{
            const {title}=item;
            titleList.push(title)
        });
        titleList.sort().reverse().map(t=>{
           list.map(item=>{
               const {title}=item;
               if(t===title){
                   newList.push(item)
               }
           })
        });
    }
    else if(sortBy==='Year (highest to lowest)'){
        newList=list.sort((a,b)=>b.year-a.year);
    }
    else if(sortBy==='Year (lowest to highest)'){
        newList=list.sort((a,b)=>a.year-b.year);

    }
    else if(sortBy==='Rating (highest to lowest)'){
        newList=list.sort((a,b)=>b.rating-a.rating);

    }
    else if(sortBy==='Rating (lowest to highest)'){
        newList=list.sort((a,b)=>a.rating-b.rating);
    }


    return newList;
};

export const SortList=(list)=>{

    return Object.keys(list).sort((a,b)=>b-a).reduce((a,v)=>{
        const data = list[v];
        data['id']=v;
        a.push(data);

        return a;
    },[]);



};