const router = require('express').Router()
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../../../middlewares/auth')
const fs = require('fs');
const sequelize = require('../../../models').sequelize
const popup_status = require('../../../models').popup_status

var filename = "";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      filename = 'popupImg'+ path.extname(file.originalname)
      cb(null, filename);
    }
});
let upload = multer({storage: storage});

// router.use('/uploadImage',authMiddleware)

router.post('/uploadImage', upload.single("file"), function(req, res, next) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    } else {
      popup_status.update({file_name: req.file.filename},{where:{}}).then(function(result) {
        return res.send({success: true});
        }).catch(function(err) {
              console.log(err)
        });
    }
});


router.get('/uploadImage',function(req, res, next) {
    popup_status.findOne({raw: true}).then(function(result){
      fs.readFile('uploads/'+result.file_name, function(error,data){
        res.writeHead(200, {'Content-Type':'image/gif'})
        res.end(data,'binary')
      })
    })
  
});

router.get('/isPopup',function(req, res, next) {
  sequelize.query("select * from popup_status",{ type: sequelize.QueryTypes.SELECT}).then(result => {
    return res.json(result[0])
  })

});

router.post('/isPopup',function(req, res, next) {
  let status  = req.body.status

  sequelize.query("update popup_status set popup_status = :status",{ replacements: { status: status }, type: sequelize.QueryTypes.UPDATE}).then(result => {
    return res.json(result)
  })

});


module.exports = router