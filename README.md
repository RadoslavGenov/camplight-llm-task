# **LLM Text Styler**

A REST API which uses OpenAI's model to improve a text sent by the user. Implemented with **Express**, and includes:

- **Redis-based caching** to optimize requests (faster response and limits rate usage on the model).
- **BullMQ** for queue-based job management for scalability.

---

## **Installation**

```bash
npm install

cp .env.dist .env  # Update environment variables accordingly

node app.js

# make sure you have redis server started

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

