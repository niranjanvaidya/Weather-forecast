const request = require('request')

const foreCast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=733412ed05290e2f3ad4f97061729666&query='+ encodeURIComponent(longitude) +',' + encodeURIComponent(longitude) +'&units=m'

    request({url, json: true}, (error,{body}) =>{

        if(error)
        {
            callback('Unable to Connect To Weather Service!')
        }
        else if(body.error)
        {
            callback('Unable to Find Location!')
        }
        else
        {
            callback(undefined,{
                description: body.current.weather_descriptions, 
                temperature: body.current.temperature 
            })
        }
    })
    
}


module.exports = foreCast