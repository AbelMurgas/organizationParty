export default class OrganizationParty{
    #groupData
    #personData
    #colors
    #existingGroups 
    #numberExistingGroup
    #numberExistingColor
    #numberPersonWithoutGroup
    #difBetweenColorNGroup
    #finalGroup
    #personWithoutGroup

    constructor (groupInformation){ 
        this.#groupData = groupInformation;
        this.#colors = [...this.#groupData.colors];
        this.#existingGroups = [...this.#groupData.groups]; 
        this.#personWithoutGroup = [...this.#groupData.persons];
        this.#numberExistingGroup = this.#existingGroups.length;
        this.#numberExistingColor = this.#colors.length;
        this.#numberPersonWithoutGroup = this.#personWithoutGroup.length;
        this.#difBetweenColorNGroup = this.#numberExistingColor - this.#numberExistingGroup; 
        if (this.#difBetweenColorNGroup > 0){
            this.#existingGroups = this.#createGroups(this.#difBetweenColorNGroup, this.#existingGroups)
        }
        this.#finalGroup = this.#insertPersonsWithoutGroup(this.#personWithoutGroup, this.#existingGroups)
        this.#finalGroup = this.#reGroups(this.#finalGroup)
        this.#finalGroup = this.createFinalFormat(this.#finalGroup, this.#colors)
    }
    
    /*
    #fetchData(){
        const fs = require('fs');
        let rawdata = fs.readFileSync('data.json');
        let completeData = JSON.parse(rawdata);
        return completeData;
    }
    */

    #createGroups(amount, groups){
        for(let i =0 ; i < amount; i++){
            groups.push([])
        }
        return groups
    }

    #insertPersonsWithoutGroup(personsWithoutGroups, groups){
        let groupsList = [...groups]
        let personsWithoutGroup = [...personsWithoutGroups]
        personsWithoutGroup.forEach(element =>{
            groupsList = this.#orderGroupDesc(groupsList);
            groupsList[groupsList.length - 1].push(element)
        })
        return groupsList
    } 

    #orderGroupDesc(groups){
        let groupOrdered = [...groups];
        return groupOrdered.sort(function(a, b){
            return b.length - a.length;
          });
    }

    #reGroups(groups){
        let groupOrdered = this.#orderGroupDesc(groups)
        while (groupOrdered[0].length > (groupOrdered[groupOrdered.length - 1].length + 1)){
            groupOrdered[groupOrdered.length-1].push(groupOrdered[0].pop())
            groupOrdered = this.#orderGroupDesc(groups)
        } 
        return groupOrdered
    }

    #getListNumberPersonInsideGroup(){
        return  this.#existingGroups.map(data =>{
            return data.length
        });
    }

    #getTotalPersonsInsideGroups(){
        let sum = this.#getListNumberPersonInsideGroup().reduce(function(a, b){
        return a + b;
        }, 0);
        return sum
    }

    getTotalPersons(){
        return this.#numberPersonWithoutGroup + this.#getTotalPersonsInsideGroups();
    }

    createFinalFormat(groups, colors){ //privado
        let finalFormat = [];
        /*
        rojo: ["abel","jose","cain"]*/
        let allGroups = [...groups];
        let allColors = [...colors];
        let index = 0;
        allColors.forEach(color => {
            let finalStructure = {};
            finalStructure["color"] = color
            finalStructure["group"] = allGroups[index];
            index ++;
            finalFormat.push(finalStructure)
        });
        return finalFormat;
    }

    getInformationEachPerson(group){
                // grupos: [[1,2,3],[4,5,6]]
        // colores: ["rojo", "Azul", "blanco"]
        
        // "ROJO": [1,2,3,4]
         //   "Azul":[2,3,4]
        /*
        abel: {
            color : red,
            group: ["Yasiris", "Sterber"]
        }*/

        let informationEachPerson = [];
        for (const [color, persons] of Object.entries(this.#finalGroup)) {
            let personInfo = {};
            persons.forEach(person => {
                personInfo = {
                    "name": person,
                    "color":color,
                    "group": [...persons.filter(p => p !== person)]
                }
                informationEachPerson.push(personInfo)
                personInfo = {}
            })
        }
        return informationEachPerson.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.name === value.name
        )));
    }

    getGroupData(){
        return this.#groupData;
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