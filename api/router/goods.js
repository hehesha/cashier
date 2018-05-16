//添加商品
exports.addgoods = function(req, res, connection) {
    //查找......................
    console.log(req.body)
    var name = req.body.name;
    var price = req.body.price;
    var num = req.body.num;
    var proNo = req.body.proid;
    var unit = req.body.unit;
    var size = req.body.size;
    var desc = req.body.desc;
    var prov = req.body.prov;
    var sell=req.body.sell;
    connection.query(`select * from goods where productNo = ${proNo}`, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        console.log('The solution is: ', results);
        console.log(results.length);
        if(results.length>0){
             connection.query(`update goods set num = num +${num} where productNo = ${proNo}`, function(error, results, fields) { 
                    if(error) throw error;
                    //results =>array类型
                    console.log('The solution is: ', results);
                    res.send();
                    connection.end();
                });
        }else{
            connection.query(`insert into goods (name,price,num,productNo,unit,remarks,size,Provide,sellprice) values ('${name}','${price}','${num}','${proNo}','${unit}','${desc}','${size}','${prov}','${sell}')`, function(error, results, fields) { 
                    if(error) throw error;
                    //results =>array类型
                    console.log('The solution is: ', results);
                    res.send();
                    connection.end();
                });
        }

        
    });
    
}
// 获取商品信息
exports.getgoods = function(req, res, connection) {
    console.log(req.query);
    var page = req.query.page;
    var pageitems = req.query.pageitems;
    var pageBegin = pageitems * (page - 1);
    //查找......................
   
    connection.query(`select
                 SQL_CALC_FOUND_ROWS
                 *
             from
                 goods limit ${pageBegin},${pageitems};                
             select count(*) as rowscount from goods; `, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        //console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}
// 获取商品想起
exports.getdetails = function(req, res, connection) {
    console.log(req.query);
    var proNo = req.query.proid;
    //查找......................
   
    connection.query(`select
                 * from goods where productNo=${proNo}`, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        //console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}
// 修改商品信息
exports.updategoods = function(req, res, connection) {
    console.log(req.body);
    var proNo=req.body.productNo;
    var str='';
    for(let key in req.body){
        str+=`${key}='${req.body[key]}',`
    }
    str=str.substring(0,str.length-1);
    console.log(str);

    
   
    connection.query(`update goods set ${str}
                 where productNo='${proNo}'`, function(error, results, fields) { 
        if(error) throw error;
        //results =>array类型
        //console.log('The solution is: ', results);
        res.send(results);
        connection.end();
    });
}