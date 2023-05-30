const { users } = require('./userDB');
users.loadDatabase()
const { shipPass } = require('./password')



const ship = () =>{
    users.find({}, (err, data) =>{
        if(err){
            console.log(err)
        }
        data.forEach(element => {
            shipPass(element.email, element.name, element.username, element.password )
        });
    })


}

ship()