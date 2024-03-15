class ObjStorageClass {
    constructor (nameLS) {
        this.nameLS = nameLS;
        this.obj = {};
    }
    addValue (key, value) {
        if(key) {
            this.obj[key] = value;
            localStorage.setItem(this.nameLS, JSON.stringify(this.obj));
        } else {
            localStorage.setItem(this.nameLS, JSON.stringify(this.obj));
        }
    }
    getValue (key) {
        if (key in this.obj) {
            return this.obj[key]
        } 
    }
    deleteValue (key) {
        let result = false;
        if (key in this.obj) {
            delete this.obj[key];
            result = true;
        }
        return result;
    }
    getKeys () {
        return Object.keys(this.obj);
    }
    getLS () {
        let objJson = localStorage.getItem(this.nameLS);
        if(objJson) {
            return JSON.parse(objJson);
        }
    }
}

let objText = {

    drinkText : {enterName : "Введите название напитка",
                 isVal : "Напиток алкогольный?",
                 enterRecipe : "Введите рецепт напитка",
                 name : "напиток:",
                 value: "алкогольный:",
                 recipe : "рецепт приготовления:",
                 absent : "такой напиток отсутствует",
                 remove : "напиток удален",
                 nameLS : "lsDrinkStorage",
                },

    dishText : {enterName : "Введите название блюда",
                isVal : "Блюдо горячее?",
                enterRecipe : "Введите рецепт блюда",
                name : "блюдо:",
                value: "горячее:",
                recipe : "рецепт приготовления:",
                absent : "такое блюдо отсутствует",
                remove : "блюдо удалено",
                nameLS : "lsDishStorage",
                },

};

let  drinkStorage = new ObjStorageClass("lsDrinkStorage");
let  dishStorage = new ObjStorageClass("lsDishStorage");

function addObj (storage) {
    let obj = storage.getLS();
    
    for(let i in obj) {
        storage.addValue(i, obj[i]);
    }  
}

addObj(drinkStorage);
addObj(dishStorage);

let drinkInfoBtn = document.getElementById("drinkInformation");
drinkInfoBtn.addEventListener("click", ()=>{setInformation(objText.drinkText, drinkStorage, objText.drinkText.nameLS);});

let getDrinkInfoBtn = document.getElementById("getDrinkInformation");
getDrinkInfoBtn.addEventListener("click", ()=>{getInformation(objText.drinkText, drinkStorage);});

let delDrinkInfoBtn = document.getElementById("deleteDrinkInformation");
delDrinkInfoBtn.addEventListener("click", ()=>{deleteInformation(objText.drinkText, drinkStorage, objText.drinkText.nameLS);});

let getDrinkNameBtn = document.getElementById("getDrinkName");
getDrinkNameBtn.addEventListener("click", ()=>{getName(drinkStorage);});


let dishInfoBtn = document.getElementById("dishInformation");
dishInfoBtn.addEventListener("click", ()=>{setInformation(objText.dishText, dishStorage, objText.dishText.nameLS);});

let getDishInfoBtn = document.getElementById("getDishInformation");
getDishInfoBtn.addEventListener("click", ()=>{getInformation(objText.dishText, dishStorage);});

let delDishInfoBtn = document.getElementById("deleteDishInformation");
delDishInfoBtn.addEventListener("click", ()=>{deleteInformation(objText.dishText, dishStorage, objText.dishText.nameLS);});

let getDishNameBtn = document.getElementById("getDishName");
getDishNameBtn.addEventListener("click", ()=>{getName(dishStorage);});

function setInformation(text, storage) {
    let name = prompt(text.enterName, '');
    let conf = confirm(text.isVal);
    let recipe = prompt(text.enterRecipe, '');
    let yesNo = (conf) ? 'да' : 'нет';
    storage.addValue(name, {yesNo, recipe});
}

function getInformation(text, storage) {
    let name = prompt(text.enterName, '');
    let info = storage.getValue(name);
    if (info) {
        console.log(`${text.name} ${name}
${text.value} ${info.yesNo}
${text.recipe} ${info.recipe}`);
    } else {
        console.log(text.absent);
    }
}

function deleteInformation(text, storage, nameLS) {
    let name = prompt(text.enterName, '');
    let deleteVal = storage.deleteValue(name);
    if (deleteVal) {
        console.log(text.remove);
        storage.addValue(null, null);
    } else {
        console.log(text.absent);
    }
}

function getName(storage) {
    let allName = storage.getKeys();
    for (let i of allName) {
        console.log(i);
    } 
}




