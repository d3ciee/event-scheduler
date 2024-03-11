import app from "./app"
import "./app"

const port = process.env.PORT || 8802
app.listen(port, ()=>{
    console.log("Server listening on "+port)
} )
