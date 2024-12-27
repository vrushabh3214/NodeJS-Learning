


module.exports.dashboard = (req,res)=>{

    try{
        res.render('dashboard')
    }
    catch(arr){
        console.error(arr);
    }

}
module.exports.AddNewAdmin = (req,res)=>{
    try{
        res.render('addAdmin')
    }
    catch(arr){
        console.error(arr);
    }
}
module.exports.ViewAdmin = (req,res)=>{
    try{
        res.render('dashboard')
    }
    catch(arr){
        console.error(arr);
    }
    res.render('ViewAdmin')
}