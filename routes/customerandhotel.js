import { Router } from "express";
import axios from 'axios'
var router = Router();
// var radixSortLSD = require("./fasterSort").default

router.post('/minimum-distance', function (req, res, next) {
    var input = req.body;
    console.log(input);
    // input.sort((a,b)=>{return a-b});
    // console.log(input)
    var minimumDifference = Math.abs(input[0]-input[1]);
    for(var i=0 ; i< input.length-1 ; i++){
        for (var j=i+1; j<input.length; j++){
            if(Math.abs(input[i]-input[j])<minimumDifference && i!=j){
                minimumDifference = Math.abs(input[i]-input[j]);
            }
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

    let camps = 0;

    res.send(JSON.stringify({
        answer: camps
    }));
});



export default router;
