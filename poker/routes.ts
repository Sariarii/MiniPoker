import { Router } from "express"
import {Game, Turn, ViewAccueil} from "./controller"
export const PokerRouter=Router()

PokerRouter.get("/",ViewAccueil)
PokerRouter.get("/game",Game)
PokerRouter.post("/game",Turn)
