document.addEventListener("DOMContentLoaded", () => {
    let animalButton = document.getElementById("animalButton");
    animalButton.addEventListener("click", isAnimal) 

    let randomButton = document.getElementById("randomButton");
    randomButton.addEventListener("click", getRandom);

    let peekButton = document.getElementById("peekButton");
    peekButton.addEventListener("click", peekAtArray);

    let enqueueButton = document.getElementById("enqueueButton");
    enqueueButton.addEventListener("click", addToQueue);

    let dequeueButton = document.getElementById("dequeue");
    dequeueButton.addEventListener("click", removeFirstName)
})

function isAnimal(event) {
    event.preventDefault();
    let searchBar = document.getElementById("animalInput");
    let searchValue = searchBar.value;

    let animalForm = document.getElementById("animalForm")
    console.log(searchValue)

    axios.get(`http://localhost:3000/animal/${searchValue}`)
    .then(function (response) {
        if (response.data.message === true) {
            let p = document.createElement("p");
            p.innerText = `${searchValue} is in the array!`
            animalForm.append(p);
        } else {
            let p = document.createElement("p");
            p.innerText = `${searchValue} is NOT in the array!`
            animalForm.append(p);
        }
    }) 
}

function getRandom(event) {
    event.preventDefault();
    let floorInput = document.getElementById("floor");
    let floorValue = floorInput.value;

    let ceilInput = document.getElementById("ceil");
    let ceilValue = ceilInput.value;

    let randomForm = document.getElementById("randomForm");

    axios.get(`http://localhost:3000/random?floor=${floorValue}&ceil=${ceilValue}`)
    .then(function (response){
        console.log(response.data)
        let p = document.createElement("p");
        p.innerText = `A random number between ${floorValue} and ${ceilValue} is ${response.data.randPick}`;
        randomForm.append(p);
    })
}

function peekAtArray(event) {
    event.preventDefault();

    let queueForm = document.getElementById("queueForm");

    axios.get(`http://localhost:3000/queue/peek`)
    .then(function (response) {
        let p = document.createElement("p");
        console.log(response.data)
        p.innerText = `${response.data.name} is the next person in the queue.`
        queueForm.appendChild(p);
    })
}

function addToQueue(event) {
    event.preventDefault();
    
    let nameInput = document.getElementById("nameInput");
    let nameValue = nameInput.value;

    let queueForm = document.getElementById("queueForm")

    axios.get(`http://localhost:3000/queue/enqueue?name=${nameValue}`)
    .then(function (response) {
        let p = document.createElement("p");
        p.innerText = response.data.message;
        queueForm.appendChild(p);
        console.log(response.data.currentArr)
    })
}

function removeFirstName(event) {
    event.preventDefault();

    let queueForm = document.getElementById("queueForm");

    axios.get(`http://localhost:3000/queue/dequeue`)
    .then(function (response){
        let p = document.createElement("p");
        p.innerText = response.data.message;
        queueForm.appendChild(p);
    })
}