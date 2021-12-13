const router = require('express').Router();
const User = require('../model/User');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./public/image')
    },
    filename:(req,file,cb) => {
        cb(null,Date.now() + file.originalname)
    },
});

const upload = multer({
    storage:storage
}).single('image')

router.get('/', (req,res) => {
    User.find()
    .then((data) => {
        if(data < 2) return res.render("UserList",{DNF:"Data Not Found", error:true}) //res.send("Data Not Available");
        //res.send(data);
        res.render("UserList",{title:`${data[0].name}`,bookList:data, data:true});
    })
    .catch((err) => {
        res.send(`Interal error ${err}`);
    })
});

router.get('/add', (req,res) => {
    res.render('UserAdd',{title:"User Add"});
});

router.post('/add', upload, (req,res) => {
    //let user = new User(req.body);
    let user = new User({
        name : req.body.name,         //both will work
        gender : req.body.gender,
        age : req.body.age,
        photo : req.file.filename
    });
    user.save()
    .then((data) => {
        //res.send(data);
        res.redirect('/user')
    })
    .catch((err) => {
        res.send("Internal server error");
    })
});

router.get('/:id', (req,res) => {
    let ID = req.params.id;
    //User.findById(ID)
    User.findById({"_id":ID})   //both will work
    .then((data) => {
        //res.send(data);
        res.render('UserEdit',{title:"User Edit",List:data});
    })
    .catch((error) => {
        res.send("User not found");
    });
});


router.post('/edit', upload, (req,res) => {

    if(req.file){
        let dataBody = {
            name : req.body.name,
            photo : req.file.filename,
            gender : req.body.gender,
            age : req.body.age
        }

        //User.findByIdAndUpdate({"_id" : req.body.id},req.body,{new:true})
        User.findByIdAndUpdate(req.body.id,dataBody,{new:true})    //^both will work
        .then((data) => {
            //res.send(`User with ${data._id} ID Updated`);
            res.redirect('/user');
        })
        .catch((err) => {
            res.send(`Data not updated ${err}`);
        })
    }
    else{
        let dataBody = {
            name : req.body.name,
            gender : req.body.gender,
            age : req.body.age
        }

        //User.findByIdAndUpdate({"_id" : req.body.id},req.body,{new:true})
        User.findByIdAndUpdate(req.body.id,dataBody,{new:true}).lean()    //^both will work
        .then((data) => {
            //res.send(`User with ${data._id} ID Updated`);
            res.redirect('/user');
        })
        .catch((err) => {
            res.send(`Data not updated ${err}`);
        })
    }

});

router.get('/delete/:id', (req,res) => {

    let ID = req.params.id;

    User.findByIdAndDelete(ID)
    .then((data) => {
        //res.send(`${data.name} is deleted`);
        res.redirect('/user');
    })
    .catch((err) => {
        res.send("Data not found");
    })
})


module.exports = router;