# Ucicle functions

`functions` folder contains a serverless application. This application provides handler which redirect to functions designed to generate game datas:
* `handleLoadRiders` generates riders database
* `handleGenerateSecretRider` generates the daily secret rider

## handleLoadRiders

The aim of this function is to retrieve the list of the top 1000 UCI (Union Cyclistes International which means International United Cyclists) riders once a month. This list will be saved in an s3 service. Datas are scrapped from [procyclingstats](https://www.procyclingstats.com/rankings.php). Only riders with correctly formed informations are saved.

### Configuration

| parameter    | value     |
|--------------|-----------|
| cron trigger | 0 0 1 * * |
| endpoint     | -         |

## handleGenerateSecretRider

The purpose of this lambda is to randomly retrieve a rider from the riders list and register it in a s3 service.

| parameter    | value     |
|--------------|-----------|
| cron trigger | 0 5 * * * |
| endpoint     | -         |

## Environment variables

| variable    | description                            |
|-------------|----------------------------------------|
| ACCESS_KEY  | access key for accessing the s3 bucket |
| SECRET_KEY  | secret key for accessing the s3 bucket |
| DOMAIN      | domain of the s3 service endpoint      |
| REGION      | s3 region                              |
| BUCKET_NAME | bucket used to store uci riders        |

## Configuration of the serverless instance

| parameter  | value     |
|------------|-----------|
| min memory | 4GB       |
| cron       | 0 0 1 * * |
| endpoint   | -         |