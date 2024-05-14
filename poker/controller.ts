import { RequestHandler } from "express"

export const ViewAccueil : RequestHandler = (req, res) => {
    res.render('accueil')
}