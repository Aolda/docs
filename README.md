# AOLDA-DOCS

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

# Dockerize

Getting started with Docusaurus
Create a new Docusaurus site

```
npx create-docusaurus@latest my-website classic
```

Your directory structure should look like this:

Directory structure

Start the site:

```
cd my-website
npx docusaurus start
```

Open http://localhost:3000. Once you see that your website is running locally you can close the server then proceed to the next section.
Adding the Dockerfile
Add the host flag to the start and serve scripts in the package.json file

```js
"scripts": {
"docusaurus": "docusaurus",
-- "start": "docusaurus start",
++ "start": "docusaurus start --host 0.0.0.0",
"build": "docusaurus build",
"swizzle": "docusaurus swizzle",
"deploy": "docusaurus deploy",
"clear": "docusaurus clear",
-- "serve": "docusaurus serve",
++ "serve": "docusaurus serve --host 0.0.0.0",
"write-translations": "docusaurus write-translations",
"write-heading-ids": "docusaurus write-heading-ids"
},
```

Create a new file called Dockerfile in the root of the project

```Dockerfile
## Base ########################################################################
# Use a larger node image to do the build for native deps (e.g., gcc, python)
FROM node:lts as base

# Reduce npm log spam and colour during install within Docker
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

# We'll run the app as the `node` user, so put it in their home directory
WORKDIR /home/node/app
# Copy the source code over
COPY --chown=node:node . /home/node/app/

## Development #################################################################
# Define a development target that installs devDeps and runs in dev mode
FROM base as development
WORKDIR /home/node/app
# Install (not ci) with dependencies, and for Linux vs. Linux Musl (which we use for -alpine)
RUN npm install
# Switch to the node user vs. root
USER node
# Expose port 3000
EXPOSE 3000
# Start the app in debug mode so we can attach the debugger
CMD ["npm", "start"]

## Production ##################################################################
# Also define a production target which doesn't use devDeps
FROM base as production
WORKDIR /home/node/app
COPY --chown=node:node --from=development /home/node/app/node_modules /home/node/app/node_modules
# Build the Docusaurus app
RUN npm run build

## Deploy ######################################################################
# Use a stable nginx image
FROM nginx:stable-alpine as deploy
WORKDIR /home/node/app
# Copy what we've installed/built from production
COPY --chown=node:node --from=production /home/node/app/build /usr/share/nginx/html/
```

Working with Docker container in development
To build the Docker container for development, run

```
docker build --target development -t docs:dev .
```

To run the Docker container in development, run

```
docker run -p 3000:3000 docs:dev
```

Note: Remember to stop the container before proceeding to the next step

Working with Docker container in production
To build the Docker container for production, run

```
docker build -t docusaurus:latest .
```

To run the Docker container in production, run

```
docker run --rm -p 3000:80 docusaurus:latest
```
