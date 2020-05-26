let data = [
    {
        id:0,
        author:"임얼쑤",
        title:"내가 살던 고향은",
        description:"꽃피던 산골",
    },
    {
        id:1,
        author:"박경선",
        title:"나는",
        description:"파트장"
    }
]

const post = {
    readAll: async ()=>{
        return data;
    },
    read: async (id)=>{
        const returnData = data.filter(data=>data.id==id);
        
        return returnData;
    },
    create: async (author,title,description)=>{
        const newId = data[data.length-1].id+1;

        const newData = {
            id: newId,
            author: author,
            title: title,
            description: description
        }

        data.push(newData);
        
        return newId ;
    },
    update: async (id,updatedData)=>{
        // const findIndex = data.filter(data=>data.id==id)[0].id;
        // data[findIndex] = updatedData[0];

        data[id]=updatedData;

        return true;
    },
    delete: async (id)=>{
        data.splice(id);
        return true;
    }
}

module.exports=post;