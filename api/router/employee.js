// 获取商品信息
exports.getemployee = function(req, res, connection) {
    console.log(req.query);
    
    //查找......................
   
    connection.query(`select
                 * from cashier`, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        //console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}