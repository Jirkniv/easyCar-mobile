import repositoryRide from "../repositories/repository.ride.js";
async function List(passanger_user_id, pickup_date, ride_id, driver_user_id, status) {
    const rides = await repositoryRide.List(passanger_user_id, pickup_date, ride_id, driver_user_id, status);        
    return rides
}

export default {List}
