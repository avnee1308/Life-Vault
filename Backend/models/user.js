const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
{
  _id:
  {
    type: mongoose.Types.ObjectId
  },
  profile:
  {
    username:
    {
        type: String,
        required: true,
        unique: true
    },
    name:
    {
        first:
        {
            type: String,
            required: true
        },
        last:
        {
            
            type: String
        }
    },
    profileImage:
    {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    }
  },
  password:
  {
    type: String,
    required: true
  },
  contact:
  {
    email:
    {
        type: String,
        unique: true
    },
    
  }
});

bcrypt.genSalt(saltRounds, (err, salt) => 
{
    if (err)
    {
        return;
    }
});

bcrypt.hash(password, salt, (err, hash)=>
{
    if(err)
    {
        return;
    }
})

module.exports = new mongoose ("User", UserSchema);