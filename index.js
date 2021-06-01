const express = require('express')
const app = express()


const PORT = 3006
app.listen(PORT, () => {
    `Server listens port: ${PORT}`
})