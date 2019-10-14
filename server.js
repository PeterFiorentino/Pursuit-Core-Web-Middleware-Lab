const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
// const bodyParser = require("body-parser");

app.use(cors());

let animalArr = ["zebra", "dog", "cat", "snake", "lion", "monkey"];

//THIS IS THE PART ONE WITH JUST THE PARAM
// app.get("/animal/:species", (req, res) => {
//     let species = req.params.species;
//     if(animalArr.includes(species)) {
//         res.json({
//             status: "success",
//             message: true
//         })
//     } else {
//         res.json({
//             staus: "failed",
//             message: false
//         })
//     }
// })
function isAnimal(req, res) {
    let species = req.params.species;
        if(animalArr.includes(species)) {
            res.json({
                status: "success",
                message: true
            })
        } else {
            res.json({
                staus: "failed",
                message: false
            })
        }
}

app.get("/animal/:species", isAnimal)


// app.get("/random", (req, res) => {
//     let floor = Number(req.query.floor);
//     let ceil = Number(req.query.ceil);

    
    
//     if(ceil <= floor) {
//         res.json({
//             error: "The floor needs to be lower than the ceil"
//         })
//     }

//     let randomArr = []
//     for(let i = floor; i <= ceil; i++) {
//         randomArr.push(i);
//     }

//     let randomNum = randomArr[Math.floor(Math.random() * randomArr.length)]
    
//     res.json({
//         status: "success",
//         range: [floor, ceil],
//         randPick: randomNum
//     })
// })

function generateSpread (req, res) {
    let floor = Number(req.query.floor);
    let ceil = Number(req.query.ceil);
  
    if(ceil <= floor) {
        res.json({
            error: "The floor needs to be lower than the ceil"
        })
    }

    let randomArr = []
    for(let i = floor; i <= ceil; i++) {
        randomArr.push(i);
    }

    let randomNum = randomArr[Math.floor(Math.random() * randomArr.length)]
    
    res.json({
        status: "success",
        range: [floor, ceil],
        randPick: randomNum
    })
}

app.get("/random", generateSpread);




app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})