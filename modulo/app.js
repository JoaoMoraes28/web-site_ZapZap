'use strict'

//Variáveis responsáveis por guardar qual section e ícone está em exibição no momento
var fisrtCall = true
var sectionHigh = 'conversas'
var telaHigh = 'inicial'
var divIconHigh = 'conversasDiv'
var firstContactEvent = true

var contatos = []
const iconContatos = document.getElementById('conversas')
const iconStatus = document.getElementById('status')
const iconCanais = document.getElementById('canais')
const iconComunidade = document.getElementById('comunidades')
const iconConfig = document.getElementById('configuracoes')
const iconPerfil = document.getElementById('perfil')
const iconClose = document.getElementById('closeNot')
const sectionConversas = document.getElementById('conversasSection')
const sectionStatus = document.getElementById('statusSection')
const sectionCanais = document.getElementById('canaisSection')
const sectionComunidades = document.getElementById('comunidadesSection')
const sectionConfig = document.getElementById('configuracoesSection')
const sectionPerfil = document.getElementById('perfilSection')
const containerMicrophone = document.getElementById('containerMichophone')
const iconLogout = document.getElementById('logout')
const questionLogout = document.getElementById('logoutQuestion')
const filterBlack = document.getElementById('filterBlack')
const cancelLogout = document.getElementById('cancelLogout')
const confirmLogout = document.getElementById('confirmLogout')
const inputHeader = document.getElementById('inputHeader')
const progressBar = document.getElementById('progress')

//Var para extrair dados da url
var urlSearch = new URLSearchParams(location.search)
var numberUser = urlSearch.get('number')

//Retorna todos os contatos
async function loadContacts() {
    let url = `https://api-zapzap.onrender.com/v1/messages/${numberUser}`
    let response = await fetch(url)

    let contacts = await response.json()
    createContacts(contacts.messages[0])
}

//Retorna todas mensagens
async function getMessages(id) {
    let url = `https://api-zapzap.onrender.com/v1/message?user=${numberUser}&contact=${id}`
    let response = await fetch(url)

    let messages = await response.json()
    return messages
}

//Retorna os dados do usuário
async function getDadaProfile() {
    let url = `https://api-zapzap.onrender.com/v1/user/${numberUser}`
    let response = await fetch(url)

    let profile = await response.json()
    return profile
}

//Distribui os dados pelo perfil do usuário
async function buildProfile() {
    let profile = await getDadaProfile()
    const imgNav = document.getElementById('perfil')
    const imgStatus = document.getElementById('perfilStatusImg')
    const imgConfig = document.getElementById('perfilConfigImg')
    const nameConfig = document.getElementById('nomeConfig')
    const imgProfile = document.getElementById('imgPerfilHeader')
    const nameProfile = document.getElementById('nomePerfil')
    const phone = document.getElementById('telefonePerfil')

    imgNav.src = profile.usuario[0]["profile-image"]
    imgStatus.src = profile.usuario[0]["profile-image"]
    imgConfig.src = profile.usuario[0]["profile-image"]
    nameConfig.innerHTML = profile.usuario[0].account
    imgProfile.src = profile.usuario[0]["profile-image"]
    nameProfile.innerHTML = profile.usuario[0].account
    phone.innerHTML = profile.usuario[0].number
}

//Criação dos cards de contato
function createContacts(contacts) {
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

        img.src = contact.image

        divContato.id = `${contact.number}/divisor/${contact.name}/divisor/${contact.image}`
        pNome.innerHTML = contact.name
        pUltimaMensagem.innerHTML = contact.messages[lastMessage].content
        pData.innerHTML = contact.messages[lastMessage].time

        contatos.push(divContato)
    });
    contatos.forEach(addListener)
}

//Adiciona o listener em cada card de contato
function addListener(contato) {
    contato.addEventListener('click', async () => {
        let id = String(event.currentTarget.id).split('/divisor/')
        const sectionConversa = document.getElementById('conversasTela')
        const sectionMain = document.getElementById('sectionMain')
        const nomeMain = document.getElementById('nomeMain')
        const imgPerfil = document.getElementById('imgPerfilMain')

        if (fisrtCall) {
            const inputMain = document.getElementById('divInputMain')
            const headerMain = document.getElementById('headerMain')
            const telaInicial = document.getElementById('inicialTela')

            sectionMain.style.backgroundImage = 'url(img/zapzap.jpg)'
            sectionConversa.style.justifyContent = 'start'
            sectionConversa.style.alignItems = 'start'
            telaInicial.style.display = 'none'
            headerMain.style.display = 'flex'
            inputMain.style.display = 'flex'

            fisrtCall = false
        }

        nomeMain.innerHTML = id[1]
        console.log(id[2])
        imgPerfil.src = id[2]

        while (sectionConversa.firstChild) {
            sectionConversa.removeChild(sectionConversa.firstChild)
        }

        firstContactEvent = false
        let messages = await getMessages(id[0])
        messages.message[0].messages[0].forEach(createMessages)
    })

}

//Cria as divs de cada mensagem
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

//Pesquisa um contato em específico
function findContact(name) {
    contatos.forEach((contato) => {
        if (String(contato.id).toLowerCase().includes(name.toLowerCase())) {
            contato.style.display = 'flex'

        } else {
            contato.style.display = 'none'

        }
    })
}

inputHeader.addEventListener('input', () => {
    findContact(inputHeader.value)
})

//Código para interação entre os ícones na barra de navegação
//Listener responsável por exibir tela e section selecionado e ocultar as anteriores
iconContatos.addEventListener('click', () => {
    if (sectionHigh == 'comunidades') {
        iconComunidade.src = 'img/comunidade.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = 'img/status.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = 'img/canais.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = 'img/config.png'

    }

    let sectionNone = document.getElementById(`${sectionHigh}Section`)
    const highTela = document.getElementById(`${telaHigh}Tela`)
    const telaInicial = document.getElementById('inicialTela')
    highTela.style.display = 'none'
    telaInicial.style.display = 'flex'
    sectionNone.style.display = 'none'
    sectionConversas.style.display = 'flex'
    sectionHigh = event.currentTarget.id
    telaHigh = event.currentTarget.id

    if (!firstContactEvent) {
        const divMessages = document.getElementById('conversasTela')
        const divInput = document.getElementById('divInputMain')
        const divHeader = document.getElementById('headerMain')
        const sectionMain = document.getElementById('sectionMain')
        telaInicial.style.display = 'none'

        sectionMain.style.backgroundImage = 'url(img/zapzap.jpg)'
        divMessages.style.display = 'flex'
        divInput.style.display = 'flex'
        divHeader.style.display = 'flex'
    }

    if (divIconHigh != iconContatos.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('conversasDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconContatos.src = 'img/conversasBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconContatos.parentNode.id
    }
})

iconStatus.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = 'img/conversas.png'

    } else if (sectionHigh == 'comunidades') {
        iconComunidade.src = 'img/comunidade.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = 'img/canais.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = 'img/config.png'

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
        const telaInicial = document.getElementById('inicialTela')

        telaInicial.style.display = 'none'
        sectionMain.style.backgroundImage = 'none'
        divMessages.style.display = 'none'
        divInput.style.display = 'none'
        divHeader.style.display = 'none'
    }

    if (divIconHigh != iconStatus.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('statusDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconStatus.src = 'img/statusBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconStatus.parentNode.id
    }
})

iconCanais.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = 'img/conversas.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = 'img/status.png'

    } else if (sectionHigh == 'comunidades') {
        iconComunidade.src = 'img/comunidade.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = 'img/config.png'

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
        const telaInicial = document.getElementById('inicialTela')

        telaInicial.style.display = 'none'
        sectionMain.style.backgroundImage = 'none'
        divMessages.style.display = 'none'
        divInput.style.display = 'none'
        divHeader.style.display = 'none'
    }

    if (divIconHigh != iconCanais.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('canaisDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconCanais.src = 'img/canaisBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconCanais.parentNode.id
    }
})

iconComunidade.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = 'img/conversas.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = 'img/status.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = 'img/canais.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = 'img/config.png'

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
        const telaInicial = document.getElementById('inicialTela')

        telaInicial.style.display = 'none'
        sectionMain.style.backgroundImage = 'none'
        divMessages.style.display = 'none'
        divInput.style.display = 'none'
        divHeader.style.display = 'none'
    }

    if (divIconHigh != iconComunidade.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('comunidadesDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconComunidade.src = 'img/comunidadeBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconComunidade.parentNode.id
    }
})

iconConfig.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = 'img/conversas.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = 'img/status.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = 'img/canais.png'

    } else if (sectionHigh == 'comunidades') {
        iconComunidade.src = 'img/comunidade.png'

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
        const telaInicial = document.getElementById('inicialTela')

        telaInicial.style.display = 'none'
        sectionMain.style.backgroundImage = 'none'
        divMessages.style.display = 'none'
        divInput.style.display = 'none'
        divHeader.style.display = 'none'
    }

    if (divIconHigh != iconConfig.parentNode.id) {
        const highDiv = document.getElementById(`${divIconHigh}`)
        const divIcon = document.getElementById('configuracoesDiv')
        divIcon.style.backgroundColor = '#d2d2d2'
        iconConfig.src = 'img/configBlack.png'
        highDiv.style.backgroundColor = ''
        divIconHigh = iconConfig.parentNode.id
    }
})

iconPerfil.addEventListener('click', () => {
    if (sectionHigh == 'conversas') {
        iconContatos.src = 'img/conversas.png'

    } else if (sectionHigh == 'status') {
        iconStatus.src = 'img/status.png'

    } else if (sectionHigh == 'canais') {
        iconCanais.src = 'img/canais.png'

    } else if (sectionHigh == 'comunidades') {
        iconComunidade.src = 'img/comunidade.png'

    } else if (sectionHigh == 'configuracoes') {
        iconConfig.src = 'img/config.png'
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
        const telaInicial = document.getElementById('inicialTela')

        telaInicial.style.display = 'none'
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

iconLogout.addEventListener('click', () => {
    questionLogout.classList.remove('reverse')
    questionLogout.style.opacity = 1
    questionLogout.classList.add('expandir')
    filterBlack.style.display = 'flex'
})

filterBlack.addEventListener('click', () => {
    questionLogout.classList.remove('expandir')
    questionLogout.style.opacity = 0
    questionLogout.classList.add('reverse')
    filterBlack.style.display = 'none'
})

cancelLogout.addEventListener('click', () => {
    questionLogout.classList.remove('expandir')
    questionLogout.style.opacity = 0
    questionLogout.classList.add('reverse')
    filterBlack.style.display = 'none'
})

confirmLogout.addEventListener('click', () => {
    window.open('index.html', "_self")
})

iconClose.addEventListener('click', () => {
    const divNotification = document.getElementsByClassName('notificacoesDes')
    sectionConversas.style.height = 'calc(100% + 62.5px)'
    sectionConversas.style.marginTop = '-62.5px'
    divNotification[0].style.display = 'none'
})

containerMicrophone.addEventListener('mouseenter', () => {
    const michophone = document.getElementById('michophone')
    michophone.src = 'img/whiteMicrophone.png'
    containerMicrophone.style.backgroundColor = '#1daa61'
})

containerMicrophone.addEventListener('mouseleave', () => {
    const michophone = document.getElementById('michophone')
    michophone.src = 'img/voz.png'
    containerMicrophone.style.backgroundColor = ''
})

var a

function loadProgress() {
    console.log(contatos.length)
    if (contatos.length > 0) {
        progressBar.style.width = '100%'
        let divProgress = document.querySelector('.progressBar')
        divProgress.style.display = 'none'
        clearTimeout(a)
    }
}

setTimeout(() => {
    a = setInterval(loadProgress, 200)
}, 4000)

//Define a cor de fundo para o ícone de mensagem
const firstDivHigh = document.getElementById(`${divIconHigh}`)
firstDivHigh.style.backgroundColor = '#d2d2d2'
buildProfile()
loadContacts()