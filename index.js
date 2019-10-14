document.addEventListener("DOMContentLoaded", () => {
    let animalButton = document.getElementById("animalButton");
    animalButton.addEventListener("click", isAnimal) 

    let randomButton = document.getElementById("randomButton");
    randomButton.addEventListener("click", getRandom);
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