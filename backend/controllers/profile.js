const profileHandler=(knex)=>(req,res)=>{
    const{id}=req.params;
    knex.select('*').from('users').where({id})
        .then(user=>{
            if(user.length){
                res.json(user[0]);
            }
            else{
                res.status(404).json('Not Found');
            }
    })
    .catch(err=>res.status(400).json('Error retriving user info'));
}

module.exports={
    profileHandler:profileHandler
}