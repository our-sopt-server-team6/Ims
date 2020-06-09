const pool = require('../modules/pool');
const table = 'user';

const user ={
    signUp: async (id,name,password,salt,email)=>{
        const fields = 'id,name,password,salt,email';
        const question = '?,?,?,?,?';
        const values = [id,name,password,salt,email];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${question})`;
        
        try{
            const result = await pool.queryParamArr(query,values);
            const insertId = result.insertId;
            return insertId;

        }catch(error){
            if(error.errno==1062){
                console.log('signup error : ',err.errno,err.code);
                return -1;
            }
            console.log('signup error',err);
            throw error;
        }
    },
    signIn: async(id)=>{
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(error){
            if(error.errno==1062){
                console.log('signin error : ',err.errno,err.code);
                return -1;
            }
            console.log('signin error',error);
            throw error;
        }
    },
    checkUser: async(id)=>{
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length===0){
                return false;
            }else return true;
        }catch(error){
            if(error.errno=1062){
                console.log('checkUser ERROR :',err.errno,err.code);
                return -1;
            }
            console.log('checkUser :',error)
        }
    },
    getUserById: async(idx)=>{
        const query = `SELECT * FROM ${table} WHERE id="${idx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            if (err.errno == 1062) {
                console.log('getUserById ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getUserById ERROR : ', err);
            throw err;
        }
    }
}

module.exports = user;