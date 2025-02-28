import { execute } from "../database/db.js";

async function List(passanger_user_id, pickup_date, ride_id, driver_user_id, status) {
    let filtro = [];


    let sql = ` SELECT * FROM rides
    WHERE ride_id > 0 `
    if (passanger_user_id) {
        sql += ` AND passenger_user_id = ? `
        filtro.push(passanger_user_id)
    }
    ;

    const rides = await execute(sql, []);        
    return rides
}

export default {List}
