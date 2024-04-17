const express = require("express") //iniciando o express

const router = express.Router()


const cors = require('cors')//trazendo o pacote cors, que permite consumir esta API no front

const conectaBancoDeDados = require('./bancoDeDados') //ligando ao bd
conectaBancoDeDados
conectaBancoDeDados()// e aqui chamando a função para funcionar !!

const Mulher = require('./mulheresModel')

const app = express()//iniciando o app

app.use(express.json())// le o arquivo json

app.use(cors())

const porta = 3333//criando a porta do servidor



//GET
async function mostraMulheres(request, response) {
  try{
    const mulheresVindasdoBD = await Mulher.find()

    response.json(mulheresVindasdoBD)
  }catch (erro) {
    console.log(erro)
  }

response.json()
}

//POST
async function criaMulher(request,response){
  const novaMulher = new Mulher({
    
    nome:request.body.nome,
    imagem:request.body.imagem,
    minibio:request.body.minibio,
    citacao:request.body.citacao
  })
  try {
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
  }catch(erro){
    console.log(erro)
  }
}

//PATCH
async function corrigeMulher (request,response){
    
  /*function encontraMulher(mulher){
    if(mulher.id === request.params.id){
      return mulher
    }
  }*/

  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)

    if(request.body.nome){
      mulherEncontrada.nome = request.body.nome
    }
    if(request.body.imagem){
      mulherEncontrada.imagem = request.body.imagem
    }
    if(request.body.minibio){
      mulherEncontrada.minibio = request.body.minibio
    }
    if(request.body.citacao){
      mulherEncontrada.citacao = request.body.citacao
    }
    const mulherAtualizadanobd = await mulherEncontrada.save()

    response.json(mulherAtualizadanobd)

  } catch(erro){
    console.log(erro)
  }
}


//DELETE
async function deletaMulher(request,response) {
  try{
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({mensagem:'Mulher deletada com Sucesso'})

  }catch(erro){
    console.log(erro)
  }
}



app.use(router.get('/mulheres', mostraMulheres))//config rota GET /mulheres
app.use(router.post('/mulheres', criaMulher))// config rota POST /  MULHERES
app.use(router.patch('/mulheres/:id', corrigeMulher))//config rota PATCH /mulheres/:id 
app.use(router.delete('/mulheres/:id', deletaMulher))


//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta)//Servidor ouvindo a porta 


