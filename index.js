const app = require('./app.js');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

const mongodbConnect = async () => {
    await mongoose.connect('mongodb://localhost:27017/techprimelabs')
}
mongodbConnect()
    .then(() => console.log("connected")).catch(()=>console.log("disconnect"))


app.listen(port, () => {
    console.log('server is live..... ' + port);
});