
var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017';
var mydata=[];

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbmy=db.db('fruit');
    mydata=[{name:'lemon',color:'yellow',source:'tree'},{name:'cherry',color:'red'}];
    
    dbmy.collection('fruit').insertMany(mydata,function(err,res){
        if(err) throw err;
        console.log('document inserted');
    
        db.close();
    });
});