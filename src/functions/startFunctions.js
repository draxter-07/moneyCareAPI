import { sqlInsertNewUser } from "./helpFunctions/SQLfunctions.js"

export function postLogin(req, res){
    let userEmail = req.body.email
    let userPassword = req.body.password

    res.status(200).end()
    // 401 for wrong pass ans 402 for wrong user
}

export function postSignUp(req, res){
    let userName = req.body.name
    let userEmail = req.body.email
    let userPassword = req.body.password

    sqlInsertNewUser(userName, userEmail, userPassword)
    res.status(200).end()
    //409 conflict
}