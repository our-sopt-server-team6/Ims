const fs = require('fs')
const crypto = require('crypto')

const encrypt = (salt,password)=>{
    return new Promise((res,rej)=>{
        crypto.pbkdf2(password,salt,1,64,'sha512',(err,data)=>{
            if(err) throw err;
            const hashed = data.toString('hex');
            res(hashed);
        })
    })
}

fs.readFile('Ims/homework2/password.txt','utf8',async (err,data)=>{
    if(err) throw err;

    const password = data.toString();
    const salt1 = crypto.randomBytes(64).toString('hex');

    const encryptFile = await encrypt(salt1,password);

    fs.writeFile(`${__dirname}/hashed.txt`,encryptFile,(err)=>{
        if(err) throw err;
    })
})



