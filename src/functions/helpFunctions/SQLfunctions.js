import PG from 'pg' 
import dotenv from 'dotenv'
dotenv.config()

const client = new PG.Pool({
    user: process.env.SQLUSER,
    host: process.env.SQLHOST,
    database: process.env.SQLDB,
    password: process.env.SQLPASSWORD,
    port: process.env.SQLPORT,
})

function query(text){
    client.query(text, (err, res) => {if(err){console.log(err);return false}else{return true}});
};

export function sqlConnect(){
    client.connect(function(err){if (err){throw(err)};console.log("Connected to SQL");});
}

export function sqlCreateTable(){
    query("CREATE TABLE users(userId SERIAL NOT NULL, userName text NOT NULL, email text NOT NULL, password text NOT NULL)")
}

export function sqlInsert(){
    query(`INSERT INTO users (userName, email, password) VALUES ('Philippe', 'philippe.idalgoprestes@gmail.com', '123456789');`)
}

export function sqlDelete(){
    query("DELETE FROM users")
}