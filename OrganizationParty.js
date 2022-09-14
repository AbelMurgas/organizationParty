'use strict';
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
        totalPersonsInsideGroup = this.#data.groups.map(data =>{
            return data.length
        });
        var sum = totalPersonsInsideGroup.reduce(function(a, b){
        return a + b;
        }, 0);
        return sum
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
}

const newInstance = new OrganizationParty()
console.log(newInstance.getData())
console.log(newInstance.getNumbersExistingGroup())
console.log(newInstance.getNumbersExistingColor())
console.log(newInstance.getnumberPersonWithoutGroup())
console.log(newInstance.getTotalPersons())
