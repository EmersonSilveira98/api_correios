<template>
    <div class="app">
        <h1>Consulte o valor do Frete</h1>
        <b-form>
            <b-row>
                <b-col md="3" sm="12" >
             <b-form-group label="EMPRESA" >
                <b-form-select label="Escolha a empresa" v-model="client.company" :options="company"></b-form-select>
            </b-form-group>
            </b-col>
        <b-col md="3" sm="12">
            <b-form-group label="CEP ORIGEM" label-for="cep-source">
                <b-form-input id="client-cepSource" type="text"
                    v-model="client.source" required
                    placeholder="Digite o cep de origem..."/>
            </b-form-group>
        </b-col>
        <b-col md="3" sm="12">
            <b-form-group label="CEP DESTINO" label-for="cep-destiny">
                <b-form-input id="client-cepDestiny" type="text"
                    v-model="client.destiny" required
                    placeholder="Digite o cep de destino..."/>
            </b-form-group>
        </b-col>
        <b-col md="3" sm="12">
            <b-form-group label="PESO" label-for="weight">
                <b-form-input id="client-weight" type="text"
                    v-model="client.weight" required
                    placeholder="Digite o peso em KG..."/>
            </b-form-group>
        </b-col>
        <b-col md="4" sm="12">
            <b-form-group label="ALTURA" label-for="height">
                <b-form-input id="client-height" type="text"
                    v-model="client.height" required
                    placeholder="Digite a altura em cm..."/>
            </b-form-group>
        </b-col>
        <b-col md="4" sm="12">
            <b-form-group label="LARGURA" label-for="widht">
                <b-form-input id="client-widht" type="text"
                    v-model="client.widht" required
                    placeholder="Digite a largura em cm..."/>
            </b-form-group>
        </b-col>
        <b-col md="4" sm="12">
            <b-form-group label="COMPRIMENTO" label-for="client-length">
                <b-form-input id="client-length" type="text"
                    v-model="client.lenght" required
                    placeholder="Digite o comprimento em cm..."/>
            </b-form-group>
        </b-col>
        <b-col md="12" sm="12">
            <b-form-group label="VALOR DA ENTREGA" label-for="value" v-if="value">
                <p>R$: {{value}}</p>
            </b-form-group>
        </b-col>
        <b-col md="12" sm="12">
            <b-form-group label="PRAZO DE ENTREGA" label-for="days" v-if="days" >
                <p>{{days}}</p>
            </b-form-group>
        </b-col>
        <b-col md="12" sm="12" class="mb-3">
            <b-button variant="primary" @click="calculate">
                Calcular Frete
            </b-button>
          </b-col>
          
            </b-row>
        </b-form>
        
    </div>
</template>

<script>
import axios from 'axios'


export default {
    name: 'Index',
    data: function(){
        return {
            noJson: "",
            value: '',
            days: '',
            client: {},
            company: [  
                {value: '04014', text:'SEDEX'},
                {value: '41106', text:'PAC'}
            ],
        }
    },
     methods: {
         //Metodo que irar fazer a requisição no backend
            async calculate(){
                this.client.declared = 0
                const url= 'http://localhost:3333/correios'
                await axios.post(url, this.client).then(res => {
                            this.noJson = res.data  
                } )
                this.convertToJson()
            } ,   
            //Metodo que irar converter o String que veio do backend para obj e irá fazer a inserção no frontend 
            convertToJson(){
               const obj = eval(this.noJson)
               var inside = {}
               inside = obj[0]

               Object.keys(inside).forEach(item =>{
                if(item == 'MsgErro'){
                    const mistake = inside[item]

                    if(mistake != ""){
                           alert(mistake)
                    }
                }else if(item == 'Valor'){
                    const itemValue = inside[item]
                    this.value = itemValue[0]

                }else if(item == 'PrazoEntrega'){
                    const itemDay = inside[item]
                    this.days = `${itemDay[0]} Dias`
                    console.log(inside)
                }
              })
            }
    }
}
</script>

<style>
.app h1{
    margin: 20px;
}

.app {
    margin: 5px;
    width: 100%;
    background: linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62));
    border: 5px solid rgb(8, 8, 8);
    color: #fff;
}

</style>