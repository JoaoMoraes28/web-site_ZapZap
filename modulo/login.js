'use strict'

const buttonLogin = document.getElementById('buttonLogin')
const inputUser = document.getElementById('userName')
const inputNumber = document.getElementById('numberPass')
const messageError = document.getElementById('messageError')
const arrowContacts = document.querySelector('.arrow')
const containerContacts = document.querySelector('.containerContatos')

async function callUser() {
    let user = inputUser.value
    let number = inputNumber.value

    if (user == '' || user == null || user == undefined || number == '' || number == null || number == undefined) {
        messageError.innerHTML = 'Campos obrigatórios vazios!'

    } else {
        let url = `https://api-zapzap.onrender.com/v1/user/${number}`
        let response = await fetch(url)

        let profile = await response.json()
        verifyDatasUser(profile, user, number)
    }

}

async function verifyDatasUser(profile, userName, number) {
    if (profile.status_code == 200) {
        if (String(profile.usuario[0].account).toLowerCase() == String(userName).toLowerCase()) {
            window.open(`main.html?number=${number}`, "_self")

        } else {
            messageError.innerHTML = 'Nome do usuário incorreto!'

        }

    } else {
        messageError.innerHTML = 'Usuário não encontrado!'

    }
}

arrowContacts.addEventListener('click', () => {
    containerContacts.classList.toggle('containerExpandido')
    arrowContacts.classList.toggle('imgBaixo')
})

buttonLogin.addEventListener('mouseenter', () => {
    buttonLogin.style.backgroundColor = '#1daa61'
    buttonLogin.style.color = 'white'
})

buttonLogin.addEventListener('mouseleave', () => {
    buttonLogin.style.backgroundColor = 'white'
    buttonLogin.style.color = '#1daa61'
})

buttonLogin.addEventListener('click', async () => {
    await callUser()
})

inputUser.addEventListener('keypress', async (event) => {
    if (event.key == 'Enter') {
        await callUser()
    }
})

inputNumber.addEventListener('keypress', async (event) => {
    if (event.key == 'Enter') {
        await callUser()
    }
})