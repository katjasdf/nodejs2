const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()

app.use("/", express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get("/api/exercise", (req, res) => {
    res.status(200)
    res.send(req.query)
});

app.post("/api/exercise", (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.status(200)
    const body = JSON.stringify(req.body)
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const gender = req.body.gender
    const fruit = req.body.fruit
    const submit = req.body.submit

    if (req.body.hasOwnProperty('firstname')) {
        res.send(
        "<h1>Hello from Express</h1>"+
        "<h2>POST parameters</h2>"+
        "<p>I received these parameters:" + body + "</p>"+
        "<ul><li>firstname: " + firstname +"</li>"+ 
        "<li>lastname: "+ lastname +"</li>"+
        "<li>submit: "+ submit +"</li></ul>")
    } else {
        res.send(
        "<h1>Hello from Express</h1>"+
        "<h2>POST parameters</h2>"+
        "<p>I received these parameters:" + body + "</p>"+
        "<ul><li>fruit: " + fruit +"</li>"+ 
        "<li>gender: "+ gender +"</li>"+
        "<li>submit: "+ submit +"</li></ul>")
    }
})

app.post("/api/login", (req, res) => {
    const user = req.body.user
    const pwd = req.body.pwd
    if(user == "" || pwd =="") {
        res.status(400).send("400 Bad Request<br>Username or password missing")
    }
    else if(user == "mark" && pwd == "giraffe"){
        res.status(200).send({user: user})
    } else {
        res.status(403).send("403 Forbidden")
    }
})

app.get('/hello', (req, res) => {
    res.sendFile(__dirname+'/hello/index.html')
})

app.get('/api', (req, res) =>{
    res.status(200)
    res.send({msg: 'Hello, World!'})
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})