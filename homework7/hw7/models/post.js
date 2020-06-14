const pool = require('../modules/pool');
let moment = require('moment')
const table = 'post'
const date = new Date();

const post = {
    createPost: async (user_idx,title,content)=>{
        
        const createdAt = moment(date).format("YYYY-MM-DD HH:MM:SS")
        const fields = 'user_idx,title,content,createdAt';
        const questions = '?,?,?,?';
        const values = [user_idx,title,content,createdAt];

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
    getAllPost: async()=>{
      const query = `SELECT * FROM ${table}`  
      try{
        const result = await pool.queryParam(query);
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
    getPostById: async(id)=>{
        const query = `SELECT * FROM ${table} WHERE idx="${id}"`;
        try{
            const result = await pool.queryParam(query);
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
    update: async (user_idx,idx,title,content)=>{
        const query = `UPDATE ${table} SET user_idx="${user_idx}", title="${title}", content="${content}" WHERE idx = "${idx}"`;
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
    delete: async(idx)=>{
        const query = `DELETE FROM ${table} WHERE idx="${idx}"`

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