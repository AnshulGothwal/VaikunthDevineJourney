const User = require ("../Models/User");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
            }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please enter a valid email"
        });
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }
        if (name.trim().length < 2) {
            return res.status(400).json({
                message: "Name must be at least 2 characters long"
            });
}
        //check if user already exists
        const existingUser = await User.findOne({ email});

        if(existingUser) {
            return res.status(400).json({ message: "Email already exists"});
        }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    res.status(201).json({ 
        message: "User created successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" }); 
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d"});
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateProfile = async (req, res) => {
    try{
        const { name} = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Name is required" });
        }
        const user = await User.findByIdAndUpdate(req.user.id, { name: name.trim()},
    { returnDocument: "after", runValidators: true }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image"
      });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "vaikunth/profiles" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: result.secure_url },
      { returnDocument: "after", runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Profile photo uploaded successfully",
      user
    });
  }catch (error) {
   console.error("Photo Upload Error:", error);

   return res.status(500).json({
    message: "Profile photo upload failed",
    error: error.message
  });
}
};

module.exports = { signup, login, getProfile, updateProfile, uploadProfilePhoto };