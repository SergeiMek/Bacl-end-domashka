import {app} from "./settings";
import {runDb} from "./db/db";

const port = process.env.PORT || 80;


const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Listen on port ${port}`)
    })
}



startApp()