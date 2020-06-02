const pool = require('../modules/pool');
const table = 'post'

const post = {
    addPost: async (author,title,content,createdAt)=>{
        
        const fields = 'author,title,content,createdAt';
        const questions = '?,?,?,?';
        const values = [author,title,content,createdAt];

        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`

        try{
            const result = await pool.queryParamArr(query,values);
            const insertIdx = result.insertId;
            return insertIdx;
        }catch(err){
            if(err.errno===1062){
                console.log('signUp error :',err.errno,err.code);
                return -1;
            }
            console.log('signUp error ',err);
            throw err;
        }
    },
    getPostById: async(id)=>{
        const query = `SELECT * FROM ${table} WHERE authorIdx="${id}"`;
        try{
            const result = await pool.queryParam(query);
            console.log(result)
            return result;
        }catch(err){
            if(err.errno===1062){
                console.log('getPostById error :',err.errno,err.code);
                return -1;
            }
            console.log('getPostById error ',err);
            throw err;
        }
    },
    update: async (id,title,content)=>{
        const query = `UPDATE ${table} SET title="${title}", content="${content}" WHERE authorIdx = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        }catch(err){
            if(err.errno===1062){
                console.log('update error :',err.errno,err.code);
                return -1;
            }
            console.log('update error ',err);
            throw err;
        }
    },
    delete: async(id)=>{
        const query = `DELETE FROM ${table} WHERE authorIdx="${id}"`

        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            if(err.errno===1062){
                console.log('delete error :',err.errno,err.code);
                return -1;
            }
            console.log('delete error ',err);
            throw err;
        }
    }
}

module.exports = post;