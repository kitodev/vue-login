const express = require('express');
const jwt = require('jsonwebtoken');
const PORT = 3000
var cors = require('cors');
const app = express()

//app.use(express.urlencoded({ extended: true} ));

app.use(cors());
app.use(express.json());

app.get('/data', verifyToken, (req, res)=> {
    const { Authorization } = req.headers;
    const [, token] = Authorization.split("");
    
    try{
        jwt.verify(token, 'secretkey');
        res.json({
            message: 'yo'
        });
    }
    catch(err) {
        res.status(401);
        res.json({
            error: err,
        });
    }
})

app.post('/login', (req, res) => {
    const USERNAME = "admin";
    const PASSWORD = "Admin123";
    const { username, password } = req.body;

    if(username === USERNAME && password === PASSWORD) {
        const user = {
            user: 'admin',
            password: 'Admin123'
        };

       jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token,
            user,
        });
       });

    } else {
        res.status(401);
        res.json({
            message: "invalid login information"
        });
    }
})

function verifyToken(req, res, next) {
    const bearerheader = req.headers['authorization'];

    if(typeof bearerheader !== 'undefined') {

        const bearer = bearerheader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    } else {
        res.sendStatus(401)
    }
}

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
