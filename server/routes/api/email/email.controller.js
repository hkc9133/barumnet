const nodemailer = require('nodemailer');


exports.sendEamil = (req, res) => {

    // console.log(req.body)

    let transporter = nodemailer.createTransport({ 
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: { user: 'kaycee@barumnet.com', 
                pass: 'jy840918'
        } 
    });
 
    let mailOptions = { 
        from: 'hkc9133@naver.com' ,
        to: 'sales@barumnet.com' , // 수신 메일 주소 
        subject: '[바름넷 고객문의] '+req.body.title,
        html:'<p>'+req.body.name+'님 문의입니다.</p><span>'+req.body.email+'</span><br/><p>'+req.body.content+'</p>'
    };

    console.log(mailOptions)

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.json({
                success : false,
                message : "메일 전송 실패, 다시 시도하세요"
            })
             console.log(error);
        } else {
            return res.json("문의 메일이 발송되었습니다.")
        } 
    });


    

}