const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// para importar img
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './opload')
    },
    filename: function (req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage }).single('arquivo')

app.post('/upload', (req, res)=>{
    upload(req, res, err => {
        if (err){
            return res.end('Ocorre um erro')
        }

        res.end('Concluído com sucesso.')
    })
})

//config apra o fatch2
app.post('/formulario', (req, res) =>{
    res.send({
        ...req.body,
        id: 1
    })
})

//config para axios2
app.get('/parOuImpar', (req, res) =>{
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})


//executa servidor
app.listen(8080,() => console.log('Executando...'))