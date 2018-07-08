
const signinHandler=(knex,bcrypt) => (req,res)=>{
    const { email,password } = req.body;
    if(!email||!password){
        return res.status(400).json('incorrect format of submission');
    }
    knex.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return knex.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Error getting user profile'));
            } else {
                res.status(400).json('WRONG CREDENTIALS');
            }
        }
        )
        .catch(err => res.status(400).json('WRONG credentials'));
}

module.exports={
    signinHandler:signinHandler
}
