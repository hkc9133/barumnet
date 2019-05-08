// let product = require('../../../models').product;
// const excelToJson = require('convert-excel-to-json');

// exports.uploadData = (req, res,filename) => {

//     console.log("실행함")
//     console.log(filename)
//     if (!req.file) {
//         console.log("No file received");
//         return res.send({
//           success: false
//         });
    
//       } else {
//         console.log('file received');
//         const result = excelToJson({
//           sourceFile : './uploads/'+filename,
//           header:{
//             rows: 1
//           },
//           columnToKey : { 
//             A : 'mfg_company', 
//             B : 'product_name', 
//             C : 'product_info',
//             D : 'product_quantity',
//             E : 'product_status'
//         }
//       });
//       const keys = Object.keys(result)

//       for(var i = 0; i<=keys.length-1; i++){
//         product.bulkCreate(result[i])
//       }

//       res.json(result)
//       }

// }