require('dotenv').config();

const app = require('./servers/Index');
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Application running on port ${PORT}`));
