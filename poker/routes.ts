import { Router } from "express"
import {ViewAccueil} from "./controller"
export const PokerRouter=Router()

PokerRouter.get("/",ViewAccueil)