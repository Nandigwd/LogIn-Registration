const pool = require("../../config/db");
const {genSaltSync , hashSync}  = require('bcrypt');


module.exports={
    create: (data, callback) =>{
    
        // munupulation on data 
        const salt = genSaltSync(10);
        data.password = hashSync(data.password,salt);

        // Query having 3 parameter 1. query 2.binding data 3. rersponse with err and result.
         pool.query(
            `insert into pern_stack.registration (user_name,email,password,mobile) VALUES ($1,$2,$3,$4) returning * `
            ,
        [
            data.user_name,
            data.email,
            data.password,
            data.mobile
        ]
            ,
        (err, results,field) =>{
            if(err){
            return  callback(err);
            }
            return callback(null,results);
            }
        );
    },
    getall : (data , callback)=>{

        pool.query(`Select * from pern_stack.registration`
        ,[

        ],
        (err, results)=>{
            if(err){
                return callback(err);
            }
            return callback(null,results.rows);
        });
    },
    get :(data, callback)=>{
        pool.query(
            `Select * from pern_stack.registration where id = $1`
            ,
            [data.params.id]
            ,
            (err,results)=>{
                if(err){
                    return callback(err);
                }
                return callback(null,results.rows);

            }
        );

    },
    update : (data, callback)=>{

        pool.query(`update pern_stack.registration set user_name = $1 ,email= $2 ,password=$3 ,mobile=$4 where id = $5`
        ,
        [
            data.user_name,
            data.email,
            data.password,
            data.mobile,
            data.id
        ]
        ,
        (err, results)=>{
            if(err){
                return callback(err);
            }
            return callback(null,results);

        });
    },
    deleteuser : (data, callback)=>{

        pool.query(`delete from pern_stack.registration where id= $1`
        ,
        [
            data.id
        ]
        ,
        (err,results)=>{
            if(err){
                return callback(err);

            }
            return callback(null,results);

        });

    },
    getUserByEmail : (data, callback)=>{

        pool.query(`select * from pern_stack.registration where email=$1`
        ,
        [
            data.email
        ]
        ,
        (err, results)=>{
            if(err){
                return callback(err);
            }
            console.log(results.rows[0]);
            return callback(null,results.rows[0]);
        });

    }
}