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

let users:user={
    name:"player",
    jetons:100,
    mainName:RandomCarte,
    mainValue:ValueCard,
    currentTurn:true
}
UserList.push(users)

idx = Math.floor(Math.random() * cartesList.length)
RandomCarte=cartesList[idx].numero+cartesList[idx].couleur
cartesDesignList.push(cartesList[idx].numero+cartesList[idx].couleur)
ValueCard=cartesList[idx].valeur
cartesList.splice(idx,1)
idx2=Math.floor(Math.random() * cartesList.length)
RandomCarte=RandomCarte+"  "+cartesList[idx2].numero+cartesList[idx2].couleur
cartesDesignList.push(cartesList[idx2].numero+cartesList[idx2].couleur)
ValueCard=ValueCard+cartesList[idx2].valeur

cartesList.splice(idx2,1)

users={
    name:"bot",
    jetons:100,
    mainName:RandomCarte,
    mainValue:ValueCard,
    currentTurn:false
}
UserList.push(users)

console.log(cartesList)
console.log(UserList[0].mainName+" "+UserList[0].mainValue+" "+UserList[1].mainName+" "+UserList[1].mainValue)
console.log(cartesDesignList)

export const ViewAccueil : RequestHandler = (req, res) => {
    res.render('accueil')
}

export const Game : RequestHandler = (req, res) => {
    
    res.render('game',{cartesList,UserList,cartesDesignList})
}

