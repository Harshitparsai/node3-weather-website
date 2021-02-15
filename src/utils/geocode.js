const request = require('request');

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaGVycnkxMjMiLCJhIjoiY2trdG9kdWpwMHExaDJ5cGlrN2QzYzFoOSJ9.eNiD8F5zmTieajEcu90hfA&limit=1"
    request({url: url,json: true},(error,response)=>{
        if(error){
            callback('unable to reach the server',undefined);
        }else if(response.body.features.length == 0){
            callback('location does not found',undefined);
        }
        else{
            callback(undefined,{longitute: response.body.features[0].center[0],
                                latitude: response.body.features[0].center[1],
                                place: response.body.features[0].place_name})
        }
    })
}

module.exports = geocode;