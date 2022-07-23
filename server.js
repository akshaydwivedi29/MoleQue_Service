const express = require('express');
const TestList = require('./liveSearch');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Password29.@cluster0.0f0rj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {
    console.log('Connected');
});


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/getTestList', async (req, res) => {
    let payload = req.body.payload;
    let search = await TestList.find({
        testname: {
            $regex: new RegExp('^' + payload + '.*',
                'i')
        }
    }).exec();
    // Limit Search Results to 5
    search = search.slice(0, 5);

    res.send({ payload: search });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server has started on PORT 3000');
});
