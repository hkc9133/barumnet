let product = require('../../../models').product;
const sequelize = require('../../../models').sequelize

const Op = sequelize.Op;


exports.getProduct = (req, res) => {
    let page = req.query.page - 1;      // page number
    let limit = 10;   // number of records per page
    let offset = page * limit;

    let searchItem = req.query.searchItem
    let searchString = req.query.searchString

    console.log("=======")
    console.log(searchItem)
    console.log(searchString)
    console.log("=======")

    var where = {}

    if(req.query.searchString !== undefined){
        if(req.query.searchItem == '1'){
            where.mfg_company = {
                [Op.like]: '%' + req.query.searchString + '%'
            };
        }else if(req.query.searchItem == '2'){
            where.product_name = {
                [Op.like]: '%' + req.query.searchString + '%'
            };
        }else if(req.query.searchItem == '3'){
            where.product_info = {
                [Op.like]: '%' + req.query.searchString + '%'
            };
        }
    }

    console.log(where)
    
        
    product.findAndCountAll({
        where: where,
        limit: limit,
        offset: offset
        // $sort: { id: 1 }
    }).then((data) => {
      let pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);
      let products = data.rows;
      res.status(200).json({'result': products, 'count': data.count, 'pages': pages});
   })
    .catch(function (error) {
        console.log(error)
      res.status(500).send('Internal Server Error');
     });
    

}