import { execute } from "../database/db.js";


async function List(passenger_user_id, pickup_date, ride_id, driver_user_id, status) {

    let filtro = [];
    let sql = `select rides.* , users."name" as passenger_name, users.phone as passenger_phone
, d.name as driver_name, d.phone as driver_phone
from rides
join users on (users.user_id = rides.passenger_user_id)
left join users d on (d.user_id = rides.driver_user_id)
where rides.ride_id > 0

`;

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


    const rides = await execute(sql, filtro);
    return rides;
}


async function Insert(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address) {

    let filtro = [];
    let sql = ` INSERT INTO RIDES (passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address, pickup_date, status) VALUES ($1, $2, $3, $4, $5, CURRENT_DATE, 'P') returning ride_id`;


   



    const ride = await execute(sql, [passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address]);

    return ride[0];
}

async function Delete(ride_id) {

    let sql = ` DELETE FROM RIDES WHERE ride_id = $1 `;

    await execute(sql, [ride_id]);

    return {ride_id};
}

async function Finish(ride_id, passenger_user_id) {

    let sql = ` UPDATE rides SET status = 'F' WHERE ride_id = $1 AND passenger_user_id = $2 `;

    await execute(sql, [ride_id, passenger_user_id]);

    return {ride_id};
}


async function ListForDriver(driver_user_id) {

    let sql = `select rides.* , users."name" as passenger_name, users.phone as passenger_phone
from rides
join users on (users.user_id = rides.passenger_user_id)
where rides.pickup_date = CURRENT_DATE
and  rides.driver_user_id = $1

`;


    const rides = await execute(sql, [driver_user_id]);
    return rides;
}

export default { List, Insert , Delete , Finish , ListForDriver};
