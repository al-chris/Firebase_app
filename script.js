
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL : "https://first-ae918-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-button")
const shoppingListEL = document.getElementById("shopping-list")


onValue(shoppingListInDB, function(snapshot){

    if (snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val())

        clearShoppingListEl()
        
        for (let i=0; i < shoppingListArray.length; i++) {

            let currentItem = shoppingListArray[i]

            appendItemToShoppingListEl(currentItem)

        }
    } else {
        shoppingListEL.innerHTML = "No items here... yet"
    }
})


inputFieldEl.addEventListener("focusin", function() {
    this.placeholder = ""
})

inputFieldEl.addEventListener("focusout", function() {
    this.placeholder = "Bread"
})

addButtonEL.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

})

function clearShoppingListEl(){
    
    shoppingListEL.innerHTML = ""

}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {

    let itemId = item[0]

    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {

        let exactLocationOfItemInDb = ref(database, 'shoppingList/' + itemId)

        remove(exactLocationOfItemInDb)

    })

    shoppingListEL.append(newEl)
}