const request = require('request');
const forcast = (lon,lat , callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=599fac143bab97e3aca9cb04a458b58e"
    request({url: url,json:true},(error,response)=>{
        if(error){
            callback('Unable to reach weather server',undefined);
        }
        else if(response.body.error){
            callback('can not find location',undefined);
        }
        else{
            callback(undefined,response.body);
        }
    })
}

module.exports = forcast;