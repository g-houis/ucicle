# Ucicle

Ucicle is a daily game based on [wordle](https://www.nytimes.com/games/wordle/index.html) and [poetl](https://poeltl.dunk.town/) games.

## Architecture

Ucicle project is divided in two parts :
* A React front-end located at `front` folder
* Node.js functions located at `functions` designed to generate game data

### Front end

The react front end is designed to be served by a web server. The website needs two files :
* Riders referential accessible at `api/riders.json`
* A secret rider to guess accessible at `api/secret_rider.json`

## Front

You can check the front-end documentation [here](./front/README.md)

## Functions

You can check functions documentation [here](./functions/README.md)

## Deployment

Running `yarn cd` launches the command for `front` and `functions` directories. More information about deployment [here (front)](./front/README.md) adn [here (functions)](./functions/README.md).

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](LICENSE)