const express =require("express");
const bodyParser=require("body-parser");

const _ =require("lodash");
const mongoose=require("mongoose");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/blogDB").then(() => {
    console.log("Connection sucessfully");
}).catch((err) => {
    console.log(err);
})

const postschema ={
    title:String,
    content:String
};

const Post=mongoose.model("post",postschema);


const Homestartingcontent=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus corporis consequuntur dolorum necessitatibus, deleniti dolor! Delectus blanditiis ratione, perspiciatis suscipit, architecto totam quos sequi dolorem sunt sint non deserunt natus animi, modi voluptatum eveniet aperiam nesciunt quibusdam cupiditate tenetur consequuntur rerum reprehenderit iusto! Sunt adipisci vitae vero voluptas aspernatur qui excepturi expedita aliquid quo?"

// const Homestartingcontent="MENUS"
const aboutcontent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione obcaecati repellendus neque ipsa iure fugit accusamus suscipit ullam eveniet porro, aliquam temporibus rem animi officiis maiores eligendi saepe ipsum! Officia eligendi nisi veniam necessitatibus nostrum voluptatibus voluptas cumque suscipit numquam ullam! Distinctio, dignissimos sed."

const contactcontent="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis nisi numquam fugiat ex nam sequi corrupti sed harum rem, quis aliquam eligendi possimus corporis at minima voluptatibus recusandae modi cumque quidem porro fuga ut?"

// let posts = [];


app.get("/",(req,res)=>{
    Post.find({},function(err,posts){
        res.render("home", {
            startingcontent:Homestartingcontent,
            posts:posts
        })
    })
})

// app.get("/", (req,res)=>{
    
//     res.render("home",{
//         startingcontent : Homestartingcontent,
//         posts: posts
//      } );
    
// })


app.get("/about",(req,res)=>{
    res.render("about",{aboutcontent:aboutcontent});
})

app.get("/contact",(req,res)=>{
    res.render("contact",{contactcontent:contactcontent});
})


app.get("/compose",(req,res)=>{
    res.render("compose");
})

app.post("/compose" , (req,res)=>{
    // console.log(req.body.PostBody);
    const post= new Post({
        title :req.body.postTitle,
        content:req.body.postBody
    });
    
    post.save(function(err){
        if(!err){
            res.redirect("/");
        }
    });

    // posts.push(post);
    

});


app.get("/posts/:post_id",(req,res)=>{
    // console.log(req.params.postname);
    // const requested=_.lowerCase(req.params.postname);
    const requested=req.params.post_id;
    Post.findOne({_id:requested},function(err, post){
        res.render("post",{
            title:post.title,
            content:post.content
        });
    } )

    // posts.forEach(function(post){
    //     const secondtitle=_.lowerCase(post.title);

    //     if(secondtitle === requested){
    //         res.render("post", {
    //             title: post.title,
    //             content:post.content
    //         });
    //     }
        
    // })

    
})


app.listen(3000,function(){
    console.log("app is listen on port 3000");
})