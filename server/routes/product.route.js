// const express = require('express');
// var router = express.Router();
// let productModel = require('../models').product;

// // Defined store route
// // businessRoutes.route('/get').post(function (req, res) {

// //     const product = await productModel.findAll();
// //     res.status(200).json(product)

// //   let business = new Business(req.body);
// //   business.save()
// //     .then(business => {
// //       res.status(200).json({'business': 'business in added successfully'});
// //     })
// //     .catch(err => {
// //     res.status(400).send("unable to save to database");
// //     });
// // });

// router.get('/get', async(req, res, next) =>{
//     // try{
//     //   const product = await productModel.findAll().then(function(results){
//     //     console.log(product)
//     //     res.json(product)

//     //   }
//     // } catch(error) {
//     //   console.error(error);
//     //   next(error);
//     // }
//     productModel.findAll({
//         raw: true
//     }).then(results => {
//         res.json(results);
//         }).catch(function(err) {
//             console.error(error);
//             next(error);
//         });
  
//   });

//   module.exports = router;