'use strict';

// const { execArgv } = require('process'); //K

class OrganizationParty{
    #data
    #numberExistingGroup
    #numberExistingColor
    #numberPersonWithoutGroup

    constructor (){  
        this.#data = this.#fetchData();
        this.#numberExistingGroup = this.#data.groups.length
        this.#numberExistingColor = this.#data.colors.length
        this.#numberPersonWithoutGroup = this.#data.persons.length
        this.difBetweenColorNGroup = this.#numberExistingColor - this.#numberExistingGroup
    }
    // CASE !: (the actual group is equal to the amount of color ) distribute people without group to existing groups
    // caso 1: color = grupo
    // caso 2: color > grupo 
    // grupo = colores  4e + 20sg = nColores 
    // e = 0     4    8 2xg   Personas actuales/ colores  50 / 6 []
    // caso 3: color < grupo 3  6 persona = 0
    // diferent between the groups and colors 

    createGroups(){
        let groups = []; // Container
        let peopleWithoutGroup = this.#data.persons
        for (let i = 0; i < this.#numberExistingColor; i++) {
           let group = [];
           for (let j = 0; j < parseInt(this.#numberPersonWithoutGroup / this.#numberExistingColor); j++){
            group.push(peopleWithoutGroup.pop())
           }
           groups.push(group)
        }
        if (peopleWithoutGroup.length>0){
            groups[groups.length-1].push(peopleWithoutGroup.pop())
        }
        return groups
    }
    caso2(){
        this.#data.groups = this.createGroups()
    }

    fillGroups(){ 
        let groups = this.#data.groups;
        let peopleWithoutGroup = this.#data.persons
        let maxPeopleInsideGroup = this.getNumberMaxPersonInsideGroup()
        while (peopleWithoutGroup.length>0){
            for (let i = 0; i < groups.length; i++) {
                if (peopleWithoutGroup.length == 0){
                    break;
                }
                if (groups[i].length < maxPeopleInsideGroup){
                    groups[i].push(peopleWithoutGroup.pop())
                }
            }
        }
    }

    #fetchData(){
        const fs = require('fs');
        let rawdata = fs.readFileSync('data.json');
        let completeData = JSON.parse(rawdata);
        return completeData;
    }
    
    getTotalPersons(){
        return this.#numberPersonWithoutGroup + this.#getNumberPersonsInsideGroup();
    }

    #getNumberPersonsInsideGroup(){
        let sum = this.#getListNumberPersonInsideGroup().reduce(function(a, b){
        return a + b;
        }, 0);
        return sum
    }

    #getListNumberPersonInsideGroup(){
        return  this.#data.groups.map(data =>{
            return data.length
        });
    }

    getData(){
        return this.#data;
    }

    getNumbersExistingGroup(){
        return this.#numberExistingGroup;
    }

    getNumbersExistingColor(){
        return this.#numberExistingColor;
    }

    getnumberPersonWithoutGroup(){
        return this.#numberPersonWithoutGroup;
    }

    getNumberMaxPersonInsideGroup(){
        let list = this.#getListNumberPersonInsideGroup();
        return Math.max(...list);
    }

    createFinalFormat(){
        this.caso2()
        let finalStructure = {};
        let allGroups = this.#data.groups;
        let index = 0;
        this.#data.colors.forEach(color => {
            finalStructure[color] = allGroups[index];
            index ++;
        });
        return finalStructure
    }
}

const newInstance = new OrganizationParty()

console.log(newInstance.getTotalPersons()) 

