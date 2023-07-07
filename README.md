# Ucicle

Ucicle is a daily game based on [wordle](https://www.nytimes.com/games/wordle/index.html) and [poetl](https://poeltl.dunk.town/) games.

## Lambda functions

### handleLoadRiders

The aim of this lambda is to retrieve the list of the top 1000 uci riders once a month. This list will be saved in an s3 service.

configuration

| parameter  | value     |
|------------|-----------|
| min memory | 4GB       |
| cron       | 0 0 1 * * |
| endpoint   | -         |

Environment variables

| variable           | description                            |
|--------------------|----------------------------------------|
| S3_ACCESS_KEY      | access key for accessing the s3 bucket |
| S3_SECRET_KEY      | secret key for accessing the s3 bucket |
| S3_DOMAIN          | domain of the s3 service endpoint      |
| S3_REGION          | s3 region                              |
| RIDERS_FILE_NAME   | file used to store uci riders          |
| RIDERS_BUCKET_NAME | bucket used to store uci riders        |

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)