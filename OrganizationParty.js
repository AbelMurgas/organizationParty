'use strict';

const { group } = require('console');

// const { execArgv } = require('process'); //K

class OrganizationParty{
    #data
    #numberExistingGroup
    #numberExistingColor
    #numberPersonWithoutGroup
    #difBetweenColorNGroup
    #finalGroup

    constructor (){  
        this.#data = this.#fetchData();
        this.#numberExistingGroup = this.#data.groups.length;
        this.#numberExistingColor = this.#data.colors.length;
        this.#numberPersonWithoutGroup = this.#data.persons.length;
        this.#difBetweenColorNGroup = this.#numberExistingColor - this.#numberExistingGroup;
        if (this.#difBetweenColorNGroup > 0){
            this.#data.groups = this.createGroups(this.#difBetweenColorNGroup, this.#data.groups)
        }
        this.#finalGroup = this.insertPersonsWithoutGroup(this.#data.persons, this.#data.groups)
        this.#finalGroup = this.reGroups(this.#finalGroup)
        this.#finalGroup = this.createFinalFormat(this.#finalGroup, this.#data.colors)
    }
    // CASE 1: difBeetweenColor = 0   
    // Case 2: difBeetweenColor > 0 more color than group create group
    // Case 3: difBeetweenColor < 0 less color than group re-organize group
    // crear los grupos(de ser necesario)
    // filtrar el menor y llenarlo(reorganizar)
    #fetchData(){
        const fs = require('fs');
        let rawdata = fs.readFileSync('data.json');
        let completeData = JSON.parse(rawdata);
        return completeData;
    }

    createGroups(amount, groups){
        for(let i =0 ; i < amount; i++){
            groups.push([])
        }
        return groups
    }

    insertPersonsWithoutGroup(personsWithoutGroup, groups){
        let groupsList = [...groups]
        let personsWithoutGroupList = [...personsWithoutGroup]
        personsWithoutGroupList.forEach(person => {
            groupsList = this.#orderGroupDesc(groupsList);
            groupsList[groupsList.length - 1].push(person)
        });
        return groupsList
    } 

    reGroups(groups){
        let groupOrdered = this.#orderGroupDesc(groups)
        while (groupOrdered[0].length > (groupOrdered[groupOrdered.length - 1].length + 1)){
            groupOrdered[groupOrdered.length-1].push(groupOrdered[0].pop())
            groupOrdered = this.#orderGroupDesc(groups)

        } 
        return groupOrdered
    }

    #orderGroupDesc(groups){
        let groupOrdered = [...groups];
        return groupOrdered.sort(function(a, b){
            return b.length - a.length;
          });
    }


    
    getTotalPersons(){
        return this.#numberPersonWithoutGroup + this.#getTotalPersonsInsideGroups();
    }

    #getTotalPersonsInsideGroups(){
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

    getNumberMaxPersonInsideGroup(){
        let list = this.#getListNumberPersonInsideGroup();
        return Math.max(...list);
    }

    createFinalFormat(groups, colors){
        let finalStructure = {};
        let allGroups = [...groups];
        let allColors = [...colors]
        let index = 0;
        allColors.forEach(color => {
            finalStructure[color] = allGroups[index];
            index ++;
        });
        return finalStructure
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

    getFinalFormat(){
        return this.#finalGroup
    }
}

const newInstance = new OrganizationParty()
console.log(newInstance.getFinalFormat())

