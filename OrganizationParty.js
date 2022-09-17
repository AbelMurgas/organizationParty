'use strict';

const { execArgv } = require('process');

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
    }
    // CASE !: (the actual group is equal to the amount of color ) distribute people without group to existing groups
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
        var totalPersonsInsideGroup;
        var sum = this.#getListNumberPersonInsideGroup().reduce(function(a, b){
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
        let list = this.#getListNumberPersonInsideGroup()
        return Math.max(...list);
    }

    createFinalFormat(){
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

newInstance.fillGroups()
console.log(newInstance.createFinalFormat())

