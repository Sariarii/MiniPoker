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

    it ('must return true(Suite > carte haute)', () => {
        UserList[0].mainName="ACQPKP"
        UserList[1].mainName="ACJPKP"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(true);
    })
    it ('must return true(Suite > Paire)', () => {
        UserList[0].mainName="ACQPKP"
        UserList[1].mainName="ACJPJC"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(true);
    })
    it ('must return false(Suite < couleur)', () => {
        UserList[0].mainName="ACQPKP"
        UserList[1].mainName="ACJCTC"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(false);
    })
    it ('must return false(Suite < suite-couleur)', () => {
        UserList[0].mainName="ACQPKP"
        UserList[1].mainName="QCJCTC"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(false);
    })
    it ('must return true(Paire > carte-haute)', () => {
        UserList[0].mainName="ACAPKP"
        UserList[1].mainName="KCJPTC"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(true);
    })
    it ('must return false(Paire < couleur)', () => {
        UserList[0].mainName="ACAPKP"
        UserList[1].mainName="KCJCTC"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(false);
    })
    it ('must return false(Paire < Suite-couleur)', () => {
        UserList[0].mainName="ACAPKP"
        UserList[1].mainName="QCJCTC"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(false);
    })
    it ('must return false(Couleur < Suite-couleur)', () => {
        UserList[0].mainName="9PAPKP"
        UserList[1].mainName="QCJCTC"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(false);
    })
    it ('must return true(Couleur > Carte-Haute)', () => {
        UserList[0].mainName="ACAPKP"
        UserList[1].mainName="QC9CTP"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(true);
    })

    it ('must return true(Suite-Couleur > Carte-Haute)', () => {
        UserList[0].mainName="APKPQP"
        UserList[1].mainName="QC9CTP"
        CompareCard(0,UserList[0].mainName)
        CompareCard(1,UserList[1].mainName)
        expect(UserList[0].WinHand>UserList[1].WinHand).toBe(true);
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
