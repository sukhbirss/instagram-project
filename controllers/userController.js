const User = require('./../models/userModel');
const catchAsync = require('./../util/catchAsync');


exports.getUser = catchAsync(async(req,res,next) => {
  const user = await User.find()
  console.log(user)
  res.status(200).json({
    status:'success',
    user
  })

});
exports.addFollower = catchAsync(async(req,res,next) => {
 	
    const user = await User.findByIdAndUpdate(req.user.id,{
        $push:{following:req.body.id}
    },{
        new:true
    });
    await User.findByIdAndUpdate(req.body.id,{
        $push:{follower:req.user.id}
    },{
        new:true
    });

  console.log(user,"//////////////",req.body.id)
  res.status(200).json({
    status:'success',
    user
  })
});
exports.unfollow = catchAsync(async(req,res,next) => {
 	
    const user = await User.findByIdAndUpdate(req.user.id,{
        $pull:{following:req.body.id}
    },{
        new:true
    });
 	 await User.findByIdAndUpdate(req.body.id,{
        $pull:{following:req.user.id}
    },{
        new:true
    });

  console.log(user,req.body.id)
  res.status(200).json({
    status:'success',
    user
  })
});
exports.getFollower = catchAsync(async(req,res,next) => {
  const user = await User.findByIdAndUpdate(req.user.id).populate({path:'follower',select:'name photo'});
  console.log(user)
  res.status(200).json({
    status:'success',
    user
  })

});
exports.getFollowing = catchAsync(async(req,res,next) => {
  const user = await User.findByIdAndUpdate(req.user.id).populate({path:'following',select:'name photo'});
  console.log(user)
  res.status(200).json({
    status:'success',
    user
  })

});