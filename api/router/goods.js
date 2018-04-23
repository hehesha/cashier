//添加商品
exports.addgoods = function(req, res, connection) {
    //查找......................
    console.log(req)
    console.log(666);
    var name = req.body.name;
    var price = req.body.price;
    var num = req.body.num;
    var proNo = req.body.proNo;
    connection.query(`insert into goods (name,price,num,productNo) values ('${name}','${price}','${num}','${proNo}')`, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        console.log('The solution is: ', results);
        res.send();
        connection.end();
    });
}