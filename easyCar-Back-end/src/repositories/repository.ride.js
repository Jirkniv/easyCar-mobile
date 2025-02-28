import { execute } from "../database/db.js";


async function List(passenger_user_id, pickup_date, ride_id, driver_user_id, status) {

    let filtro = [];
    let sql = `SELECT * FROM rides WHERE ride_id > 0`;

    if (passenger_user_id) {
        filtro.push(passenger_user_id);
        sql += ` AND passenger_user_id = $${filtro.length}`;
    }
    
    if (pickup_date) {
        filtro.push(pickup_date);
        sql += ` AND pickup_date = $${filtro.length}`;
    }

    if (ride_id) {
        filtro.push(ride_id);
        sql += ` AND ride_id = $${filtro.length}`;
    }

    if (driver_user_id) {
        filtro.push(driver_user_id);
        sql += ` AND driver_user_id = $${filtro.length}`;
    }

    if (status) {
        filtro.push(status);
        sql += ` AND status = $${filtro.length}`;
    }

    console.log("🟢 SQL:", sql);
    console.log("🟡 Filtros:", filtro);

    const rides = await execute(sql, filtro);
    return rides;
}


async function Insert(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address) {

    let filtro = [];
    let sql = ` INSERT INTO RIDES (passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address, pickup_date, status) VALUES ($1, $2, $3, $4, $5, CURRENT_DATE, 'P') returning ride_id`;


   



    const ride = await execute(sql, [passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address]);

    return ride[0];
}

export default { List, Insert };
