// 获取订单信息
exports.printorder = function(req, res, connection) {
    console.log(req.query);
    var oid = req.query.oid;
    
    //查找......................
   
    connection.query(`
        SELECT * from orderdetails INNER JOIN orders WHERE orders.oid = orderdetails.oid and orders.oid = '${oid}';
        `, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        //console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}