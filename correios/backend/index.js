const axios = require('axios')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const xml2js = require('xml2js')
const util = require('util')
const cors = require('cors')


const parser = new xml2js.Parser()

app.use(cors())
app.use(bodyParser.json())

app.post('/correios',  async (req, res)=> {
    const params = {...req.body}
    
    
    const url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=${params.source}&sCepDestino=${params.destiny}&nVlPeso=${params.weight}&nCdFormato=1&nVlComprimento=${params.lenght}
    &nVlAltura=${params.height}&nVlLargura=${params.widht}&sCdMaoPropria=n&nVlValorDeclarado=${params.declared}
    &sCdAvisoRecebimento=n&nCdServico=${params.company}&nVlDiametro=0&StrRetorno=xml`

    // Chamada na API dos correios 
    await axios.get(url)
            .then(resp => resp.data)
            .then(data => {
                parser.parseString(data, (err, result) =>{
                    res.send(util.inspect(result, false, null, false))
                    
                    })
                })
            .catch(err => res.status(400).send(err))
})

app.listen(3333, ()=> console.log('servidor executando...'))
