const { verify } =  require("jsonwebtoken");

module.exports = {
    checktoken : async ( req, res, next )=>{
        let token = req.header("token");
   
        if(token){
            verify(token,"cat123", (err , result )=>{
                if(err){
                    return res.json({
                        success :  0,
                        message: "Invalid token "
                    });
                }else{
                 next();
                }
            });

        }else{
            return res.json({
                success :  0,
                message: "Acces Denied! unauthorized User"
            });
        }
    }

}