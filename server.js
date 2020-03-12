var express=require('express');
var bodyParser=require('body-parser');
app=express();


app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});


app.post('/',function(req,res){
  var jsondata=JSON.parse(req.body.x);
  var num1=req.body.min_threshold;
  var num2=req.body.min_threshold_eval;
  console.log(jsondata);



var optimal_loan_amount= myFunction(jsondata,num1,num2);

console.log('optimal loan amount is '+  optimal_loan_amount);

var length= jsondata.ach.length;

   res.render('resp', {foo: jsondata,
                       result:optimal_loan_amount,
                       length:length,
                        });


});


app.listen(3000, function(){
  console.log('server started on port 3000.');
})
function myFunction(jsondata,min_th,min_th_e)
{
  var x=jsondata.avgsal-jsondata.avgach;

  var y=jsondata.median_balance> x ? jsondata.median_balance: x ;

  var z= jsondata.median_balance < jsondata.mean_balance ? jsondata.median_balance:jsondata.mean_balance;

  var result= y < (3*z) ? y:(3*z);


    var count_min=0;
  for(var i=0; i< jsondata.ach.length;i++){
    if(jsondata.ach[i].sum > min_th)
    {count_min++;}
  }

  var result= count_min<min_th_e?0:result;

  return result;

}
