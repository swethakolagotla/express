const welcomeuser=(req,res)=>{
    console.log("reached the route handler")
    res.send("welcome to express")
}
const  johnspath = (req, res) => {
  console.log("reached the route handler");
  res.send("john is the man");
};
export {welcomeuser,johnspath}