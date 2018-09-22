import { Router } from "express";
import axios from 'axios'
var router = Router();
var radixSortLSD = require("./fasterSort").default

router.post('/minimum-distance', function (req, res, next) {
    var input = req.body;
    console.log(input);
    // input.sort((a,b)=>{return a-b});
    radixSortLSD(input)
    console.log(input)
    var minimumDifference = input[1]-input[0];
    for(var i=1 ; i< input.length ; i++)
    {
        if(input[i]-input[i-1]<minimumDifference)
        {
            minimumDifference = input[i] - input[i-1];
        }
    }

    var jsonAns = {
        "answer" : minimumDifference
    }
   
    res.send(jsonAns);
});

router.post('/minimum-camps', function (req, res, next) {
    var input = req.body;
    console.log(JSON.stringify(input));

    let position = {};

    input.forEach((person, idx) => {
        if(position[person.pos]){
            position[person.pos].push(idx)
        }
        else{
            position[person.pos] = [idx]
        }
        // position[person.pos] = position[person.pos] ? position[person.pos]++ : 1;
        for(var i=1; i<=person.distance; i++){
            var pos = person.pos+i;
            if(position[pos]){
                position[pos].push(idx)
            }
            else{
                position[pos] = [idx]
            }
            pos = person.pos-i;
            if(position[pos]){
                position[pos].push(idx)
            }
            else{
                position[pos] = [idx]
            }
        }
    })
    let camps = 0;
    while(Object.keys(position).length){
        console.log(position)
        let sortedKeys = Object.keys(position).sort((a,b)=>{
            return position[b].length - position[a].length
        });
        console.log(sortedKeys)
        position[sortedKeys[0]].forEach(pos => {
            for(var key in position){
                var index = position[key].indexOf(pos);
                if (index > -1 && key != sortedKeys[0]) {
                    position[key].splice(index, 1);
                    if(position[key].length == 0){
                        delete position[key];
                    }
                }
            }
        })
        delete position[sortedKeys[0]]
        camps++;
    }

    console.log(camps)

    res.send(JSON.stringify({
        answer: camps
    }));
});



export default router;
