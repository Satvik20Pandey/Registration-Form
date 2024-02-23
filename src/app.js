const express = require('express');
const app = express();
const port = 3000; // Define the port number
const path = require('path');

const empCollection = require('./model/model');

const template_path = path.join(__dirname, '../template/views');
app.set('view engine', 'hbs');
app.set('views', template_path);

require('./db/db');

// Body parser middleware
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/empdata', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password === cpassword) {
            const empData = new empCollection({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                cpassword: req.body.cpassword,
            });

            const postData = await empData.save();
            res.send(postData);
        } else {
            res.send("Passwords do not match.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
});
