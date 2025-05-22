exports.Property = function (prop_id,user_id,
    price= undefined,
    surface= undefined,
    levels= undefined,
    level= undefined,
    kitchen= undefined,
    bathroom= undefined,
    living_room= undefined,
    heating= undefined,
    constr_year= undefined,
    available= undefined,
    desc= undefined,
    location= undefined,
    type= undefined,
    address = undefined,
    x = undefined,
    y = undefined) {
        this.prop_id = prop_id
        this.price = price
        this.surface = surface
        this.levels = levels
        this.level = level
        this.kitchen = kitchen
        this.bathroom = bathroom
        this.living_room = living_room
        this.heating = heating
        this.constr_year = constr_year
        this.available = available
        this.desc = desc
        this.location = location
        this.user_id = user_id
        this.type = type
        this.address = address
        this.x = x 
        this.y = y
}


exports.User = function(id,password,username,
    name= undefined,
    surname = undefined,
    tel = undefined,
    email = undefined,
    comm_hours= undefined,){
        this.id= id
        this.password= password
        this.username = username
        this.name=name
        this.surname = surname
        this.tel= tel
        this.email=email
        this.comm_hours= comm_hours
    }


exports.Aresei= function(buyer_id, prop_id){
    this.buyer_id = buyer_id
    this.prop_id = prop_id
}