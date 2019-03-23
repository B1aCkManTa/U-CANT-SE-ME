
// const express = require("express");
// const router = express.Router();

// const Case = require("../models/Case");
// const Investor = require("../models/Investor");
// const caseValidator = require("../validations/caseValidations");
// const q = require("validator");

// const investorAuthenticated = true;

// router.post("/:investorId", async (req, res) => {
//   try {
//     if (investorAuthenticated) {
//       req.body.creatorInvestorId = req.params.investorId;

//       createCase(req, res); //Fadi's create-case
//       // res.send({msg : "Form Submitted Successfully"});
//     } else {
//       return res.status(403).send({ error: "Forbidden." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ msg: "An error has occured." });
//   }
// });

// async function createCase(req, res) {
//   try {
//     const isValidated = caseValidator.createValidation(req.body);
//     const investorID = req.body.creatorInvestorId;
//     const companyName1 = req.body.companyNameArabic;
//     if (companyName1) {
//       const company1 = await Case.findOne(
//         { companyNameArabic: companyName1 },
//         function(err, obj) {}
//       );
//       if (company1)
//         return res
//           .status(400)
//           .send({ err: "company name entered already existent" });
//     }
//     const companyName2 = req.body.companyNameEnglish;
//     if (companyName2) {
//       const company2 = await Case.findOne(
//         { companyNameEnglish: companyName2 },
//         function(err, obj) {}
//       );
//       if (company2)
//         return res
//           .status(400)
//           .send({ err: "company name entered already existent" });
//     }

//     if (!investorID)
//       return res.status(400).send({ err: "No investor entered" });
//     if (!q.isMongoId(investorID))
//       return res.status(404).send({ error: "Invalid ID" });
//     const inves = await Investor.findById(investorID);
//     if (!inves)
//       return res.status(400).send({ err: "investor entered not found" });

//     const clawyerID = req.body.creatorLawyerId;
//     if (clawyerID) {
//       if (!q.isMongoId(clawyerID))
//         return res.status(404).send({ error: "Invalid ID" });
//       const lawyer = await Lawyer.findById(clawyerID);
//       if (!lawyer)
//         return res
//           .status(400)
//           .send({ err: "creator lawyer entered not found" });
//     }

//     const newLawyer = req.body.assignedLawyerId;
//     if (newLawyer) {
//       if (!q.isMongoId(newLawyer))
//         return res.status(404).send({ error: "Invalid ID" });
//       const lawyer2 = await Lawyer.findById(newLawyer);
//       if (!lawyer2)
//         return res.status(400).send({ err: "lawyer entered not found" });
//     }

//     const newReviewer = req.body.assignedReviewerId;
//     if (newReviewer) {
//       if (!q.isMongoId(newReviewer))
//         return res.status(404).send({ error: "Invalid ID" });
//       const reviewer = await Reviewer.findById(newReviewer);
//       if (!reviewer)
//         return res.status(400).send({ err: "reviewer entered not found" });
//     }

//     const cap = req.body.capital;
//     const type = req.body.companyType;
//     if (cap) {
//       if (type) {
//         if (type === "SSC") {
//           if (cap < 50000 || cap.toString().length > 12) {
//             return res.status(400).send({ err: "invalid capital" });
//           }
//         }
//       }
//     }
//     if (cap) {
//       if (type) {
//         if (type === "SPC") {
//           const checkInvestor = await Investor.findById(
//             req.body.creatorInvestorId
//           );
//           if (checkInvestor) {
//             if (checkInvestor.nationality !== "Egyptian") {
//               if (cap < 100000) {
//                 return res.status(400).send({ err: "invalid capital" });
//               }
//             }
//           }
//         }
//       }
//     }

//     if (type) {
//       if (type === "SSC") {
//         const checkCase = await Case.findOne(
//           { creatorInvestorId: investorID, companyType: "SSC" },
//           function(err, obj) {}
//         );
//         if (checkCase) {
//           return res
//             .status(400)
//             .send({ err: "Investor entered has an existent SSC case" });
//         }
//       }
//     }

//     if (isValidated.error)
//       return res
//         .status(400)
//         .send({ error: isValidated.error.details[0].message });
//     if (req.body.Idtype === "SSN")
//       if (req.body.Idnumber.toString().length !== 14)
//         return res.status(400).send({ err: "Invalid SSN" });
//     if (req.body.managerIdType === "SSN")
//       if (req.body.managerIdNumber.toString().length !== 14)
//         return res.status(400).send({ err: "Invalid SSN" });

//     const newCase = await Case.create(req.body);
//     res.json({ msg: "Case was created successfully", data: newCase });
//   } catch (error) {
//     // We will be handling the error later
//     console.log(error);
//   }
// }

// module.exports = router;