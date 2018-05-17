// 获取商品详情
exports.login = function(req, res, connection) {
    console.log(req.query);
    var user=req.query.user;
    var psd = req.query.pass;
    var region = req.query.region;
    var sql='';
    if(region=='cashier'){

        sql=`select * from cashier where username = '${user}' and password = '${psd}' and role in (1,3);`
    }else{

        sql=`select * from cashier where username = '${user}' and password = '${psd}' and role in (2,3);`    
    }
    
    console.log(sql);
    connection.query(sql, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}