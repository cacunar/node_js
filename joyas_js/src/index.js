require('dotenv').config()
const app = require('./app')

const { PORT } = process.env


app.listen(PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})