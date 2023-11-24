import express from 'express'
import cors from 'cors'
import { sqlConnect, sqlCreateTable, sqlDelete, sqlInsert, sqlSelect, sqlInsertNewTransition } from './functions/helpFunctions/SQLfunctions.js'

import getHome from "./functions/homeFunctions.js"
import { postLogin, postSignUp } from "./functions/startFunctions.js"

const app = express();
app.use(express.json());
app.use(cors());

sqlConnect()
//sqlCreateTable()
//sqlInsert()
const r = await sqlSelect()
console.log(r.rows[0].transactions)
//sqlDelete()
//sqlInsertNewTransition(1, {name: "teste", value: 10, date: {day: 1, month: 11, year: 2023}, categories: ["Mensal", "Teste"]});

app.get("/home", getHome);
app.post("/login", postLogin);
app.post("/signup", postSignUp);

app.listen(5000, () => console.log("Running on port 5000"));