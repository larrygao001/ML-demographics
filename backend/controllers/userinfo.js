const userinfoHandler=(knex)=>(req,res)=>{
    knex.select('*').from('users')
    .returning('*')
    .then(user=>{
        res.json(user);
    });
}

module.exports={
    userinfoHandler:userinfoHandler
}