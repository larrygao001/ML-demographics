const Clarifai=require('clarifai');

const app = new Clarifai.App({
    apiKey: 'cf36ce8e02514f0c8eead8853a714662'
});

const APICallHandler=()=>(req,res)=>{
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3',req.body.input)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>res.status(400).json('Unable to get API response'));
}

const imageHandler=(knex)=>(req,res)=>{
    const { id }=req.body;
    knex('users')
        .where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries=>{
            res.json([entries[0]]);
        })
        .catch(err=>res.status(400).json('unable to get entires'))
}

module.exports={
    imageHandler:imageHandler,
    APICallHandler:APICallHandler
}