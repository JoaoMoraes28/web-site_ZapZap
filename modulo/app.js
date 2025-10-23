'use strict'



async function loadContacts() {
    let url = 'https://api-zapzap.onrender.com/v1/messages/11987876567'
    let response = await fetch(url)

    let contacts = await response.json()
    console.log(contacts.messages)
}

loadContacts()