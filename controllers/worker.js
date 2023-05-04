const workers=require('../models/workerData');

module.exports.new=(req,res)=>{
    res.render("workers/newworker.ejs");
}

module.exports.createNew= async (req,res)=>{
    try {
        if (req.user) {
            console.log(req.body);
            console.log(req.user);
            await workers.create({...req.body,user:req.user});
            req.flash("success","work post created");
        
            return res.redirect("/workers/show");
        }
        else{
            return res.redirect("/users/signin");
        }
    } catch (error) {
        console.log("oh no error", error);
        return res.render('back');
    }
   
}

module.exports.show=async (req,res)=>{
    try {
        if(req.user){
        const allworkers=await workers.find();
        req.flash('success','All Workers');
        return res.render("workers/showworkers.ejs",{allworkers});
        }
        else{
            req.flash("error","you should be signed in");
            return res.redirect("/users/signin");
        } 
    } catch (error) {
        console.log("oh no error", error);
        req.flash('error',error)
        return res.redirect('back');
        
    }
}

module.exports.showUpdate=async (req,res)=>{
      try {
        if(req.user){
            const post=await workers.findById(req.params.id);
            if(post){
                if(req.user.id==post.user)
                {   req.flash('success','you can update the post here')
                    return res.render('workers/updateWorker',{post});}
                else{
                    req.flash("error","You are not authorised for it");
                    return res.redirect('/workers/show');
                }

            }
            else{
                req.flash("error","worker post not found");
                return res.redirect("/workers/show");
                }
        }
        else{
            req.flash("error","you should be signed in");
            return res.redirect("/users/signin");
            }
      } catch (error) {
            console.log("oh no error", error);
            req.flash('error',error)
            return res.redirect('back');
      }
}

module.exports.update=async (req,res)=>{
    try {
    const workerId=req.params.id;
    const post=await workers.findById(workerId);
    if(req.user.id==post.user){
       // await post.findByIdAndUpdate(workerId,req.body);
       await post.update(req.body);
        req.flash("success","Post updated");
        return res.redirect("/workers/show");
    }
    else{
        req.flash("error","you are not allowed to do this action");
        return res.redirect("back");
        }
    } catch (error) {
        console.log("oh no error",error);
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.delete=async (req,res)=>{
    try {
    const workerId=req.params.id;
    const post=await workers.findById(workerId);
    if(req.user.id==post.user){
        await post.remove();
        req.flash("success","Post deleted");
        return res.redirect("/workers/show");
    }
    else{
        req.flash("error","you are not allowed to delete this action");
        return res.redirect("back");
        }
    } catch (error) {
        console.log("oh no error",error);
        req.flash('error',error);
        return res.redirect('back');
    }
}
