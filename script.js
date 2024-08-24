const express=require("express");
const methodOverride=require('method-override');
const app=express();
const path=require("path");


const { v4: uuidv4 } = require('uuid');
let port=2030;
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.set("views",path.resolve("./views"));
app.use(express.static('public'));
app.use(methodOverride('_method'));
let tweets=[
  {
    id:uuidv4(),
    username:"TravelArcadia",
    image:"https://i.pinimg.com/736x/0b/7f/27/0b7f277758f59a1dc4b0444cd35036f3.jpg",
    content:"Discover the Magic of Bali with Travel Arcadia,Your ultimate Island Escape Awaits..!! Explore Ubud's serene rice terraces Seminyak's vibrant nightful &the pristine beaches of Nusa Dua!!Discover the Magic of Bali with Travel Arcadia,Your ultimate Island Escape Awaits..!! ",
  },
  {
    id:uuidv4(),
    username:"JourneyBeyondIncredible",
    image:"https://lp-cms-production.imgix.net/2021-04/shutterstockRF_1019924119.jpg",
    content:"Discover the wonders of Vietnam with Travel Arcadia at amazing rates!! Explore the ancient charm of Hanoi/,the vibrant energy of Ho Chi Minh City/,the stunning landscapes of Halong Bay/,the mystical beauty of Ba Na hill/,the golden sands of Danang.",
  },
  {
    id:uuidv4(),
    username:"DubaiTrips",
    image:"https://img.etimg.com/thumb/width-640,height-480,imgsize-104894,resizemode-75,msid-105355936/news/international/uae/dubai-and-the-uae-a-global-wealth-nexus.jpg",
    content:"Beautiful beaches, record-breaking attractions and experiences like no other -Dubai is the place to be in 2024. It's no wonder we are the first city to be named Tripadvisor's #1 Top Destination in the World for three years running. Let's explore",
  },
  {
    id:uuidv4(),
    username:"MichelleZauner",
    image:"https://www.thoughtco.com/thmb/rn4UnyqlJMWo5mqpEOYbenaOjWA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/old-fortress-gate-with-light-trails-at-downtown-455242307-58dea6143df78c5162e1ff3d.jpg",
    content:"This week we’re in South Korea, and we asked Michelle Zauner to share her favorite places and memories. Michelle is a singer and guitarist who creates dreamy, shoegaze-inspired indie pop under the name Japanese Breakfast.",
  },
  {
    id:uuidv4(),
    username:"GreeceMania",
    image:"https://static.toiimg.com/thumb/msid-100613928,width-748,height-499,resizemode=4,imgsize-224328/.jpg",
    content:"Besides the island’s sandy beaches, running waters, mountains and green hillsides its name, Ikaria, is intertwined with Greek mythology and Ikarus.  The unparalleled local lifestyle, along with the one of a kind work-rest schedule, the famous festivals and traditional dances, the local customs, are just some of the reasons why you should explore this impressive destination",
  },
];

app.get('/posts',(req,res)=>{
res.render('index',{tweets});
});
app.get("/posts/new",(req,res)=>{
res.render('new');
res.redirect("/posts");
});
app.post("/posts",(req,res)=>{
  let {username,image,content}=req.body;
  let id=uuidv4();
  tweets.push( {id,username,image,content});
  res.redirect("/posts");
  
});
app.get('/posts/:id',(req,res)=>{
let {id}=req.params;

let tweet=tweets.find((p)=>id===p.id);
console.log(tweet);
res.render("show",{tweet});

});

app.patch("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let newCont=req.body.content;
  let tweet=tweets.find((p)=>id===p.id);
  tweet.content=newCont;
  console.log(tweet);
  res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let newCont=req.body.content;
  let tweet=tweets.find((p)=>id===p.id);
  console.log(tweet);
  
});


app.get("/posts/:id/edit",(req,res)=>{
  let {id}=req.params;
  let newCont=req.body.content;
  let tweet=tweets.find((p)=>id===p.id);
res.render("edit",{tweet});
tweet.content=newCont;
});
app.delete("/posts/:id",(req,res)=>{
let id=req.params;
 tweets=tweets.filter((p)=>id!==p.id);

res.redirect("/posts");
});
app.listen(port,()=>{
  console.log("Listening to the port");
});