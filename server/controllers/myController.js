const User = require('../models/userModel')


const patchMyData = async(req,res) =>{
  try{
    console.log('patch', req.body)
    const { _id} = req.user
    const { email, name, gender} = req.body
    const user = await User.findById(_id)
    console.log(user)
    user.email = email
    user.name = name
    user.gender = gender
    await user.save()
    res.status(200).json({
      status: 'success',
      user
    })

  }catch(error){
    console.log(error)
  }
  
}


module.exports = {patchMyData}