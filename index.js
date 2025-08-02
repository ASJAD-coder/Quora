import express from "express";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
const port = 3000;
import { v4 as uuidv4 } from 'uuid';
import methodOverride from 'method-override';
app.use(methodOverride('_method'));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended: true}));

app.set ("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));

let posts = [
    {
        id : uuidv4(),
        username : "asjad",
        content : "I am going to murree"
    },
    {
        id : uuidv4(),
        username : "hafsa",
        content : "WHY I M SO DUMB"
    },
    {
        id : uuidv4(),
        username : "AMNA",
        content : "HURRAH ! I WON THE PRIZE"
    }
]

app.get("/posts",(req, res)=>{
    res.render("index", {posts});
})

app.get("/posts/new",(req, res)=>{
    res.render("new");
})

app.post("/posts",(req,res)=>{
    let {username, content } = req.body;
    let id = uuidv4();
    posts.push({ id , username , content});
    res.redirect("/posts");
})
app.get("/posts/:id",(req, res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> id === p.id);
    console.log(id);
    res.render("show",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content= newcontent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit",{post});
    
})

app.delete("/posts/:id",(req , res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})


app.listen(port, ()=>{
    console.log(`the port is listening on port ${port}`);
})