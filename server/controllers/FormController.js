const User = require('../models/User');
const Seeker = require('../models/Seeker')
const { cloudinary } = require('../utils/cloudinaryConfig');
const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

async function handleFormSubmission(req, res) {
    try {
        const body = req.body;
        const certificateURL = req.file ? req.file.path : null;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: body.email,
            subject: 'Saviour Confirmation',
            text: `Dear ${body.firstName} ${body.lastName},
      
      Thank you for submitting the form. You Became a Donor Now!
      
      Your Details:
      - Registration Number: ${body.registrationNumber}
      - Date of Birth: ${body.dob}
      - Mobile Number: ${body.mobileNumber}
      - Blood Group: ${body.bloodGroup}
      - Weight: ${body.weight} kg
      - Height: ${body.height} cm
      
      We appreciate your Willingness.
      
      Best regards,
      Saviour Team`,
          };

        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            registrationNumber: body.registrationNumber,
            dob: body.dob,
            email: body.email,
            mobileNumber: body.mobileNumber,
            bloodGroup: body.bloodGroup,
            lastDonated: body.lastDonated,
            certificate: certificateURL, 
            weight: body.weight,
            height: body.height,
            isCancer: body.isCancer,
            isCardiacProblem: body.isCardiacProblem,
            isBleedingDisorder: body.isBleedingDisorder,
            isInfections: body.isInfections,
            isDiabetes: body.isDiabetes,
            isInjectedDrugs: body.isInjectedDrugs,
            isWilling: body.isWilling,
            isHighRiskIndividual: body.isHighRiskIndividual,
        });

        await transporter.sendMail(mailOptions);

        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting file from server:', err);
                }
            });
        }

        res.status(201).json({ message: 'User created successfully', user: result });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

async function getFormData(req, res) {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
}

// async function handleSeekerSubmittions(req,res) {
//     try {
//         const body = req.body;
//         const result = await Seeker.create({
//             firstName: body.firstName,
//             lastName: body.lastName,
//             registrationNumber: body.registrationNumber,
//             dob: body.dob,
//             email: body.email,
//             mobileNumber: body.mobileNumber,
//             bloodGroup: body.bloodGroup,
//             description: body.description,
//         });
//     } catch (error) {
//         console.error('Error creating Seeker:', error);
//         res.status(500).json({ message: 'Error creating Seeker', error: error.message });
//     }
// }

async function handleSeekerSubmittions(req, res) {
    try {
        const body = req.body;

        // Create a new seeker entry in the database
        const result = await Seeker.create({
            firstName: body.firstName,
            lastName: body.lastName,
            registrationNumber: body.registrationNumber,
            dob: body.dob,
            email: body.email,
            mobileNumber: body.mobileNumber,
            bloodGroup: body.bloodGroup,
            description: body.description,
        });

        // Find donors with the requested blood group
        const matchingDonors = await User.find({ bloodGroup: body.bloodGroup });

        if (matchingDonors.length > 0) {
            const donorEmails = matchingDonors.map(donor => donor.email);

            // Email to matching donors
            const donorMailOptions = {
                from: process.env.EMAIL_USER,
                to: donorEmails.join(','),
                subject: 'Urgent: Blood Donation Needed',
                text: `Dear Donor,

A person is in urgent need of blood donation. Below are the details:

- Name: ${body.firstName} ${body.lastName}
- Blood Group: ${body.bloodGroup}
- Contact: ${body.mobileNumber}
- Description: ${body.description}

Please reach out if you are available to help.

Best Regards,
Saviour Team`
            };

            await transporter.sendMail(donorMailOptions);
        }

        // Notify your team about the seeker request
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL, // Replace with your team's email
            subject: 'New Blood Seeker Request',
            text: `A new blood seeker request has been submitted.

Details:
- Name: ${body.firstName} ${body.lastName}
- Blood Group: ${body.bloodGroup}
- Contact: ${body.mobileNumber}
- Email: ${body.email}
- Description: ${body.description}

Please take necessary actions.

Best Regards,
Saviour Team`
        };

        await transporter.sendMail(adminMailOptions);

        res.status(201).json({ message: 'Seeker registered successfully, notifications sent.', seeker: result });
    } catch (error) {
        console.error('Error creating Seeker:', error);
        res.status(500).json({ message: 'Error creating Seeker', error: error.message });
    }
}


module.exports = { handleFormSubmission, getFormData, handleSeekerSubmittions };
