import express from 'express'
import cors from 'cors'
import { sqlConnect } from './functions/helpFunctions/SQLfunctions.js'

import getHome from "./functions/homeFunctions.js"
import { postLogin, postSignUp } from "./functions/startFunctions.js"

const app = express();
app.use(express.json());
app.use(cors());

sqlCreateTable()
//sqlInsert()
//const r = await sqlSelect()
//console.log(r.rows[0].transactions)
//sqlDelete()
//sqlInsertNewTransition(1, {name: "teste", value: 10, date: {day: 1, month: 11, year: 2023}, categories: ["Mensal", "Teste"]});
//sqlCheckExistingEmail("poi@")
//const r = await sqlInsertNewUser("oi", "poi@", "oi")
//console.log(r)

app.get("/home", getHome);
app.post("/login", postLogin);
app.post("/signup", postSignUp);

app.listen(5002, () => console.log("Running on port 5002"));