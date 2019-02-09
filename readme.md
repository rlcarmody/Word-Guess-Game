# Pokéhangman

## Rules of the Game

1. At the start of each round a random Pokémon will appear and you must correctly guess its name 

![Pokemonhidden](assets/images/img10-s.png)

2. The silhouette and the number of characters are your only clues

3. Guess the name of the Pokémon by pressing a letter on the keyboard

4. You receive six Pokéballs at the start of each round. You lose one Pokéball for each incorrect guess.

5. If you run out of Pokéballs, you lose the round.  

6. Guess correctly and you win the round.

7. The Pokémon is revealed at the end of each round and you will immediately advance to the next.

![Pokemonrevealed](assets/images/img10.png)

8. The game ends after 10 rounds.

#### Technical details

The game logic is wrapped in *game* Javascript object.  The game supports the addition of any number of additional Pokémon by adding two image assets, one silhouette and one full color, to the images folder and then adding a new pokemon object inside the game.pokemon array.

```
{
    name: '[New Pokemon name]',
    silhouette: './assets/images/[silhouetteimagefile]',
    revealed: './assets/images/[revealedimagefile]',
    sound: './assets/sound/[audiofile].mp3'
}
```


#### Disclaimer

The images, sounds, and names in this game are the property of Nintendo.  This application was developed for educational purposes.  Please support the official creators.
