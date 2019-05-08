const jwt = require('jsonwebtoken')
const crypto = require('crypto')
let User = require('../../../models').user;
const config = require('../../../config')
const jwtDecode = require('jwt-decode');

const algorithm = "aes256";
const key = config.aesSecret;

exports.register = (req, res) => {
    var username = req.body.username
    var password = req.body.password

    var cipher = crypto.createCipher(algorithm, key);
    cipher.update(password, "utf8", "hex");
    var password = cipher.final("hex");

    
    let newUser = null

    // create a new user if does not exist
    const create = (user) => {
        if(user) {
            throw new Error('username exists')
        } else {
            return User.create({
                user_id : username,
                password : password
            })
        }
    }

    // count the number of the user
    const count = (user) => {
        newUser = user
        return User.count({}).exec()
    }

    // assign admin if count is 1
    const assign = (count) => {
        if(count === 1) {
            return newUser.assignAdmin()
        } else {
            // if not, return a promise that returns false
            return Promise.resolve(false)
        }
    }

    // respond to the client
    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOne({where:{
        user_id : username
    }})
    .then(create)
    .then(respond)
    .catch(onError)
}

exports.login = (req, res) => {


    const {username, password} = req.body
    const secret = req.app.get('jwt-secret')

    // check the user info & generate the jwt
        // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            // const insertPw = crypto.createCipher(algorithm, key).update(password,"utf8","hex").final("hex")

            var cipher = crypto.createCipher(algorithm, key);
            cipher.update(password, "utf8", "hex");
            var insertPw = cipher.final("hex");

            if(insertPw == user.password) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            userId: user.user_id,
                            userType: user.user_type
                        }, 
                        secret, 
                        {
                            expiresIn: '7d',
                            issuer: 'barumnet',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    // respond the token 
    const respond = (token) => {
        
        res.json({
            message: 'logged in successfully',
            success : true,
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message,
            success : false
        })
    }

    // find the user
    User.findOne({
        where: { user_id: username }
      })
    .then(check)
    .then(respond)
    .catch(onError)
}


exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}