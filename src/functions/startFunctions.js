export default function postLogin(req, res){
    let userEmail = req.email
    let userPassword = req.password

    res.status(401).end()
    // 401 for wrong pass ans 402 for wrong user
}