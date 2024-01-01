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
    query("CREATE TABLE users(userId SERIAL NOT NULL PRIMARY KEY, userLog JSON NOT NULL, categories text array[15] NOT NULL, transactions JSON array[10000])")
}

export async function sqlInsertNewUser(userName, userEmail, userPassword){
    query(`INSERT INTO users(userLog, categories) VALUES(
        cast('{"userName": "${userName}", "email": "${userEmail}", "password": "${userPassword}", "userSince": {"day": ${date.getDate()}, "month": ${date.getMonth() + 1}, "year": ${date.getFullYear()}}}' as json), 
        array['Mensal']
        )`)
    const r = await query(`SELECT userid, userlog FROM users WHERE categories=array['Mensal']`)
    const rows = r.rows
    for(let i = 0; i < rows.length; i++){
        if(rows[i].userlog.email == userEmail){
            return (rows[i].userid)
        }
    }
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

export function sqlDelete(){
    query("DELETE FROM users")
}

export async function sqlSelect(){
    const r = await query(`SELECT * FROM users`)
    return r;
}

export async function sqlCheckExistingEmail(email){
    const r = await query(`SELECT userlog FROM users`)
    const rows = r.rows
    for(let i = 0; i < rows.length; i++){
        if(rows[i].userlog.email == email){
            return true
        }
    }
    return false
}