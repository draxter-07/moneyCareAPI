import { sqlInsertNewUser, sqlCheckExistingEmail, sqlFindUser } from "./SQL.js"
import { sendEmail } from "./email.js";
import dotenv from "dotenv"

const date = new Date;
dotenv.config()

export async function postLogin(req, res){
    let userEmail = req.body.email
    let userPassword = req.body.password
    let status = 404, data = null;

    if(!(await sqlCheckExistingEmail(userEmail))){
        status = 402
    }
    else{
        const userData = await sqlFindUser(userEmail)
        if(userData.userLog.password != userPassword){
            status = 401
        }
        else{
            status = 200
            data = userData.userID
        }
    }

    res.status(status).json({userID: data}).end()
}

export async function postSignUp(req, res){
    let userName = req.body.name
    let userEmail = req.body.email
    let userPassword = req.body.password
    let status = 404, data = null;

    if(await sqlCheckExistingEmail(userEmail)){
        status = 409
    }
    else{
        const obj = await sqlInsertNewUser(userName, userEmail, userPassword, {day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()})
        status = 200
        data = await obj
        sendEmail(userEmail, "Tem alguém novo por aqui... :)", `Olá, ${userName}, tudo bem? 👀\n\nSua conta moneyCare foi criada com sucesso! 🎉\nObrigado por confiar na moneyCare para sua gestão financeira 🤝`)
        sendEmail(process.env.ADM_EMAIL, "Novo usuário moneyCare", `Nome: ${userName}\nEmail: ${userEmail}`)
    }
    res.status(status).json(data).end()
}