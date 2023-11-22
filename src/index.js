import express from 'express'
import cors from 'cors'
import { sqlConnect, sqlCreateTable, sqlDelete, sqlInsert, sqlSelect } from './functions/helpFunctions/SQLfunctions.js'

import getHome from "./functions/homeFunctions.js"
import { postLogin, postSignUp } from "./functions/startFunctions.js"

const app = express();
app.use(express.json());
app.use(cors());

//sqlConnect()
//sqlCreateTable()
//sqlInsert()
//const r = await sqlSelect()
//console.log(r.rows[3].transactions)
//console.log(r.rows[1].userlog.userSince.day)
//sqlDelete()

app.get("/home", getHome);
app.post("/login", postLogin);
app.post("/signup", postSignUp);

app.listen(5000, () => console.log("Running on port 5000"));