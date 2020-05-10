const request = require('request')
//GEOCODE WITH CALLBACK
const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlyYW5qYW52IiwiYSI6ImNrOW9udTNicTAyZW8zaW4xN2M2bTVqZm4ifQ.aT6R_pE1SbXONH3qgSBuuA&limit=1'

    request({url,json:true}, (error,{body} = {})=> {
        if(error)
        {
            callback('Unable To Connect To Location Services!')
        }
        else if(body.features.length === 0)
        {
            callback('Unable to Find Location. Try Another Search..')
        }
        else
        {
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name

            })
        }
    })
}


module.exports = geoCode