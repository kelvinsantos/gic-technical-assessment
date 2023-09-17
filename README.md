# gic-technical-assessment

## Pre-requisites

```bash
# dependencies
- npm
- node
- docker
- docker-compose
```

# Running the dockerize version of the application

```bash
# build the application images
$ ./build.sh

# run the application images
$ ./up.sh
```

# Running the application without docker

```bash
It is also possible to run the application without docker
there are README file for both the frontend and backend app
please check them out in running them directly.
```

# Accessing the applications

```bash
# frontend app
$ http://localhost:3001

# backend app
$ http://localhost:3000
```

# Testing the backend apis via postman

```bash
There is a postman_collections in the root directory of the project
if you want to test the apis, simple export it to postman
```
