const app = require('./app');
require('dotenv').config();


const PORT_RUNNING = process.env.PORT_RUNNING || 3333;

app.listen(PORT_RUNNING, () => console.log(
    `Server running or port ${PORT_RUNNING}`
));