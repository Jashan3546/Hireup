const recruiters=require('../models/recruiterData');

module.exports.new=(req,res)=>{
    res.render("recruiters/newrecruiter.ejs");
}

module.exports.createNew= async (req,res)=>{
    try {
        if (req.user) {
            console.log(req.body);
            console.log(req.user);
            await recruiters.create({...req.body,user:req.user});
            req.flash("success","Job post created");
        
            return res.redirect("/recruiters/show");
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
        const allrecruiters=await recruiters.find();
        req.flash('success','All recruiters');
        return res.render("recruiters/showrecruiters.ejs",{allrecruiters});
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
            const post=await recruiters.findById(req.params.id);
            if(post){
                if(req.user.id==post.user)
                {   req.flash('success','you can update the post here')
                    return res.render('recruiters/updaterecruiter',{post});}
                else{
                    req.flash("error","You are not authorised for it");
                    return res.redirect('/recruiters/show');
                }

            }
            else{
                req.flash("error","recruiter post not found");
                return res.redirect("/recruiters/show");
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
    const recruiterId=req.params.id;
    const post=await recruiters.findById(recruiterId);
    if(req.user.id==post.user){
       // await post.findByIdAndUpdate(recruiterId,req.body);
       await post.update(req.body);
        req.flash("success","Post updated");
        return res.redirect("/recruiters/show");
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
    const recruiterId=req.params.id;
    const post=await recruiters.findById(recruiterId);
    if(req.user.id==post.user){
        await post.remove();
        req.flash("success","Post deleted");
        return res.redirect("/recruiters/show");
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
