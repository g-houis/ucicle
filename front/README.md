Ucicle react frontend
=====================

# Installation
Make sure you have at least 'Node 18' installed.

Yarn is the preferred way to set up this project. To install it, follow the instructions detailed here: <https://yarnpkg.com/getting-started/install>.

# Launching the application

To start the application in dev mode, you need to run: `yarn start` from `front` folder.
Then, the application can be accessed at <http://localhost:5173>.

## Production
To build the application run `yarn build` and serve sources with a web server.

Actually the website is deployed using s3 web"site service. The project can be deploy by running `yarn cd` or `node deploy.js`. Before deploying in produciton, following environment variables needs to be set :
* `ACCESS_KEY` - cloud access key with object storage and serveless access
* `SECRET_KEY` - cloud secret key
* `DOMAIN` - domain of the cloud provider
* `BUCKET_NAME` - name of the bucket used to store the website

# Sources structure
A well-structured project greatly improve maintainability.
Here is the proposed structure projects:

- `src`: Contains all the application source code except tests, including images, fonts, style etc.
- `src/assets`: Contains all the static content of the project: images, fonts, style
- `src/components`: Contains all the React based code, the `.tsx` files
- `src/i18n`: Contains the messages entry point and the translations for each language
- `src/services`: Contains the business code (not technical) that handles logic and data that exists application wide: sessions, locale, notification, configuration, etc.
- files outside `src` and `tests`: File that are used to compile the project, typescript and eslint preferences
