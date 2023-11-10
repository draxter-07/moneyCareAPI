import express from 'express'
import cors from 'cors'

import getHome from "./functions/homeFunctions.js"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/home", getHome);

app.listen(5000, () => console.log("Running on port 5000"));