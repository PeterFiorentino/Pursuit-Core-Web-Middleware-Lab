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

let nameArr = ["Peter", "Samantha", "Amin", "John", "Pat", "Joe"];

// app.get("/queue/:type", (req, res) => {
//     let type = req.params.type;

//     if(type === "peek") {
//         res.json({
//             status: "success",
//             data: nameArr[nameArr.length - 1]
//         })
//     } else if (type === "enqueue") {
//         let name = req.query.name;
//         if (!nameArr.includes(name)) {
//             res.json({
//                 status: "success",
//                 enqued: name
//             })
//             nameArr.unshift(name)
//         } else {
//             res.json({
//                 error: "That name is already in the array"
//             })
//         }
//     } else if (type === "dequeue") {
//         res.json({
//             staus: "success",
//             name: nameArr[nameArr.length - 1]
//         })
//         nameArr.pop()
//     }
// })

function handleQueue(req, res) {
    let type = req.params.type;

    if(type === "peek") {
        res.json({
            status: "success",
            name: nameArr[nameArr.length - 1]
        })
    } else if (type === "enqueue") {
        let name = req.query.name;
        if (!nameArr.includes(name)) {
            nameArr.unshift(name);
            res.json({
                status: "success",
                enqued: name,
                message: `${name} has been added the que`,
                currentArr: nameArr
            })
        } else {
            res.json({
                message: "That name is already in the que"
            })
        }
    } else if (type === "dequeue") {
        if(nameArr[0]) {
        res.json({
            staus: "success",
            name: nameArr[nameArr.length - 1],
            message: `${nameArr[nameArr.length - 1]} has been removed from the queue`
        })
        nameArr.pop()
        } else {
            res.json({
                message: `This queue is empty`
            })
        }
    }
}

app.get("/queue/:type", handleQueue)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})