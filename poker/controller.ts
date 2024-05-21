import { RequestHandler } from "express"
import { cartes } from "../models/cartes"
import {user} from "../models/user"

export const UserList:user[]=[]
export let cartesList:cartes[]=[]
export let cartesDesignList:string[]=[]
let TurnChange:number=1
let TurnPartie:number=1
let ValueAs:number=0
let ValueK:number=0
let ValueQ:number=0
let ValueJ:number=0
let ValueTen:number=0
let ValueNine:number=0
let FlushPique:number=0
let flushCoeur:number=0
let count:number
let infoValeurCartes:string
let infoValeurCartesBot:string


export function RemplissageCartes(){
let carte:cartes={
    numero:"A",
    valeur:200000,
    couleur:"C"       
} 
cartesList.push(carte)

carte={
    numero:"A",
    valeur:200000,
    couleur:"P"  
}
cartesList.push(carte)

carte={
    numero:"K",
    valeur:100000,
    couleur:"C"  
}
cartesList.push(carte)

carte={
    numero:"K",
    valeur:100000,
    couleur:"P"  
}
cartesList.push(carte)

carte={
    numero:"Q",
    valeur:100000,
    couleur:"C"  
}
cartesList.push(carte)

carte={
    numero:"Q",
    valeur:200,
    couleur:"P"  
}
cartesList.push(carte)

carte={
    numero:"J",
    valeur:50,
    couleur:"C"  
}
cartesList.push(carte)

carte={
    numero:"J",
    valeur:50,
    couleur:"P"  
}
cartesList.push(carte)

carte={
    numero:"T",
    valeur:20,
    couleur:"C"  
}
cartesList.push(carte)

carte={
    numero:"T",
    valeur:20,
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
}

RemplissageCartes()

export function Randomise(){
let idx = Math.floor(Math.random() * cartesList.length)
let RandomCarte=cartesList[idx].numero+cartesList[idx].couleur
cartesDesignList.push(cartesList[idx].numero+cartesList[idx].couleur)
let ValueCard=cartesList[idx].valeur
cartesList.splice(idx,1)
return {RandomCarte,ValueCard}
}

export function CompareCard(Id:number){
    count=0
    ValueAs=0
    ValueK=0
    ValueQ=0
    ValueJ=0
    ValueTen=0
    ValueNine=0
    flushCoeur=0
    FlushPique=0
    while (count<=UserList[Id].mainName.length){
        console.log(UserList[Id].mainName.substring(count,count+1))
        switch (UserList[Id].mainName.substring(count,count+1)){
            case "A" :
                ValueAs++
                break;
            case "K" :
                ValueK++
                break;
            case "Q":
                ValueQ++
                break;
            case "J" :
                ValueJ++
                break; 
            case "T" : 
                ValueTen++
                break;
            case  "9" :
                ValueNine++
                break;
            case "P" :
                FlushPique++
                break;
            case "C" :
                flushCoeur++
                break;
        }
        count++
    }
    console.log(ValueAs,ValueK,ValueQ,ValueJ,ValueTen,FlushPique,flushCoeur)
    if (ValueAs===2 || ValueK===2 || ValueQ===2 || ValueJ===2 || ValueTen===2 || ValueNine===2){
        return "Paire"
    } else if ((ValueAs===1 && ValueK===1 && ValueQ===1) || (ValueJ===1 && ValueK===1 && ValueQ===1) || (ValueTen===1 && ValueJ===1 && ValueQ===1) || (ValueTen===1 && ValueNine===1 && ValueJ===1) && (flushCoeur!=3 || FlushPique!=3)){
        return "Suite"
    } else if (flushCoeur===3 || FlushPique===3) {
        return "Couleur"
    } else if ((ValueAs===1 && ValueK===1 && ValueQ===1) || (ValueJ===1 && ValueK===1 && ValueQ===1) || (ValueTen===1 && ValueJ===1 && ValueQ===1) || (ValueTen===1 && ValueNine===1 && ValueJ===1) && (flushCoeur===3 || FlushPique===3)){
        return "Suite-Couleur"
    } else {
        return "Carte Haute"  
    }
    }

export function BotTurn(){
    let optionsList=[""]
    if (UserList[0].mise===0 && UserList[1].mise===0){
        optionsList=["check","mise1","mise2"]
    } else if (TurnChange===2 && UserList[0].mise > UserList[1].mise && UserList[1].mise===0){
        optionsList=["raise"]
    } else {
        optionsList=["call","fold"]
    }
    console.log(optionsList)

    let idx = Math.floor(Math.random() * optionsList.length)
    console.log(idx)
    console.log(optionsList[idx])
    switch (optionsList[idx]){
        case 'check':
            UserList[0].currentTurn=true;
            TurnChange++
            break;
        case 'raise':
            UserList[0].currentTurn=true
            UserList[1].mise+=UserList[0].mise*2;
            UserList[1].jetons=UserList[1].jetons-UserList[1].mise;
            pot+=UserList[1].mise
            break;
        case 'mise1':
            UserList[0].currentTurn=true
            UserList[1].jetons=UserList[1].jetons-1;
            UserList[1].mise+=1;
            pot+=UserList[1].mise
            TurnChange++
            break;
        case 'mise2':
            UserList[0].currentTurn=true
            UserList[1].jetons=UserList[1].jetons-2;
            UserList[1].mise+=2;
            pot+=UserList[1].mise
            TurnChange++
            break;
        case 'fold':
            UserList[0].currentTurn=true
            UserList[0].jetons=UserList[0].jetons+pot
            UserList[0].mise=0
            UserList[1].mise=0
            TurnChange=1
            pot=0
            cartesList=[]
            cartesDesignList=[]
            RemplissageCartes()
            RecupValeur=Randomise()
            RandomCarte = RecupValeur.RandomCarte
            ValueCard=RecupValeur.ValueCard
            RecupValeur=Randomise()
            RandomCarte=RandomCarte+" "+RecupValeur.RandomCarte
            ValueCard=ValueCard+RecupValeur.ValueCard
            UserList[1].mainName=RandomCarte
            UserList[1].mainValue=ValueCard
            RecupValeur=Randomise()
            RandomCarte = RecupValeur.RandomCarte
            ValueCard=RecupValeur.ValueCard
            RecupValeur=Randomise()
            RandomCarte=RandomCarte+" "+RecupValeur.RandomCarte
            ValueCard=ValueCard+RecupValeur.ValueCard
            UserList[0].mainName=RandomCarte
            UserList[0].mainValue=ValueCard
            break;
        case 'call':
            UserList[0].currentTurn=true
            if (UserList[1].mise!=0){
                UserList[1].jetons=UserList[0].jetons
                pot=pot+UserList[0].mise-UserList[1].mise
            } else {
                UserList[1].mise=UserList[0].mise
                UserList[1].jetons-=UserList[1].mise
                pot+=UserList[1].mise
            }
            TurnChange++
            break;
    }
    if (TurnChange===3){
        RecupValeur=Randomise()
        UserList[0].mainName=UserList[0].mainName+" "+RecupValeur.RandomCarte
        UserList[0].mainValue=UserList[0].mainValue+RecupValeur.ValueCard
        RecupValeur=Randomise()
        UserList[1].mainName=UserList[1].mainName+" "+RecupValeur.RandomCarte
        UserList[1].mainValue=UserList[1].mainValue+RecupValeur.ValueCard
        TurnPartie=2
        UserList[0].mise=0
        UserList[1].mise=0
        console.log(UserList[0].mainName+" "+UserList[0].mainValue+" "+UserList[1].mainName+" "+UserList[1].mainValue)

    }
    if (TurnChange===5) {
        infoValeurCartes=CompareCard(0)
        infoValeurCartesBot=CompareCard(1)
        console.log(infoValeurCartes)
        console.log(infoValeurCartesBot)
    }
        
}


let RecupValeur=Randomise()
let RandomCarte = RecupValeur.RandomCarte
let ValueCard=RecupValeur.ValueCard
RecupValeur=Randomise()
RandomCarte=RandomCarte+" "+RecupValeur.RandomCarte
ValueCard=ValueCard+RecupValeur.ValueCard


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
RecupValeur=Randomise()
RandomCarte=RandomCarte+" "+RecupValeur.RandomCarte
ValueCard=ValueCard+RecupValeur.ValueCard

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
//console.log(UserList[0].mainName+" "+UserList[0].mainValue+" "+UserList[1].mainName+" "+UserList[1].mainValue)
// console.log(cartesDesignList)

export const ViewAccueil : RequestHandler = (req, res) => {
    res.render('accueil')
}

export const Game : RequestHandler = (req, res) => {
    
    res.render('game',{cartesList,UserList,cartesDesignList,pot,BotTurn,TurnPartie,TurnChange})
}

export const Turn : RequestHandler = (req,res)=>{
    switch (req.body.action){
        case 'check':
            UserList[0].currentTurn=false;
            TurnChange++
            break;
        case 'raise':
            UserList[0].currentTurn=false
            UserList[0].mise+=UserList[1].mise*2;
            UserList[0].jetons=UserList[0].jetons-UserList[0].mise;
            pot+=UserList[0].mise;
            break;
        case 'fold':
            UserList[0].currentTurn=false
            UserList[1].jetons=UserList[1].jetons+pot
            UserList[0].mise=0
            UserList[1].mise=0
            TurnChange=1
            pot=0
            cartesList=[]
            cartesDesignList=[]
            RemplissageCartes()
            RecupValeur=Randomise()
            RandomCarte = RecupValeur.RandomCarte
            ValueCard=RecupValeur.ValueCard
            RecupValeur=Randomise()
            RandomCarte=RandomCarte+" "+RecupValeur.RandomCarte
            ValueCard=ValueCard+RecupValeur.ValueCard
            UserList[1].mainName=RandomCarte
            UserList[1].mainValue=ValueCard
            RecupValeur=Randomise()
            RandomCarte = RecupValeur.RandomCarte
            ValueCard=RecupValeur.ValueCard
            RecupValeur=Randomise()
            RandomCarte=RandomCarte+" "+RecupValeur.RandomCarte
            ValueCard=ValueCard+RecupValeur.ValueCard
            UserList[0].mainName=RandomCarte
            UserList[0].mainValue=ValueCard
            break;
        case 'call':
            UserList[0].currentTurn=false
            if (UserList[0].mise!=0){
                UserList[0].jetons=UserList[1].jetons
                pot=pot+UserList[1].mise-UserList[0].mise
            } else {
                UserList[0].mise=UserList[1].mise
                UserList[0].jetons-=UserList[0].mise
                pot+=UserList[0].mise
            }
            TurnChange++
            break;
        case 'mise1':
            UserList[0].currentTurn=false
            UserList[0].jetons=UserList[0].jetons-1;
            UserList[0].mise+=1;
            pot+=UserList[0].mise
            TurnChange++
            break;
        case 'mise2':
            UserList[0].currentTurn=false
            UserList[0].jetons=UserList[0].jetons-2;
            UserList[0].mise+=2;
            pot+=UserList[0].mise
            TurnChange++
            break;
    }
    if (TurnChange===3) {
        RecupValeur=Randomise()
        UserList[0].mainName=UserList[0].mainName+" "+RecupValeur.RandomCarte
        UserList[0].mainValue=UserList[0].mainValue+RecupValeur.ValueCard
        RecupValeur=Randomise()
        UserList[1].mainName=UserList[1].mainName+" "+RecupValeur.RandomCarte
        UserList[1].mainValue=UserList[1].mainValue+RecupValeur.ValueCard
        TurnPartie=2
        UserList[0].mise=0
        UserList[1].mise=0
        console.log(UserList[0].mainName+" "+UserList[0].mainValue+" "+UserList[1].mainName+" "+UserList[1].mainValue)

    }
    if (TurnChange===5) {
        infoValeurCartes=CompareCard(0)
        infoValeurCartesBot=CompareCard(1)
        console.log(infoValeurCartes)
        console.log(infoValeurCartesBot)
    }
    console.log(req.body.action)
    console.log(UserList[0].currentTurn)
    res.redirect("/accueil/game")
}

