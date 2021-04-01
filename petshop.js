//criação de modulo

const moment = require('moment');
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse();

const petshop ={
    atualizarBanco: () =>{
        let petsAtualizado = JSON.stringify(bancoDados, null, 2);
        fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
    },

    listarPets : () =>{
        bancoDados.pets.forEach( (pet) =>  {
            let {nome, idade, tipo, raca, vacinado, contato, tutor} = pet;
            
            console.log(`Nome: ${nome}, Tipo: ${tipo}, Idade: ${idade} anos, Raça: ${raca}, ${(vacinado) ? 'Vacinado': 'Não vacinado'}, Tutor: ${tutor}, Contato: ${contato}`);   
        });
    },

    vacinarPet : (pet) =>{
        let {nome, vacinado} = pet

        vacinado? (
            console.log(`O pet ${nome} já está vacinado.`)
        ) : (
            vacinado = true,
            console.log(`O pet ${nome} acabou de ser vacinado.`)
        );
    },

    verData : () =>{
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        console.log(`Data e Hora do Serviço: ${formatted_date}`)

    },

    campanhaVacina: () =>{
        let cont =0;
    
        bancoDados.pets.map(pet => {
            let {vacinado} = pet;
            if (!vacinado) {
                pet.vacinado = true;
                cont++;
            }
            
        })
        console.log(`${cont} pets foram vaciados nessa campanha!`)
        atualizarBanco();
    },

    adcionarNovoCliente : (...novosClientes) =>{
        novosClientes.forEach((novos) => {
            bancoDados.pets.push(novos);
        })
    
        atualizarBanco();
        novosClientes.forEach((pet) => {
            console.log(`${pet.nome} foi adicionado com sucesso!`);
        })
    },

    darBanhoPet : (pet) =>{
        let {servicos, nome} = pet;
        servicos.push('banho');
        atualizarBanco();
        console.log(`O ${nome} está de banho tomado!`)
        verData();
    },

    tosarPet : (pet) => {
        let {servicos, nome} = pet;
        servicos.push('tosar');
        atualizarBanco();
        console.log(`O ${nome} está com cabelinho na régua!`)
        verData();   
    },

    apararPet : (pet) => {
        let {servicos, nome} = pet;
        servicos.push('aparar unhas');
        atualizarBanco();
        console.log(`O ${nome} está de unhas aparadas!`)  
        verData(); 
    },

    atenderCliente : (pet, servico) =>{
        servico(pet); //serviço é uma função.
        console.log(`${pet.nome} realizou o serviço com sucesso! Obrigado e volte sempre`);
    
    },

    buscarPet : (nome) => {
        const busca = bancoDados.pets.find(petAtual => petAtual.nome == nome);
        console.log(busca);
    },

    fitrarTipoPet : (tipo) => {
        const busca = bancoDados.pets.filter(petAtual => petAtual.tipo == tipo);
        console.log(busca);
    },

    clientePremium : (pet) =>{
        let quantidade = pet.servicos.length;
        
        if (quantidade > 5) {
            console.log(`Olá, ${pet.nome}! Você é um cliente especial e ganhou um descontão!`);
        } else {
            console.log(`Olá, ${pet.nome}! Você ainda não tem descontos disponiveis!`);
        }
    },

    contatoTutor : (pet) => {
        let {nome, tutor, contato} = pet;
        
        return `Tutor: ${tutor}
        Contato: ${contato}
        Pet: ${nome}`;
    },

    filtrarTutor : (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });
        
        console.log(`Pets do tutor ${nomeTutor}:`)
        petsTutor.forEach((pet) => {
            console.log(`${pet.nome} - ${pet.tipo}`)
        })
    },
    
}
module.exports = petshop;