import {describe,expect,it} from 'vitest';
import { Randomise,BotTurn,CompareCard,RemplissageCartes,FoldOrShowdown, UserList, cartesList,reset } from '../poker/controller';
import  request from 'supertest';
import { app } from '../src/Server';

describe('Type carte', () => {
    it ('must return pair', () => {
        UserList[0].mainName="ACAPKC"
        expect(CompareCard(0, UserList[0].mainName)).toBe("Paire");
    })
    it ('must return suit', () => {
        UserList[0].mainName="9CTPJC"
        expect(CompareCard(0,UserList[0].mainName)).toBe("Suite");
    })
    it ('must return flush', () => {
        UserList[0].mainName="ACTCKC"
        expect(CompareCard(0,UserList[0].mainName)).toBe("Couleur");
    })
    it ('must return suit-flush', () => {
        UserList[0].mainName="APQPKP"
        expect(CompareCard(0,UserList[0].mainName)).toBe("Suite-Couleur");
    })
    it ('must return high card', () => {
        UserList[0].mainName="ACJPKP"
        expect(CompareCard(0,UserList[0].mainName)).toBe("Carte Haute");
    })

})

describe('Tirage carte ', () => {
    it ('must return lenght 11', () => {
        reset()
        RemplissageCartes()
        Randomise()
        expect(cartesList.length).toBe(11);
    })
})

describe('Remplissage du nombre de cartes', () => {
    it ('must return lenght 12', () => {
        reset()
        RemplissageCartes()
        expect(cartesList.length).toBe(12);
    })
})

describe('Routes Poker', () => {
    it ('Road Form Recette', async() => {
        let server=request(app)
        let response=await server.get('/accueil/game')
        console.log("body",response.text)
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain('text/html')
    })
})
