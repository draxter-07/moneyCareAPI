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

async function query(text){
    let r = await client.query(text)
    return r
};

export function sqlConnect(){
    client.connect(function(err){if(err){console.log(err)}else{console.log("Connected to SQL")}})
}

export function sqlCreateTable(){
    query("CREATE TABLE users(userId SERIAL NOT NULL, userName text NOT NULL, email text NOT NULL, password text NOT NULL)")
    query("CREATE TABLE userSince(userId integer NOT NULL, year integer NOT NULL, month integer NOT NULL, day integer NOT NULL)")
    query("CREATE TABLE transactions(userId integer NOT NULL, transId SERIAL NOT NULL, name text NOT NULL, value float NOT NULL, categories text array[15] NOT NULL)")
    query("CREATE TABLE transDate(transId integer NOT NULL, year integer NOT NULL, month integer NOT NULL, day integer NOT NULL)")
}

export function sqlInsert(){
    query(`INSERT INTO transactions (userId, name, value, categories) VALUES (0, 'teste', -20, array['Mensal', 'things']);`)
}

export function sqlDelete(){
    query("DELETE FROM users")
}

export async function sqlSelect(){
    const r = await query(`SELECT * FROM transactions`)
    return r;
}