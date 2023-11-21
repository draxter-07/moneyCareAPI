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
    query("CREATE TABLE users(userId SERIAL NOT NULL, userLog JSON NOT NULL, categories text array[15] NOT NULL, transactions JSON array[10000])")
}

export function sqlInsert(){
    query(`INSERT INTO users(userLog, categories, transactions) VALUES(
        cast('{"userName": "Philippe", "email": "philippe.idalgoprestes@gmail.com", "password": "123456789", "userSince": {"day": 7, "month": 9, "year": 2023}}' as json), 
        array['Mensal', 'Crédito', 'Salário', 'DARF', 'Nubank > Toro', 'Toro > Nubank'], 
        array[cast('{"name": "Nubank > 99", "value": -10, "date": {"day": 9, "month": 8, "year": 2023}, "categories": ["Mensal"]}' as json),
        cast('{"name": "Uber", "value": -6.93, "date": {"day": 9, "month": 8, "year": 2023}, "categories": ["Mensal"]}' as json)]
        )`)
}

export function sqlDelete(){
    query("DELETE FROM users")
}

export async function sqlSelect(){
    const r = await query(`SELECT * FROM users`)
    return r;
}