import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true, maxLength:[25,"Name can't be greater than 25 characters"]},
     email: {type: String, unique: true, required: true,
        match: [/.+\@.+\../, "Please enter a valid email"],
    },
    password: {type:String, required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
      validate: {
      validator: function(password) {
        // At least one uppercase letter
        if (!/[A-Z]/.test(password)) return false;
        // At least one lowercase letter
        if (!/[a-z]/.test(password)) return false;
        // At least one number
        if (!/[0-9]/.test(password)) return false;
        // At least one special character
        if (!/[!@#$%^&*]/.test(password)) return false;
        return true;
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)'
    },
    select: false  // Won't return password in queries by default
     },
      resetOTP: { type: String },
    otpExpiry: { type: Date }
})

export const userModel = mongoose.model('User',userSchema);