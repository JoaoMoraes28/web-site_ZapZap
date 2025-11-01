'use strict'

async function loadContacts() {
    let url = 'https://api-zapzap.onrender.com/v1/messages/11987876567'
    let response = await fetch(url)

    let contacts = await response.json()
    createContacts(contacts.messages[0])
}

function createContacts(contacts) {
    const sectionConversas = document.getElementById('sectionConversas')
    
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

        // img.src = contact.image
        pNome.innerHTML = contact.name
        pUltimaMensagem.innerHTML = contact.messages[lastMessage].content
        pData.innerHTML = contact.messages[lastMessage].time
    });

}

// loadContacts()