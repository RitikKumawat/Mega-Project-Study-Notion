const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req,res) =>{
    try {
        //get userid and courseid
        const {courseId} = req.body;
        const userId = req.user.id;
        // validation
        //valid course id 
        if(!courseId){
            return res.json({
                success:false,
                message:"Please provide valid course id",
            })
        }
        //valid course detail
        let course;
        try {
            course = await Course.findById(courseId);
            if(!course){
                return res.json({
                    success:false,
                    message:"Could not find the course",
                })
            }
            //user already paid for the same course
            const uid = new mongoose.Types.ObjectId(userId); //converting userId which is in stiring format to objectID
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"student is already enrolled in the course"
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }

        //now create order
        const amount = (course.price);
        const currency = "INR";

        const options = {
            amount:amount*100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:courseId,
                userId,
            }
        }
        try {
           //initiate the payment using razorpay
           const paymentRespnse = await instance.orders.create(options);
           console.log(paymentRespnse); 
           //return response
           return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId: paymentRespnse.id,
                currency:paymentRespnse.currency,
                amount:paymentRespnse.amount,
           })
        } catch (error) {
            return res.json({
                success:false,
                message:"Cannot initiate payment",
            })
        }
        
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong in creating Razorpay order"
        })
    }
};

//verify signature of Razorpay and server
exports.verifySignature = async (req,res)=>{
    const webhookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256",webhookSecret); //sha256 is hashing algorithm
    shasum.update(JSON.stringify(req.body)); //converting object to string
    //when you run hashing algorithm on a text then the output is known as Digest
    //Digest is generally in hexadecimal form
    const digest = shasum.digest('hex');

    //match signature and digest
    if(signature === digest){
        console.log("Payment is authorized");
        //fetching course and user ID from notes in payment response
        const{courseId,userId} = req.body.payload.payment.entity.notes;
        try {
            //find the course and enroll the student in the corresponding course
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true},
            )
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"course not found",
                })
            }
            console.log(enrolledCourse);
            //find the student and update enrolled course
            const enrolledStudent = await User.findOneAndUpdate(
                {_id:userId},
                {$push:{courses:courseId}},
                {new:true},
            )
            console.log(enrolledStudent);

            //send confirmation mail
            const emailResponse = await mailSender(
                enrolledStudent.email,"Congratulations, from Codehelp",
                "Congratulations, you are onboarded into new Codehelp Course"); 
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Student is successfully enrolled",
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }

    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request",
        })
    }
};