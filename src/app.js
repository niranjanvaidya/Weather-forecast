const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../src/Utils/geocode')
const foreCast = require('../src/Utils/foreCast')

const app = express()

//Paths For Express Config
const dirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars Engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(dirPath))

//home page
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Niranjan V'
    })
})


//about page
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Niranjan V'
    })
})

//help page
app.get('/help',(req,res) => {
    res.render('help',{
        msg: 'Help Message',
        name: 'Niranjan V',
        title: 'Help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'Please provide a valid Address'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location} = {} )=>{
        if(error)
        {
           return res.send({error})
        }
        else
        {
        
            foreCast(latitude,longitude,(error,{description,temperature} = {} )=>{
                if(error)
                {
                  return  res.send({error : error})
                }
                
                    res.send({
                        Location : location, 
                        Coordinates : latitude +','+ longitude,
                        Weather: description,
                        Temperature: temperature
                    })
            })
        }
    })

    // console.log(req.query.address)
    // res.send({
    //     address: req.query.address
    // })
})

app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404NotFound',{
        msg: 'Help Page That You Are Looking for, does not exist'
    })
})

app.get('*',(req,res)=>{
    res.render('404NotFound',{
        msg: 'The Page That You Are Looking for, does not exist'
    })
})

app.listen(3000,()=>{
    console.log('server started at port 3000')
} )
