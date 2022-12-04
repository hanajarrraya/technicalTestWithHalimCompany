var data=require('./data.js')

var argv = require('yargs/yargs')(process.argv.slice(2)).argv;

if (argv.filter ) {
    console.log(filterAnimals(data,argv.filter));
} else if(argv.count){
    console.log(countChildren(data));
}
function filterAnimals(array){
        if(array.length!=0){
                var result=[];
                for(let i=0;i<array.length;i++){
                
                        for(let k=0;k<array[i].people.length;k++){
                                
                        let animals=array[i].people[k].
                        animals.filter(item=>item.name.includes('ry'))
                        if(animals.length!=0){
                                        let row=array[i].people[k]
                                        row[animals]=animals
                                        result.push(row)    }
                        }
                }
                if(result.length==0){
                        return;
                }
                return result;
        }
        return;
        
}
function countChildren(array){
        if(array.length!=0){
                for(let i=0;i<array.length;i++){
                        
                        
                        for(let k=0;k<array[i].people.length;k++){
                                
                                array[i].people[k].name=array[i].people[k].name.
                                concat(" [",array[i].people[k].animals.length,"]")
                        
                        }
                        const initialValue = 0;
                        const sumWithInitial = array[i].people.reduce(
                        (accumulator, item) => accumulator + item.animals.length,
                        initialValue
                        );
                        
                        array[i].name=array[i].name.concat(" [",array[i].people.length+sumWithInitial,"]")

                }
                return array
        }
        return;
}
