//includes
const express = require("express");
const app = express();
const UsrRouter = require("./router/UsrRouter");

app.set('view engine','pug');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));


//routers
app.use('/user',UsrRouter);


//server listen
app.listen(6969, () => {
    console.log("Server is connected at 6969");
});