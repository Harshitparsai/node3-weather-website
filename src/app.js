const path = require('path')
const express = require('express')
const hbs  = require('hbs')
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')

const viewsPath = path.join(__dirname,'../templates/views')
const app = express()
const port = process.env.PORT || 3000

const  partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs' )
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public') ))

app.get('',(req,res)=>{
    res.render('index',{
        title:"weather App",
        name: "Harshit Parsai"
    })
})

app.get('/about',(req,res)=>{
    console.log("I am here ")
    res.render('about',{title:"About me",
    name: "Harshit Parsai"})
})


app.get('/help',(req,res)=>{
    res.render('help',{title:"Help",message:"This is a forcasting app and we are here to help you",name:"Harshit Parsai"})

})

app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({error:"please provide address in query"})
    }

    const address = req.query.address;
    
    geocode(address,(error,data)=>{
        if(error)
        {
            return res.send(error)
        }
        else{
            forcast(data.longitute,data.latitude,(error,forcastdata)=>{
                if(error)
                {
                    return res.send(error)
                }
                const resdata = {
                    address: req.query.address,
                    forecast: forcastdata.weather[0].description
                }
                res.send(resdata)
            })
        }

    })

    
})

app.get('*',(req,res)=>{
    res.render('404error',{title:"404 Error",message:"This route does not exists yet",name:"Harshit Parsai"})
})
//app.com 
//app.com/help
//app.com/about


app.listen(port,()=>{
    console.log("server is up on port 3000")
})