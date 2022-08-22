const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const path = require('path')
var multer=require('multer');
app.use(express.static(__dirname+"/uploads"));
mongoose.connect('mongodb+srv://nagachandrika:chandu@cluster0.3fzz7.mongodb.net/BlogApplicationDB?retryWrites=true&w=majority');
const userDetailsSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    password:String,
    confirmpassword:String
})
const postsSchema=new mongoose.Schema({
    user:String,
    title:String,
    content:String,
    postimagesrc:String,
    likescount:Number,
    dislikesCount:Number,
    comments:Array
})
const adsSchema=new mongoose.Schema({
    user:String,
    title:String,
    adimagesrc:String,
    description:String,
    price:String,
})
const userDetailsModel=mongoose.model('Userdetail',userDetailsSchema);
const postsModel=mongoose.model('Post',postsSchema);
const adsModel=mongoose.model('Ad',adsSchema);
app.get("/data",function(req,res){
    userDetailsModel.find({},function(err,data)
    {
        if(!err)
        {
            res.send(data);
        }
    })
})
app.post("/adduser",function(req,res)
{
    console.log(req.body);
    var newdoc=new userDetailsModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword
    })
    newdoc.save(function(err,data)
    {
        if(!err)
        {
            res.send({msg:"added"});
        }
    })
})

app.get('/getposts',function(req,res){
    postsModel.find({},function(err,data)
    {
        if(!err)
        {
            res.send(data);
        }
    })
})
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads')     
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 

app.post("/addpost",upload.single('file'),function(req,res)
{
    console.log(req.body);
    if(!req.file)
    {
        console.log("no file uploaded");
    }
    else{
        console.log(req.file.filename);
        var newdoc=new postsModel({
            user:req.body.user,
            title:req.body.title,
            content:req.body.content,
            postimagesrc:req.file.filename,
            likescount:0,
            dislikesCount:0,
            comments:[],
        })
        newdoc.save(function(err,data)
        {
            if(!err)
            {
                res.send({msg:'done'})
            }
        })
    }
})
app.delete('/deletepost/:id',function(req,res)
{
    postsModel.deleteOne({_id:req.params.id},function(err,data){
        if(!err){
            res.send({msg:"deleted"});
        }
    })
})
app.put('/putpost',function(req,res)
{
    console.log(req.body);
    postsModel.findByIdAndUpdate(req.body._id,{
        user:req.body.user,
        title:req.body.title,
        content:req.body.content,
        likescount:req.body.likescount,
        dislikesCount:req.body.dislikesCount,
        comments:req.body.comments,
    },
    function(err,data)
    {
        if(!err){
            res.send({msg:"updated"})
        }
    }
    )
})
app.get('/getads',function(req,res)
{
    adsModel.find({},function(err,data)
    {
        if(!err)
        {
            res.send(data);
        }
    })
})
app.post('/addad',upload.single('file'),function(req,res)
{
    console.log(req.body);
    if(!req.file)
    {
        console.log("no file uploaded");
    }
    else{
        console.log(req.file.filename);
    var newdoc=new adsModel({
        user:req.body.user,
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        adimagesrc:'http://localhost:3600/'+req.file.filename,
    })
    newdoc.save(function(err,data)
    {
        if(!err)
        {
            res.send({msg:"added"});
        }
        else{
            console.log(err);
        }
    })
    }
})
app.listen(process.env.PORT || 3200,function(){console.log('server running on 3600')});
// app.listen(3600,function(){console.log('server running on 3600')})
