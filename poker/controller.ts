import { RequestHandler } from "express"
import { cartes } from "../models/cartes"
import {user} from "../models/user"

export const UserList:user[]=[]
export const cartesList:cartes[]=[]
export const cartesDesignList:string[]=[]

let carte:cartes={
    numero:"A",
    valeur:6,
    couleur:"C"       
} 
cartesList.push(carte)

carte={
    numero:"A",
    valeur:6,
    couleur:"P"  
}
cartesList.push(carte)

carte={
    numero:"K",
    valeur:5,
    couleur:"C"  
}
cartesList.push(carte)

carte={
    numero:"K",
    valeur:5,
    couleur:"P"  
}
cartesList.push(carte)

carte={
    numero:"Q",
    valeur:4,
    couleur:"C"  
}
cartesList.push(carte)

carte={
    numero:"Q",
    valeur:4,
    couleur:"P"  
}
cartesList.push(carte)

carte={
    numero:"J",
    valeur:3,
    couleur:"C"  
}
cartesList.push(carte)

carte={
    numero:"J",
    valeur:3,
    couleur:"P"  
}
cartesList.push(carte)

carte={
    numero:"10",
    valeur:2,
    couleur:"C"  
}
cartesList.push(carte)

carte={
    numero:"10",
    valeur:2,
    couleur:"P"  
}
cartesList.push(carte)

carte={
    numero:"9",
    valeur:1,
    couleur:"C"  
}
cartesList.push(carte)

carte={
    numero:"9",
    valeur:1,
    couleur:"P"  
}
cartesList.push(carte)

export function Randomise(){
let idx = Math.floor(Math.random() * cartesList.length)
let RandomCarte=cartesList[idx].numero+cartesList[idx].couleur
cartesDesignList.push(cartesList[idx].numero+cartesList[idx].couleur)
let ValueCard=cartesList[idx].valeur
cartesList.splice(idx,1)
let idx2=Math.floor(Math.random() * cartesList.length)
RandomCarte=RandomCarte+"  "+cartesList[idx2].numero+cartesList[idx2].couleur
cartesDesignList.push(cartesList[idx2].numero+cartesList[idx2].couleur)
ValueCard=ValueCard+cartesList[idx2].valeur
cartesList.splice(idx2,1)
return {RandomCarte,ValueCard}
}

export function BotTurn(){
    let optionsList=["check","raise","fold","call"]
        let idx = Math.floor(Math.random() * optionsList.length)
        switch (optionsList[idx]){
            case 'check':
                UserList[0].currentTurn=true;
                
                break;
            case 'raise':
                UserList[0].currentTurn=true
                UserList[1].jetons=UserList[1].jetons-2;
                UserList[1].mise+=2;
                pot+=UserList[1].mise
                break;
            case 'fold':
                UserList[0].currentTurn=true
                break;
            case 'call':
                UserList[0].currentTurn=true
                UserList[1].mise=UserList[0].mise
                break;
        }
        
}


let RecupValeur=Randomise()
let RandomCarte = RecupValeur.RandomCarte
let ValueCard=RecupValeur.ValueCard


let users:user={
    name:"player",
    jetons:100,
    mainName:RandomCarte,
    mainValue:ValueCard,
    mise:0,
    currentTurn:true
}
UserList.push(users)

RecupValeur=Randomise()
RandomCarte = RecupValeur.RandomCarte
ValueCard=RecupValeur.ValueCard

users={
    name:"bot",
    jetons:100,
    mainName:RandomCarte,
    mainValue:ValueCard,
    mise:0,
    currentTurn:false
}
UserList.push(users)

let stackinitial=UserList[0].jetons+UserList[1].jetons
UserList[0].jetons-=1
UserList[1].jetons-=1

let pot=stackinitial-(UserList[0].jetons+UserList[1].jetons)
// console.log(cartesList)
// console.log(UserList[0].mainName+" "+UserList[0].mainValue+" "+UserList[1].mainName+" "+UserList[1].mainValue)
// console.log(cartesDesignList)

export const ViewAccueil : RequestHandler = (req, res) => {
    res.render('accueil')
}

export const Game : RequestHandler = (req, res) => {
    
    res.render('game',{cartesList,UserList,cartesDesignList,pot,BotTurn})
}

export const Turn : RequestHandler = (req,res)=>{
    let TurnOrNot = UserList[0].currentTurn
    if (TurnOrNot===true){
        switch (req.body.action){
            case 'check':
                UserList[0].currentTurn=false;
                UserList[0].jetons=UserList[0].jetons;
                break;
            case 'raise':
                UserList[0].currentTurn=false
                UserList[0].jetons=UserList[0].jetons-2;
                UserList[0].mise+=2;
                pot+=UserList[0].mise;
                break;
            case 'fold':
                UserList[0].currentTurn=false
                break;
            case 'call':
                UserList[0].currentTurn=false
                UserList[0].mise=UserList[1].mise
                break;
        }
    } else {
        //BotTurn()
    }
    console.log(req.body.action)
    console.log(UserList[0].currentTurn)
    res.redirect("/accueil/game")
}

