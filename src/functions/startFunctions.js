export function postLogin(req, res){
    let userEmail = req.email
    let userPassword = req.password

    res.status(402).end()
    // 401 for wrong pass ans 402 for wrong user
}

export function postSignUp(req, res){
    
}