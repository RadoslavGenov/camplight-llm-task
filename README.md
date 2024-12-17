# LLM Text Styler

A REST API which uses open AI model to improve a text sent by the user. Implemented with express, and includes a redis-based caching to optimize requests (faster response and limits rate usage on the model), and bullmq for queue-based job management for scalibility.

## Installation

npm install

cp .env.dist .env // update env variables accordingly

node app.js

## Example API call

curl "http://localhost:3000/improve?text=Please%20improve%20this%20sample%20text."

## Project structure

.
├── app.js
├── dump.rdb
├── package-lock.json
├── package.json
└── services
├── cacheService.js
├── llmService.js
└── queueService.js
