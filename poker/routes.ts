import { Router } from "express"
import {Game, ViewAccueil} from "./controller"
export const PokerRouter=Router()

PokerRouter.get("/",ViewAccueil)
PokerRouter.get("/game",Game)
