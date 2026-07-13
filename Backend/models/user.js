const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds=10;

const UserSchema = new mongoose.Schema(
{
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
        unique: true,
        required:true
    }
  },
 timestamps: 
 {
    createdOn: 'created_at', 
    updatedOn: 'updated_at'
 }
});

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(saltRounds, (err, salt) => 
    {
        if (err)
        {
            console.log("Could not generate salt");
            return;
        }
    })
    const hash = await bcrypt.hash(this.password, salt, (err, hash)=>
    {
        if(err)
        {
            console.log("Could not hash password");
            return;
        }
    })
    this.password = hash;
})



module.exports = mongoose.model("User", UserSchema);