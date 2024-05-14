import express from 'express'
import methodOverride from 'method-override'
import {loadFromHiddenField} from '../middleware/methodoverride'
import { PokerRouter } from '../poker/routes';


export const app=express()

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride(loadFromHiddenField as any))
app.use("/accueil",PokerRouter)
app.listen(3000)
