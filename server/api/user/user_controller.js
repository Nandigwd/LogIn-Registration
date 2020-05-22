const { create, getall, get, update, deleteuser, getUserByEmail } = require('./user_server');

const {sign} = require ('jsonwebtoken');
const {genSaltSync , hashSync, compareSync}  = require('bcrypt');

module.exports = {
    createUser : (req, res)=>{
              
        create(req.body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message :"Data base connection error"
                })    
            }
            return res.status(200).json({
                success:1,
                data : results
            });

        });
    },
    getallUser : (req , res )=>{
        
        getall(req.body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    message: "Data base connection error"
                })
            }
                return res.status(200).json({
                    success:1,
                    data : results
                });
        });
    },
    getUser : (req, res)=>{

        get(req , (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message :  "Data base connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                dadta: results
            });

        });

    },
    updateUser: (req, res)=>{
            update(req.body, (err, results)=>{
                if(err){
                    return res.status(500).json({
                        success:0,
                        message: "Data base connection error"
                    });
                }
                if(!results){
                    return res.status(500).json({
                        success:0,
                        message: "Failed to update "
                    });
                }
                return res.status(200).json({
                    success :1,
                    message : "Succesfully Updated " 
                });

            });
    },
    deleteuser : (req, res)=>{
        deleteuser(req.body, (err, results)=>{
            if(err){
                return res.status(500).json({
                    success : 0,
                    message :  "Data base connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Succesfully deleted"
            });

        });

    },
    getUserByEmail :(req, res)=>{
        const body = req.body;

        getUserByEmail( body , (err, results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message: "Data base connection error"
                });
            }
            if(!results){
                return res.status(500).json({
                    success:0,
                    message : "Invaild email"
                });
            }
            const passwordcheck = compareSync(body.password, results.password);
            if(passwordcheck){
                results.password= undefined;
                const jsontoken = sign({result : results}, "cat123",{expiresIn:"1h"} );
                return res.json({
                    success:1,
                    message:"Login succesfully ",
                    token:jsontoken
                });
            }else{
                return res.json({
                    success:1,
                    message: "Invaild  password "
                }); 
            }
            
        });
    }
}