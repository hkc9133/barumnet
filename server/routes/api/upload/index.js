const router = require('express').Router()
const multer = require('multer');
const path = require('path');
let product = require('../../../models').product;
const sequelize = require('../../../models').sequelize
const excelToJson = require('convert-excel-to-json');
const authMiddleware = require('../../../middlewares/auth')

var filename = "";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      filename = 'product_data'+ path.extname(file.originalname)
      cb(null, filename);
    }
});
let upload = multer({storage: storage});

router.use('/',authMiddleware)

router.post('/', upload.single("file"), function(req, res, next) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');

        makeJson(filename)
        .then(result =>{
            product.destroy({
                where: {},
                truncate: true
            })
            return result
        }).then(result => {
            sequelize.query("ALTER TABLE product AUTO_INCREMENT=1")
            return result
        }).then(result => {
            const keys = Object.keys(result)

            for(var i = 0; i<=keys.length-1; i++){
                product.bulkCreate(result[keys[i]])
            }

        }).then(function(){
            return res.send({
                success: true
            });
        })
      }


      
});

router.post('/', upload.single("file"), function(req, res, next) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');

        makeJson(filename)
        .then(result =>{
            product.destroy({
                where: {},
                truncate: true
            })
            return result
        }).then(result => {
            sequelize.query("ALTER TABLE product AUTO_INCREMENT=1")
            return result
        }).then(result => {
            const keys = Object.keys(result)

            for(var i = 0; i<=keys.length-1; i++){
                product.bulkCreate(result[keys[i]])
            }

        }).then(function(){
            return res.send({
                success: true
            });
        })
      }


      
});

function makeJson(filename){
    return new Promise (function(resolve, reject){
        const result = excelToJson({
            sourceFile : './uploads/'+filename,
            header:{
              rows: 1
            },
            columnToKey : { 
              A : 'mfg_company', 
              B : 'product_name', 
              C : 'product_info',
              D : 'product_quantity',
              E : 'product_status'
          }
        })

        if(reject != null){
            resolve(result)
        }else{
            reject(false)
        }
    })

}


module.exports = router