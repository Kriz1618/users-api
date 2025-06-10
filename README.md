# Users API 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)


## Requirements
[![NPM Version](https://img.shields.io/badge/npm-10.9.0-blue.svg)](https://www.npmjs.com/)
[![Node.js Version](https://img.shields.io/badge/Node.js-22.12.0-brightgreen.svg)](https://nodejs.org/)
![typescript version](https://img.shields.io/badge/typescript-5.8.3-brightgreen)


## Clone and Install

* Clone repository
```sh
	git clone https://github.com/Kriz1618/users-api.git
    cd users-api
```

* Install modules
```sh
  npm i
```

## Pre-config

* Update Module Aliases
In the `_moduleAliases` section change `dist` to `src` to run locally


* Creating the .env file
```sh
    cp .env-example .env
```
Set the appropriated values


## Start development env

```sh
    npm run dev
```

## Files structure

```sh
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.ts
│   ├── config
│   │   ├── config.ts
│   │   ├── logger.ts
│   │   └── mongodb.ts
│   ├── controllers
│   │   ├── auth
│   │   │   └── authControllers.ts
│   │   ├── index.ts
│   │   ├── postControllers.ts
│   │   ├── rolesControllers.ts
│   │   └── usersControllers.ts
│   ├── middlewares
│   │   ├── auth.ts
│   │   └── roles.ts
│   ├── models
│   │   ├── Posts.ts
│   │   ├── Roles.ts
│   │   └── Users.ts
│   ├── repositories
│   │   ├── postRepository.ts
│   │   ├── rolesRepository.ts
│   │   └── userRepository.ts
│   ├── routes
│   │   └── routes.ts
│   ├── server
│   │   └── server.ts
│   ├── services
│   │   ├── postService.ts
│   │   ├── rolesService.ts
│   │   └── userService.ts
│   └── types
│       ├── Config.ts
│       ├── Handler.ts
│       ├── PermissionsTypes.ts
│       ├── PostsTypes.ts
│       ├── RepositoryTypes.ts
│       ├── RolesTypes.ts
│       └── UsersTypes.ts
├── tsconfig.json
└── @types
    └── express
        └── index.d.ts
```

## Author

👤 **Christian**

* Github: [@Kriz1618](https://github.com/Kriz1618)



