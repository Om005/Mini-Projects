import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import fileModel from '../models/fileModel.js';
import { WECOME_EMAIL_TEMPLATE, VERIFY_EMAIL_TEMPLATE, RESET_PASSWORD_TEMPLATE } from '../config/emailTemplates.js';

// import sendMail from '../config/nodemailer.js';
export const register = async(req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'});
    }
    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success: false, message: "User already exists"});
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new userModel({name, email, password: hashedPass});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge: 7*24*60*60*1000
        })
        const mailOptions ={
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to this website',
            // text: `Welcome to this website. Your account has been created with email id: ${email}`
            html: WECOME_EMAIL_TEMPLATE.replace("{{name}}", user.name)
        }
        
        try {
            // await sendMail(mailOptions)
            await transporter.sendMail(mailOptions)
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }
        
        
        return res.json({success: true})
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}



export const login = async(req, res)=>{
    // const optt = {
    //     email: "202301177@daiict.ac.in",
    //     structure: [
    //       {
    //         name: "root_folder",
    //         type: "folder",
    //         children: [
    //           {
    //             name: "main.py",
    //             type: "python",
    //             content: "def greet():\n    print('Hello, Python!')\n\ngreet()",
    //           },
    //           {
    //             name: "scripts",
    //             type: "folder",
    //             children: [
    //               {
    //                 name: "build.js",
    //                 type: "javascript",
    //                 content: "console.log('Building the project...');",
    //               },
    //               {
    //                 name: "utilities.ts",
    //                 type: "typescript",
    //                 content: "export const sum = (a: number, b: number): number => a + b;",
    //               },
    //             ],
    //           },
    //           {
    //             name: "docs",
    //             type: "folder",
    //             children: [
    //               {
    //                 name: "README.md",
    //                 type: "markdown",
    //                 content: "# Project Documentation\n\nThis is the main documentation for the project.",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         name: "src",
    //         type: "folder",
    //         children: [
    //           {
    //             name: "main.c",
    //             type: "c",
    //             content: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, C!\\n\");\n    return 0;\n}",
    //           },
    //           {
    //             name: "main.cpp",
    //             type: "cpp",
    //             content: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++!\" << std::endl;\n    return 0;\n}",
    //           },
    //           {
    //             name: "main.go",
    //             type: "go",
    //             content: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, Go!\")\n}",
    //           },
    //           {
    //             name: "main.swift",
    //             type: "swift",
    //             content: "import Foundation\n\nprint(\"Hello, Swift!\")",
    //           },
    //         ],
    //       },
    //       {
    //         name: "config",
    //         type: "folder",
    //         children: [
    //           {
    //             name: "setup.sh",
    //             type: "bash",
    //             content: "#!/bin/bash\n\necho \"Setting up the environment...\"",
    //           },
    //           {
    //             name: "config.rb",
    //             type: "ruby",
    //             content: "puts 'Configuration complete.'",
    //           },
    //           {
    //             name: "main.rs",
    //             type: "rust",
    //             content: "fn main() {\n    println!(\"Hello, Rust!\");\n}",
    //           },
    //         ],
    //       },
    //     ],
    //   };
      
    // const file = new fileModel(optt)
    // file.save()
    
//     const optt = {
//         "email": "202301177@daiict.ac.in",
//         "structure": [
//           {
//             "name": "root_folder",
//             "type": "folder",
//             "children": [
//               {
//                 "name": "main.py",
//                 "type": "file",
//                 "content": "def greet():\n    print('Hello, Python!')\n\ngreet()",
//                 "id": "b2c3d4e5-f678-90ab-cdef-234567890abc"
//               },
//               {
//                 "name": "scripts",
//                 "type": "folder",
//                 "children": [
//                   {
//                     "name": "build.js",
//                     "type": "file",
//                     "content": "console.log('Building the project...');",
//                     "id": "d4e5f678-90ab-cdef-1234-567890abcdef"
//                   },
//                   {
//                     "name": "utilities.ts",
//                     "type": "file",
//                     "content": "export const sum = (a: number, b: number): number => a + b;",
//                     "id": "e5f67890-abcd-ef12-3456-7890abcdef12"
//                   }
//                 ],
//                 "id": "c3d4e5f6-7890-abcd-ef12-34567890abcd"
//               },
//               {
//                 "name": "docs",
//                 "type": "folder",
//                 "children": [
//                   {
//                     "name": "README.md",
//                     "type": "file",
//                     "content": "# Project Documentation\n\nThis is the main documentation for the project.",
//                     "id": "67890abc-def1-2345-6789-0abcdef12345"
//                   }
//                 ],
//                 "id": "f67890ab-cdef-1234-5678-90abcdef1234"
//               }
//             ],
//             "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
//           },
//           {
//             "name": "src",
//             "type": "folder",
//             "children": [
//               {
//                 "name": "main.c",
//                 "type": "file",
//                 "content": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, C!\\n\");\n    return 0;\n}",
//                 "id": "890abcde-f123-4567-890a-bcdef1234567"
//               },
//               {
//                 "name": "main.cpp",
//                 "type": "file",
//                 "content": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++!\" << std::endl;\n    return 0;\n}",
//                 "id": "90abcdef-1234-5678-90ab-cdef12345678"
//               },
//               {
//                 "name": "main.go",
//                 "type": "file",
//                 "content": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, Go!\")\n}",
//                 "id": "0abcdef1-2345-6789-0abc-def123456789"
//               },
//               {
//                 "name": "main.swift",
//                 "type": "file",
//                 "content": "import Foundation\n\nprint(\"Hello, Swift!\")",
//                 "id": "abcdef12-3456-7890-abcd-ef1234567890"
//               }
//             ],
//             "id": "7890abcd-ef12-3456-7890-abcdef123456"
//           }
//         ]
//       }
      
// const optt = {
//     "email": "202301150@daiict.ac.in",
//     "path": "folder6/folder7/file.py",
//     "type": "python",
//     "content": "print('Hello World')"
//   }

// const file = new fileModel(optt)
// await file.save()
const {email, password} = req.body;
if(!email || !password){
    return res.json({success: false, message:'Email and password are required'});
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message:'Invalid email'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message:'Incorrect password'});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge: 7*24*60*60*1000
        })
        
        return res.json({success: true})
        
    }
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

export const logout = async(req, res)=>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
        })
        return res.json({success: true, message: 'Logged out'})
    }
    catch(error){
        return res.json({success: false, message: error.message});
        
    }
}


export const sendVerifyOtp = async(req, res)=>{
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        // console.log(user)
        if(user.isAccountVerified){
            return res.json({success: false, message:"Account Already Verified."});
        }
        const otp = String(Math.floor(100000 + Math.random()*900000))
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now()+ 24*60*60*1000;
        await user.save();
        
        const mailOptions ={
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Accout Verification OTP',
            // text: `Your OTP is ${otp}. Verify your account using this OTP.`
            html: VERIFY_EMAIL_TEMPLATE.replace("{{name}}", user.name).replace("{{otp}}", otp)
        }
        await transporter.sendMail(mailOptions);
        res.json({success:true, message: "Verification email sent on email."})
    } catch(error){
        // console.log(error.message)
        res.json({success: false, message: error.message})
    }
}


export const verifyEmail = async(req, res)=>{
    const {userId, otp} = req.body;

    if(!userId || !otp){
        return res.json({success:false, message: "Missing Details."})
    }
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User not found."})
        }
        if(user.verifyOtp==='' || user.verifyOtp!==otp){
            return res.json({success: false, message: "Invalid OTP."})
        }
        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP Expired."})
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        return res.json({success: true, message: "Email verified successfully"})
    }
    catch(error){
        return res.json({success: false, message: error.message})
    }
}



export const isAuthenticated = async(req, res)=>{
    try{
        return res.json({success:true}) 
    }catch(error){
        return res.json({success: false, message: error.message})
    }
}


export const sendResetOtp = async(req, res)=>{
    const {email} = req.body;
    if(!email){
        return res.json({success:false, message: "Email is required."})
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message: "User not found."})  
        }

        const otp = String(Math.floor(100000 + Math.random()*900000))
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now()+ 15*60*1000;
        await user.save();
        
        const mailOptions ={
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            // text: `Your OTP for resetting the password is ${otp}. Use this otp to proceed with resetting your password.`
            html: RESET_PASSWORD_TEMPLATE.replace("{{name}}", user.name).replace("{{otp}}", otp)
        }
        try{
            await transporter.sendMail(mailOptions);
        }catch(error){
            console.log(error.message)
        }
        
        res.json({success:true, message: "OTP sent to your email."})

    }catch(error){
        return res.json({success:false, message: error.message})  
    }
}

export const verifyResetOtp = async(req, res)=>{
    const {email, otp} = req.body;

    if(!email || !otp){
        return res.json({success:false, message: "Missing Details."})
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User not found."})
        }
        if(user.resetOtp==='' || user.resetOtp!==otp){
            return res.json({success: false, message: "Invalid OTP."})
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP Expired."})
        }
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.json({success: true, message: "Enter new password"})
    }
    catch(error){
        return res.json({success: false, message: error.message})
    }
}

export const resetPassword = async(req, res)=>{
    const {email, newPassword} = req.body;
    if(!newPassword){
        return res.json({success:false, message: "New password is required."});  
    }
    try{
        const user = await userModel.findOne({email});
        // console.log(user.name)
        if(!user){
            return res.json({success:false, message: "User not found."});  
        }
        const hashedPass = await bcrypt.hash(newPassword, 10);
        user.password = hashedPass
        await user.save();
        return res.json({success:true, message: "Password has been reset successfully."});  

    }catch(error){
        return res.json({success:false, message: error.message});  
    }
}
// export const resetPassword = async(req, res)=>{
//     const {email, otp, newPassword} = req.body;
//     if(!email || !otp || !newPassword){
//         return res.json({success:false, message: "Email, OTP and new password are required."});  
//     }
//     try{
//         const user = await userModel.findOne({email});
//         // console.log(user.name)
//         if(!user){
//             return res.json({success:false, message: "User not found."});  
//         }
//         if(user.resetOtp === '' || user.resetOtp!==otp){
//             return res.json({success:false, message: `${user.resetOtp} ans ${otp}`});  
//         }
//         if(user.resetOtpExpireAt < Date.now()){
//             return res.json({success:false, message: "OTP Expired."});  
//         }
//         const hashedPass = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPass
//         user.resetOtp =''
//         user.resetOtpExpireAt = 0
//         await user.save();
//         return res.json({success:true, message: "Password has been reset successfully."});  

//     }catch(error){
//         return res.json({success:false, message: error.message});  
//     }
// }