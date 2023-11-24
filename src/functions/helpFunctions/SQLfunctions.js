import PG from 'pg' 
import dotenv from 'dotenv'

const date = new Date;
dotenv.config()

const client = new PG.Pool({
    user: process.env.SQLUSER,
    host: process.env.SQLHOST,
    database: process.env.SQLDB,
    password: process.env.SQLPASSWORD,
    port: process.env.SQLPORT
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

export function sqlInsertNewUser(userName, userEmail, userPassword){
    query(`INSERT INTO users(userLog, categories) VALUES(
        cast('{"userName": "${userName}", "email": "${userEmail}", "password": "${userPassword}", "userSince": {"day": ${date.getDate()}, "month": ${date.getMonth() + 1}, "year": ${date.getFullYear()}}}' as json), 
        array['Mensal']
        )`)
}

export async function sqlInsertNewTransition(userID, transaction){
    const r = await query(`SELECT transactions FROM users WHERE userid=${userID}`)
    const transactions = r.rows[0].transactions
    let stringObjects = "";
    for(let i = 0; i < transactions.length; i++){
        let a = transactions[i]
        stringObjects += `cast('{"name": "${a.name}", "value": ${a.value}, "date": {"day": ${a.date.day}, "month": ${a.date.month}, "year": ${a.date.year}}, "categories": ["${a.categories.toString().replaceAll(",", '","')}"]}' as json), `
    }
    query(`UPDATE users SET transactions=array[${stringObjects}cast('{"name": "${transaction.name}", "value": ${transaction.value}, "date": {"day": ${transaction.date.day}, "month": ${transaction.date.month}, "year": ${transaction.date.year}}, "categories": ["${transaction.categories.toString().replaceAll(",",'","')}"]}' as json)] WHERE userid=${userID}`)
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