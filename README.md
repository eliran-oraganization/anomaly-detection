# GitHub Detection

## Description

to implement a simple command line application that will detect and notify suspicious behavior in an integrated GitHub organization.

Suspicious behaviors:
1. pushing code between 14:00-16:00
2. create a team with the prefix “hacker”
3. creating a repository and deleting it in less than 10 minutes

## Preparation

- Create a GitHub organization
- Create 3 webhooks:
  1. Team is created, deleted, edited, or added to/removed from a repository - `<url>/events/github/teams`
  2. Repository created, deleted, archived, unarchived, publicized, privatized, edited, renamed, or transferred - `<url>/events/github/repositories`
  3. Just push event -  `<url>/events/github/push`

## Installation

Use the following command to install the project dependencies:

`npm install`

## Build

`npm run build`


## Configuration

Create a `.env` file in the project root directory and add the following environment variables:

```
LOG_LEVEL=info
PORT=3000
NODE_ENV=develop
# https://stackoverflow.com/questions/8083410/how-can-i-set-the-default-timezone-in-node-js
TZ=Asia/Jerusalem # Can be change according to the user timezone  
```



## Usage

1. Start the application using the command: ``` npm start ```

2. Access the application at `http://localhost:3000` (or the configured `PORT`).

3. Interact with the application to trigger the configured webhooks and see the results.

## License

[MIT License](LICENSE)
