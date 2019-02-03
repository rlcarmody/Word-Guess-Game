document.onkeyup = function (event) {
    if (game.gameStart && !game.validChars.test(event.key)) {
        alert('Please choose a letter');
        return
    }
    game.play(event);
}


//object to store game variables and methods
//gamestats object with 'global' variables

const game = {
    gameStart: false,
    round: 0,
    currentWord: '',
    guessesLeft: 6,
    charsUsed: [],
    validChars: /[A-z]/,
    pokemon: [{
        name: 'Abomasnow',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    {
        name: 'Absol',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    {
        name: 'Aerodactyl',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    {
        name: 'Ygarde',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    {
        name: 'Pikachu',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    {
        name: 'Bulbasaur',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    {
        name: 'Shuckle',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    {
        name: 'Morelull',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    {
        name: 'Shiinotic',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    {
        name: 'Guzzlord',
        silhouette: './assets/images/',
        revealed: './assets/images',
        sound: './assets/sound/'
    },
    ],
    roundBox: document.getElementById('roundCounter'),
    wordOutput: document.getElementById('currentWord'),
    incorrect: document.getElementById('incorrect'),
    roundStart: () => {
        if (game.pokemon.length > 0) {
            let countDown = 3;
            let timer = setInterval(() => {
                countDown -= 1;
                game.roundBox.innerHTML = `<h2>Next Round in:</h2><h3 class="countdown">${countDown}</h3>`;

                if (countDown < 1) {
                    clearInterval(timer);
                    let index = Math.floor(Math.random() * game.pokemon.length);
                    game.currentWord = game.pokemon[index].name;
                    game.round++;
                    game.charsUsed = [];
                    game.guessesLeft = 6;
                    game.pokemon.splice(index, 1);
                    game.roundBox.innerHTML = `<h2>Round</h2><h3>${game.round}</h3>`;
                    game.wordOutput.innerHTML = '';
                    game.incorrect.innerHTML = '';
                    for (let i=0;i<game.currentWord.length;i++) {
                        let x = document.createElement('span');
                        let t = document.createTextNode(' _ ');
                        x.appendChild(t);
                        x.setAttribute('id','char' + i);
                        game.wordOutput.appendChild(x);
                    }
                }
            }, 1000);
        }
    },
    play: (keypress) => {
        if (!game.gameStart) {
            game.gameStart = true;
            document.getElementById("instructions").style.display = "none";
            game.roundStart();
        } else {
            let choice = keypress.key;
            let wrong = document.createTextNode(choice);
            game.incorrect.appendChild(wrong);
        }
    }
}