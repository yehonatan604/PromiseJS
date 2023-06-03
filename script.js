// exercise 1
console.log('*** exercise 1 ***');

async function print1() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
            reject("Error"), 1000
        });  
    });
    await promise.then(
        (result) => {console.log(result)}, 
        (error) => { console.log(error)}
    );
}

await print1().then(async () => {
    console.log(2);

    // exercise 2
    console.log('\n*** exercise 2 ***');

    function getPromise() {
        let myPromise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", 'https://pokeapi.co/api/v2/pokemon?limit=20');
            request.onload = () => {
                if (request.status == 200) {
                    resolve(request.response);
                } else {
                    reject("Error");
                }
            };
            request.send();
        });
        return myPromise;
    }

    let promise = getPromise();
    let pokemonsArray = [];

    const promiseHandler = () => {
        promise.then(
            (result) => {
                pokemonsArray = [...JSON.parse(result).results];
                pokemonsArray.forEach(item => console.log(item.name));
            },
            (error) => {
                console.log(error); // משום שמדובר בכתובת תקינה זה לא יקרה
            }
        );
    }
    
    promiseHandler();

    //exercise 3
    async function fetchPokemons() {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        if (response.status === 200) {
            return await response.json();
        }
        throw new Error(response.statusText);
    }
    
    pokemonsArray = await fetchPokemons();

    console.log('\n*** exercise 3 ***');
    pokemonsArray.results.forEach(item => console.log(item.name));
});
