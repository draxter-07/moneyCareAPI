import { sqlInsertNewUser, sqlCheckExistingEmail } from "./helpFunctions/SQLfunctions.js"

export function postLogin(req, res){
    let userEmail = req.body.email
    let userPassword = req.body.password

    res.status(200).end()
    // 401 for wrong pass ans 402 for wrong user
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
        const userID = await sqlInsertNewUser(userName, userEmail, userPassword)
        status = 200
        data = await userID
    }
    res.status(status).json({data: data}).end()
}