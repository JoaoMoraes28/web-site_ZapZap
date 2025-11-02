'use strict'

var fisrtCall = true
var sectionHigh = 'conversas'
const iconContatos = document.getElementById('conversas')
const iconStatus = document.getElementById('status')
const iconCanais = document.getElementById('canais')
const iconComunidade = document.getElementById('comunidades')
const sectionConversas = document.getElementById('conversasSection')
const sectionStatus = document.getElementById('statusSection')
const sectionCanais = document.getElementById('canaisSection')
const sectionComunidades = document.getElementById('comunidadesSection')

async function loadContacts() {
    let url = 'https://api-zapzap.onrender.com/v1/messages/11987876567'
    let response = await fetch(url)

    let contacts = await response.json()
    createContacts(contacts.messages[0])
}

async function getMessages(id) {
    let url = `https://api-zapzap.onrender.com/v1/message?user=11987876567&contact=${id}`
    let response = await fetch(url)

    let messages = await response.json()
    return messages
}

function createContacts(contacts) {
    let contatos = []
    contacts.forEach((contact) => {
        const divContato = document.createElement('div')
        const divImg = document.createElement('div')
        const img = document.createElement('img')
        const divInf = document.createElement('div')
        const pNome = document.createElement('p')
        const pUltimaMensagem = document.createElement('p')
        const pData = document.createElement('p')

        sectionConversas.appendChild(divContato)
        divContato.append(divImg, divInf, pData)
        divImg.appendChild(img)
        divInf.append(pNome, pUltimaMensagem)

        divContato.classList.add('contato')
        divImg.classList.add('imgPerfil')
        divInf.classList.add('informacao')
        pNome.classList.add('nome')
        pUltimaMensagem.classList.add('ultimaMensagem')
        pData.classList.add('data')

        let lastMessage = contact.messages.length - 1

        //img.src = contact.image

        divContato.id = `${contact.number}/${contact.name}/${contact.image}`
        pNome.innerHTML = contact.name
        pUltimaMensagem.innerHTML = contact.messages[lastMessage].content
        pData.innerHTML = contact.messages[lastMessage].time

        contatos.push(divContato)
    });
    contatos.forEach(addListener)
}

function addListener(contato) {
    contato.addEventListener('click', async () => {
        let id = String(event.currentTarget.id).split('/')
        const sectionConversa = document.getElementById('conversa')
        const sectionMain = document.getElementById('sectionMain')
        const nomeMain = document.getElementById('nomeMain')
        const imgPerfil = document.getElementById('imgPerfilMain')

        if (fisrtCall) {
            const inputMain = document.getElementById('divInputMain')
            const headerMain = document.getElementById('headerMain')
            const telaInicial = document.getElementById('telaInicial')

            sectionMain.style.backgroundImage = 'url(./img/zapzap.jpg)'
            sectionConversa.style.justifyContent = 'start'
            sectionConversa.style.alignItems = 'start'
            telaInicial.style.display = 'none'
            headerMain.style.display = 'flex'
            inputMain.style.display = 'flex'

            fisrtCall = false
        }

        nomeMain.innerHTML = id[1]
        //imgPerfil.src = id[2]

        while (sectionConversa.firstChild) {
            sectionConversa.removeChild(sectionConversa.firstChild)
        }


        let messages = await getMessages(id[0])
        messages.message[0].messages[0].forEach(createMessages)
    })


}

function createMessages(message) {
    const sectionConversa = document.getElementById('conversa')
    const divMessage = document.createElement('div')
    const spanMessage = document.createElement('span')
    const spanData = document.createElement('span')

    sectionConversa.appendChild(divMessage)
    divMessage.append(spanMessage, spanData)

    spanMessage.innerHTML = message.content
    spanData.innerHTML = message.time

    if (message.sender == 'me') {
        divMessage.classList.add('divMensagemMe')
        spanMessage.classList.add('mensagemMe')
        spanData.classList.add('dataMensagemMe')

    } else {
        divMessage.classList.add('divMensagemContato')
        spanMessage.classList.add('mensagemContato')
        spanData.classList.add('dataMensagemContato')

    }
}

iconContatos.addEventListener('click', () => {
    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    sectionNone.style.display = 'none'
    sectionConversas.style.display = 'flex'
    sectionHigh = event.currentTarget.id
})

iconStatus.addEventListener('click', () => {
    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    sectionNone.style.display = 'none'
    sectionStatus.style.display = 'flex'
    sectionHigh = event.currentTarget.id
})

iconCanais.addEventListener('click', () => {
    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    sectionNone.style.display = 'none'
    sectionCanais.style.display = 'flex'
    sectionHigh = event.currentTarget.id
})

iconComunidade.addEventListener('click', () => {
    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    sectionNone.style.display = 'none'
    sectionComunidades.style.display = 'flex'
    sectionHigh = event.currentTarget.id
})

loadContacts()