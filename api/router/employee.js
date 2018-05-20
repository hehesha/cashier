// 添加员工信息
exports.addcashier = function(req, res, connection) {
    console.log(req.body);
    var user = req.body.user;
    var psd = req.body.psd;
    var name = req.body.name;
    var gender = req.body.gender;
    var phone = req.body.phone;
    var rank = req.body.rank;
    var role = req.body.role;
    // 首先验证用户名是否存在
    connection.query(`
        select * from cashier where username = '${user}'
        `, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        console.log('The solution is: ', results);
        console.log(results.length);
        if(results.length<1){
                    connection.query(`
                insert into cashier (username,password,nickname,gender,phone,rank,role) values ('${user}','${psd}','${name}','${gender}','${phone}','${rank}','${role}');
                `, function(error, results1, fields) { 
                if(error) throw error;
                //results =>array类型
                console.log('The solution is: ', results1);
                res.send("success");
                connection.end();
            });
                }else{

                    res.send("exist");
                    connection.end();
                }
    });
}

exports.getemployee = function(req, res, connection) {
    console.log(req.query);
    var page = req.query.page;
    var pageitems = req.query.pageitems;
    var pageBegin = pageitems * (page - 1);
    var datas = req.query.data;
    connection.query(`
       select
                SQL_CALC_FOUND_ROWS
                 * from cashier where username like '%${datas}%' or nickname like "%${datas}%"
                 limit ${pageBegin},${pageitems};
                 select count(*) as rowscount from cashier where username like '%${datas}%' or nickname like "%${datas}%";
        `, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}
// 查看员工详情
exports.getempdetails = function(req, res, connection) {
    console.log(req.query);
    var name = req.query.name;
    connection.query(`
        select * from cashier where username = '${name}';
        `, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}

// 修改员工信息
exports.updatecashier = function(req, res, connection) {
    console.log(req.body);
    var nickname = req.body.nickname;
    var gender = req.body.gender;
    var phone = req.body.phone; 
    var rank = req.body.rank; 
    var role = req.body.role; 
    var password = req.body.password; 
    var username = req.body.username;
    console.log(`
        update cashier set nickname = '${nickname}',gender = '${gender}',phone ='${phone}',rank='${rank}',role = '${role}',password = '${password}' where username = '${username}';
        `);

    connection.query(`
        update cashier set nickname = '${nickname}',gender = '${gender}',phone ='${phone}',rank='${rank}',role = '${role}',password = '${password}' where username = '${username}';
        `, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}

// 删除员工
exports.deleteuser = function(req, res, connection) {
    console.log(req.body);
    var user = req.body.user;
    var sql=`
        delete from cashier where username = '${user}'
                 `;
         console.log(sql);
    //查找......................
   
    connection.query(sql, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        //console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}