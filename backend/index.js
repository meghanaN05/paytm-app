const express = require('express');
require("dotenv").config()
const cors=require("cors")
const app = express();
const port = 3000;
const rootRouter=require("./routes/index")
app.use(express.json())
app.use("/api/v1",rootRouter)
app.use(cors())





app.listen(port || process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

