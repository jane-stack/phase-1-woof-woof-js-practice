document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.querySelector("#dog-bar");
    const dogInfo = document.querySelector("#dog-info");
    const dogContainer = document.querySelector("#dog-summary-container");
    const goodButton = document.createElement("button");
    goodButton.classList.add("dog-btn");
    const filerDiv = document.getElementById("filter-div");
    const filterBtn = document.getElementById("good-dog-filter");

    fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then((dogs) => {
        dogs.forEach((dog) => {
            dogBar.append(renderDogs(dog))
        })
    })

    function renderDogs(dog) {
        const dogSpan = document.createElement("span");
        dogSpan.textContent = `${dog.name}`
        dogSpan.addEventListener("click", () => {
            fetch(`http://localhost:3000/pups/${dog.id}`)
            .then(r => r.json())
            .then(dogs => showDog(dogs))
        })
        return dogSpan;
    }

    function showDog(dog) {
        dogInfo.innerHTML = "";
        const img = document.createElement("img");
        img.src = dog.image;
        const h2 = document.createElement("h2");
        h2.innerText = dog.name;
        // goodButton.innerHTML = dog.isGoodDog;
        goodButton.textContent = "GOOD DOG"
        dogInfo.append(img, h2, goodButton);
        dogContainer.append(dogInfo);
        goodButton.addEventListener("click", () => {
            if (goodButton.textContent == "GOOD DOG") {
                toggleButton(false, dog)
                goodButton.textContent = "BAD DOG";
            } else {
                toggleButton(true, dog)
                goodButton.textContent = "GOOD DOG";
            }
        })
    }

    function toggleButton(toggleDogValue, dog) {
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: toggleDogValue
            })
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
    }

    filterBtn.addEventListener("click", () => {
        if (filterBtn.textContent == "Filter good dogs: OFF") {
            filterDogs(false, dog)
            filterBtn.textContent = "Filter good dogs: ON";
        } else {
            filterDogs(true, dog)
            filterBtn.textContent = "Filter good dogs: ON";
        }
    })

    function filterDogs(filterButton, dog) {
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: filterButton
            })
            .then(resp => resp.json())
            .then(dogBar.filter(dog => dog.true))
        })
    }
})

// const results = dogBar.filter(dogBar => dogs.true)