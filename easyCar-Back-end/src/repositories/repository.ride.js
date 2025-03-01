import { execute } from "../database/db.js";


async function List(passenger_user_id, pickup_date, ride_id, driver_user_id, status, not_status) {

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
    if (not_status) {
        filtro.push(not_status);
        sql += ` AND status <> $${filtro.length}`;
    }

    const rides = await execute(sql, filtro);
    return rides;
}


async function Insert(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address) {

    let dt = new Date().toLocaleDateString("pr-BR", {timezone: "America/Sao_Paulo"})
    dt = dt.substring(0, 10);

    let sql = ` INSERT INTO RIDES (passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address, pickup_date, status) VALUES ($1, $2, $3, $4, $5, $6, 'P') returning ride_id`;


   



    const ride = await execute(sql, [passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address, dt]);

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

UNION

select rides.* , users."name" as passenger_name, users.phone as passenger_phone
from rides
join users on (users.user_id = rides.passenger_user_id)
where rides.pickup_date = CURRENT_DATE
and  rides.driver_user_id is null `;


    const rides = await execute(sql, [driver_user_id]);
    return rides;
}

async function Accept(ride_id, driver_user_id) {

    let sql = ` UPDATE rides SET status = 'A', driver_user_id = $1 WHERE ride_id = $2 `;

    await execute(sql, [driver_user_id, ride_id]);

    return {ride_id};
}

async function Cancel(ride_id) {

    let sql = ` UPDATE rides SET status = 'P', driver_user_id = null WHERE ride_id = $1 `;

    await execute(sql, [ride_id]);

    return {ride_id};
}
export default { List, Insert , Delete , Finish , ListForDriver, Accept, Cancel};
