# gic-nodejs

Service to provide backend for gic

## Ownership

Kelvin John Santos

## Tooling

```bash
# vscode extensions
- ESLint
- GitLens - Git supercharged
- Prettier - Code formatter
- OpenAPI (Swagger) Editor
- Swagger Viewer
- vscode-icons
- YAML
```

```bash
# vscode settings.json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"editor.formatOnSave": true,
```

## Development Build Setup

```bash
# dependencies
- postman (latest version)
- mongodb (latest version)
- npm
- node
```

```bash
# clone gic-nodejs
$ git clone git@github.com:thesecretworkshop/gic-nodejs.git

# go to gic-nodejs project
$ npm install

# copy .env.example to .env
$ cp .env.example .env

# serve with hot reload at localhost:3000
$ npm run start:dev

# build for production with minification
$ npm run build
$ npm start
```

## Dockerized Build Setup

```bash
# start the development cluster
$ docker-compose up -d

# view consolidated logs via docker-compose
$ docker-compose logs -f

# log into app container
$ docker exec -it ${service_name} sh

# shutdown development cluster
$ docker-compose down
```

