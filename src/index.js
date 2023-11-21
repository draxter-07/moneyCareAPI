import express from 'express'
import cors from 'cors'
import { sqlConnect, sqlCreateTable, sqlDelete, sqlInsert } from './functions/helpFunctions/SQLfunctions.js'

import getHome from "./functions/homeFunctions.js"

const app = express();
app.use(express.json());
app.use(cors());

sqlConnect()
//sqlInsert()
//sqlDelete()

app.get("/home", getHome);

app.listen(5000, () => console.log("Running on port 5000"));