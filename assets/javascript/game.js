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
    wins: 0,
    losses: 0,
    round: 0,
    currentWord: '',
    currentWordIndex: -1,
    guessesLeft: 6,
    charsUsed: [],
    validChars: /[A-z]/,
    pokemon: [{
        name: 'Abomasnow',
        silhouette: './assets/images/img0-s.png',
        revealed: './assets/images/img0.png',
        sound: './assets/sound/'
    },
    {
        name: 'Absol',
        silhouette: './assets/images/img01-s.png',
        revealed: './assets/images/img01.png',
        sound: './assets/sound/'
    },
    {
        name: 'Aerodactyl',
        silhouette: './assets/images/img02-s.png',
        revealed: './assets/images/img02.png',
        sound: './assets/sound/'
    },
    {
        name: 'Zygarde',
        silhouette: './assets/images/img03-s.png',
        revealed: './assets/images/img03.png',
        sound: './assets/sound/'
    },
    {
        name: 'Pikachu',
        silhouette: './assets/images/img04-s.png',
        revealed: './assets/images/img04.png',
        sound: './assets/sound/'
    },
    {
        name: 'Bulbasaur',
        silhouette: './assets/images/img05-s.png',
        revealed: './assets/images/img05.png',
        sound: './assets/sound/'
    },
    {
        name: 'Shuckle',
        silhouette: './assets/images/img06-s.png',
        revealed: './assets/images/img06.png',
        sound: './assets/sound/'
    },
    {
        name: 'Morelull',
        silhouette: './assets/images/img07-s.png',
        revealed: './assets/images/img07.png',
        sound: './assets/sound/'
    },
    {
        name: 'Shiinotic',
        silhouette: './assets/images/img08-s.png',
        revealed: './assets/images/img08.png',
        sound: './assets/sound/'
    },
    {
        name: 'Guzzlord',
        silhouette: './assets/images/img09-s.png',
        revealed: './assets/images/img09.png',
        sound: './assets/sound/'
    },
    ],
    roundBox: document.getElementById('roundCounter'),
    wordOutput: document.getElementById('currentWord'),
    incorrect: document.getElementById('incorrect'),
    lossesTable: document.getElementById('losses'),
    winsTable: document.getElementById('wins'),
    jumbo: document.getElementById('jumbo'),
    roundStart: () => {
        if (game.round < 10) {
            let countDown = 6;
            game.jumbo.classList.remove('hidden')
            let timer = setInterval(() => {
                countDown -= 1;
                game.jumbo.innerHTML = `<h2>Round ${game.round+1}</h2><h3 class="countdown">${countDown}</h3>`;
                if (countDown < 1) {
                    clearInterval(timer);
                    game.jumbo.setAttribute('class', 'hidden')
                    game.jumbo.innerHTML = '';
                    if (game.currentWordIndex > -1) {
                        game.pokemon.splice(game.currentWordIndex, 1);
                    }
                    let index = Math.floor(Math.random() * game.pokemon.length);
                    game.currentWord = game.pokemon[index].name;
                    game.round++;
                    game.charsUsed = [];
                    game.guessesLeft = 6;
                    game.currentWordIndex = index;
                    game.roundBox.innerHTML = `<h2>Round</h2><h3>${game.round}</h3>`;
                    game.wordOutput.innerHTML = '';
                    game.incorrect.innerHTML = '';
                    for (let i = 0; i < game.currentWord.length; i++) {
                        game.wordOutput.innerHTML += `<span id="char${i}" class="blanks"> _ </span>`
                    }
                }
            }, 1000);
        } else {
            game.jumbo.classList.remove('hidden');
            game.jumbo.innerHTML = '<h2>GAME OVER!</h2>'
        }
    },
    play: (keypress) => {
        if (!game.gameStart) {
            game.gameStart = true;
            document.getElementById('instructions').style.display = 'none';
            game.roundStart();
        } else {
            let choice = keypress.key.toLowerCase();
            if (game.charsUsed.indexOf(choice) > -1) {
                return;
            }
            game.charsUsed.push(choice);
            game.currentWord.toLowerCase().indexOf(choice) > -1 ? game.dingDing(choice) : game.wompWomp(choice);
        }
    },
    dingDing: (key) => {
        let arr = []
        let keyIndex = game.currentWord.toLowerCase().indexOf(key);
        while (keyIndex !== -1) {
            arr.push(keyIndex);
            keyIndex = game.currentWord.toLowerCase().indexOf(key, keyIndex + 1);
        }
        for (let i = 0; i < arr.length; i++) {
            let space = document.getElementById('char' + arr[i]);
            space.innerHTML = key;
        }
        game.status();
    },
    wompWomp: (key) => {
        game.guessesLeft--;
        let wrong = document.createTextNode(key);
        game.incorrect.appendChild(wrong);
        game.status();
    },
    status: () => {
        if (game.guessesLeft === 0) {
            //reveal image
            game.losses++;
            game.lossesTable.innerHTML = game.losses;
            game.roundStart();
        }
        let activeWord = document.querySelectorAll('.blanks');
        activeWord = Array.from(activeWord);
        let blank = activeWord.map(e => e.innerHTML);
        if (blank.indexOf(' _ ') === -1) {
            //reveal image
            game.wins++;
            game.winsTable.innerHTML = game.wins;
            game.roundStart();
        }
    }
}