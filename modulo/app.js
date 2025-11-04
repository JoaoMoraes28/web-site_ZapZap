'use strict'

var fisrtCall = true
var sectionHigh = 'conversas'
var telaHigh = 'inicial'
var divIconHigh = 'conversasDiv'
const iconContatos = document.getElementById('conversas')
const iconStatus = document.getElementById('status')
const iconCanais = document.getElementById('canais')
const iconComunidade = document.getElementById('comunidades')
const iconConfig = document.getElementById('configuracoes')
const iconPerfil = document.getElementById('perfil')
const sectionConversas = document.getElementById('conversasSection')
const sectionStatus = document.getElementById('statusSection')
const sectionCanais = document.getElementById('canaisSection')
const sectionComunidades = document.getElementById('comunidadesSection')
const sectionConfig = document.getElementById('configuracoesSection')
const sectionPerfil = document.getElementById('perfilSection')

async function loadContacts() {
    let url = 'https://api-zapzap.onrender.com/v1/messages/11987876567'
    let response = await fetch(url)

    createContacts(contacts.messages[0])
}

async function getMessages(id) {
    let url = `https://api-zapzap.onrender.com/v1/message?user=11987876567&contact=${id}`
    let response = await fetch(url)

    let messages = await response.json()
    return messages
}

async function getDadaProfile(number) {
    let url = '`https://api-zapzap.onrender.com/v1/message?user=11987876567&contact=${id}`'
    let response = await fetch(url)

    let profile = await response.json()
    return profile
}

function buildProfile() {
    let profile = getDadaProfile('12345678')
    const imgStatus = document.getElementById('perfilStatusImg')
    const nameConfig = document.getElementById('nomeConfig')
    const imgProfile = document.getElementById('imgPerfilHeader')
    const nameProfile = document.getElementById('nomePerfil')
    const phone = document.getElementById('telefonePerfil')

    imgStatus.src = 1
    nameConfig.innerHTML = 1
    imgProfile.src = 1
    nameProfile.innerHTML = 1
    phone.innerHTML = 1
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
        const sectionConversa = document.getElementById('conversasTela')
        const sectionMain = document.getElementById('sectionMain')
        const nomeMain = document.getElementById('nomeMain')
        const imgPerfil = document.getElementById('imgPerfilMain')

        if (fisrtCall) {
            const inputMain = document.getElementById('divInputMain')
            const headerMain = document.getElementById('headerMain')
            const telaInicial = document.getElementById('inicialTela')

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
    const sectionConversa = document.getElementById('conversasTela')
    const divMessage = document.createElement('div')
    const spanMessage = document.createElement('span')
    const spanData = document.createElement('span')
    sectionConversa.style.display = 'flex'

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
    if (sectionHigh == 'comunidades') {
        iconComunidade.src = '../img/comunidade.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = '../img/status.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = '../img/canais.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = '../img/config.png'

    }

    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    const highTela = document.getElementById(`${telaHigh}Tela`)
    highTela.style.display = 'none'
    sectionNone.style.display = 'none'
    sectionConversas.style.display = 'flex'
    sectionHigh = event.currentTarget.id
    telaHigh = event.currentTarget.id

    const divMessages = document.getElementById('conversasTela')
    const divInput = document.getElementById('divInputMain')
    const divHeader = document.getElementById('headerMain')
    const sectionMain = document.getElementById('sectionMain')

    sectionMain.style.backgroundImage = 'url(./img/zapzap.jpg)'
    divMessages.style.display = 'flex'
    divInput.style.display = 'flex'
    divHeader.style.display = 'flex'

    if (divIconHigh != iconContatos.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('conversasDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconContatos.src = '../img/conversasBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconContatos.parentNode.id
    }
})

iconStatus.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = '../img/conversas.png'

    } else if (sectionHigh == 'comunidades') {
        iconComunidade.src = '../img/comunidade.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = '../img/canais.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = '../img/config.png'

    }

    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    const highTela = document.getElementById(`${telaHigh}Tela`)
    let telastatus = document.getElementById('statusTela')
    highTela.style.display = 'none'
    telastatus.style.display = 'flex'
    sectionNone.style.display = 'none'
    sectionStatus.style.display = 'flex'
    sectionHigh = event.currentTarget.id
    telaHigh = event.currentTarget.id

    if (divIconHigh == 'conversasDiv') {
        const divMessages = document.getElementById('conversasTela')
        const divInput = document.getElementById('divInputMain')
        const divHeader = document.getElementById('headerMain')
        const sectionMain = document.getElementById('sectionMain')

        sectionMain.style.backgroundImage = 'none'
        divMessages.style.display = 'none'
        divInput.style.display = 'none'
        divHeader.style.display = 'none'
    }

    if (divIconHigh != iconStatus.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('statusDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconStatus.src = '../img/statusBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconStatus.parentNode.id
    }
})

iconCanais.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = '../img/conversas.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = '../img/status.png'

    } else if (sectionHigh == 'comunidades') {
        iconComunidade.src = '../img/comunidade.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = '../img/config.png'

    }

    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    const highTela = document.getElementById(`${telaHigh}Tela`)
    let telaCanais = document.getElementById('canaisTela')
    highTela.style.display = 'none'
    telaCanais.style.display = 'flex'
    sectionNone.style.display = 'none'
    sectionCanais.style.display = 'flex'
    sectionHigh = event.currentTarget.id
    telaHigh = event.currentTarget.id

    if (divIconHigh == 'conversasDiv') {
        const divMessages = document.getElementById('conversasTela')
        const divInput = document.getElementById('divInputMain')
        const divHeader = document.getElementById('headerMain')
        const sectionMain = document.getElementById('sectionMain')

        sectionMain.style.backgroundImage = 'none'
        divMessages.style.display = 'none'
        divInput.style.display = 'none'
        divHeader.style.display = 'none'
    }

    if (divIconHigh != iconCanais.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('canaisDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconCanais.src = '../img/canaisBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconCanais.parentNode.id
    }
})

iconComunidade.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = '../img/conversas.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = '../img/status.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = '../img/canais.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = '../img/config.png'

    }

    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    const highTela = document.getElementById(`${telaHigh}Tela`)
    let telaComunidade = document.getElementById('comunidadesTela')
    highTela.style.display = 'none'
    telaComunidade.style.display = 'flex'
    sectionNone.style.display = 'none'
    sectionComunidades.style.display = 'flex'
    sectionHigh = event.currentTarget.id
    telaHigh = event.currentTarget.id

    if (divIconHigh == 'conversasDiv') {
        const divMessages = document.getElementById('conversasTela')
        const divInput = document.getElementById('divInputMain')
        const divHeader = document.getElementById('headerMain')
        const sectionMain = document.getElementById('sectionMain')

        sectionMain.style.backgroundImage = 'none'
        divMessages.style.display = 'none'
        divInput.style.display = 'none'
        divHeader.style.display = 'none'
    }

    if (divIconHigh != iconComunidade.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('comunidadesDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconComunidade.src = '../img/comunidadeBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconComunidade.parentNode.id
    }
})

iconConfig.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = '../img/conversas.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = '../img/status.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = '../img/canais.png'

    } else if (sectionHigh == 'comunidades') {
        iconComunidade.src = '../img/comunidade.png'

    }

    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    const highTela = document.getElementById(`${telaHigh}Tela`)
    let telaConfig = document.getElementById('configuracoesTela')
    highTela.style.display = 'none'
    telaConfig.style.display = 'flex'
    sectionNone.style.display = 'none'
    sectionConfig.style.display = 'flex'
    sectionHigh = event.currentTarget.id
    telaHigh = event.currentTarget.id

    if (divIconHigh == 'conversasDiv') {
        const divMessages = document.getElementById('conversasTela')
        const divInput = document.getElementById('divInputMain')
        const divHeader = document.getElementById('headerMain')
        const sectionMain = document.getElementById('sectionMain')

        sectionMain.style.backgroundImage = 'none'
        divMessages.style.display = 'none'
        divInput.style.display = 'none'
        divHeader.style.display = 'none'
    }

    if (divIconHigh != iconConfig.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('configuracoesDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconConfig.src = '../img/configBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconConfig.parentNode.id
    }
})

iconPerfil.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = '../img/conversas.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = '../img/status.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = '../img/canais.png'

    } else if (sectionHigh == 'comunidades') {
        iconComunidade.src = '../img/comunidade.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = '../img/config.png'
    }

    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    const highTela = document.getElementById(`${telaHigh}Tela`)
    let telaPerfil = document.getElementById('perfilTela')
    highTela.style.display = 'none'
    telaPerfil.style.display = 'flex'
    sectionNone.style.display = 'none'
    sectionPerfil.style.display = 'flex'
    sectionHigh = event.currentTarget.id
    telaHigh = event.currentTarget.id

    if (divIconHigh == 'conversasDiv') {
        const divMessages = document.getElementById('conversasTela')
        const divInput = document.getElementById('divInputMain')
        const divHeader = document.getElementById('headerMain')
        const sectionMain = document.getElementById('sectionMain')

        sectionMain.style.backgroundImage = 'none'
        divMessages.style.display = 'none'
        divInput.style.display = 'none'
        divHeader.style.display = 'none'
    }

    if (divIconHigh != iconPerfil.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('perfilDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconPerfil.parentNode.id
    }
})

const firstDivHigh = document.getElementById(`${divIconHigh}`)
firstDivHigh.style.backgroundColor = '#d2d2d2'
//loadContacts()