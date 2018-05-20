// 生成订单
exports.createorders = function(req, res, connection) {
    console.log(req.body);
    var operator=req.body.operate;
    var num = req.body.num;
    var total = req.body.total;
    var data = req.body.data;
    console.log()
    var sql = `insert into orders (operator,o_num,total) values ('${operator}','${num}','${total}');`
    console.log(sql);

    connection.query(sql
        
        , function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        console.log('The solution is: ', results);
        var currenRow = results.insertId;//当前订单的订单号
        var orderdata = JSON.parse(data);
        var str = '';
        orderdata.map((item)=>{
            str+='('
            for(let key in item){
                str+=`'${item[key]}',`
            }

                str+=`${currenRow},${item['num']*item['price']}`
            // str=str.substring(0,str.length-1);
            str+='),';
            return str
        })
        str=str.substring(0,str.length-1);
        console.log(str);
        var sql2='insert into orderdetails (productNo,name,sellprice,num,unit,descount,oid,total) values' + str+`;UPDATE goods SET num = num-(SELECT SUM(num) from orderdetails WHERE goods.productNo = orderdetails.productNo AND orderdetails.oid = ${currenRow})
            WHERE EXISTS (SELECT * from orderdetails WHERE goods.productNo = orderdetails.productNo AND orderdetails.oid = ${currenRow})`

        console.log(sql2);
        connection.query(sql2, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        console.log('The solution is: ', results);
        results.push({'currenRow':currenRow});
        res.send(results);
        connection.end();
    });
    });
}