class ObjStorageClass {
    constructor () {
        this.obj = {};
    }
    addValue (key, value) {
        this.obj[key] = value;
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

    saveLS (nameLS) {
        localStorage.setItem(`${nameLS}`,JSON.stringify(this.obj));
    }

    getLS (nameLS) {
        let objJson = localStorage.getItem(`${nameLS}`);
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

let  drinkStorage = new ObjStorageClass();
let  dishStorage = new ObjStorageClass();

function addObj (storage, nameLS) {
    let obj = storage.getLS(nameLS);
    
    for(let i in obj) {
        storage.addValue(i, obj[i]);
    }  
}

addObj(drinkStorage, objText.drinkText.nameLS);
addObj(dishStorage, objText.dishText.nameLS);


let drinkInfoBtn = document.getElementById("drinkInformation");
drinkInfoBtn.addEventListener("click", ()=>{setInformation(objText.drinkText, drinkStorage, objText.drinkText.nameLS);});

let getDrinkInfoBtn = document.getElementById("getDrinkInformation");
getDrinkInfoBtn.addEventListener("click", ()=>{getInformation(objText.drinkText, drinkStorage);});

let delDrinkInfoBtn = document.getElementById("deleteDrinkInformation");
delDrinkInfoBtn.addEventListener("click", ()=>{deleteInformation(objText.drinkText, drinkStorage, objText.dishText.nameLS);});

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

function setInformation(text, storage, nameLS) {
    let name = prompt(text.enterName, '');
    let conf = confirm(text.isVal);
    let recipe = prompt(text.enterRecipe, '');
    let yesNo = (conf) ? 'да' : 'нет';
    storage.addValue(name, {yesNo, recipe});
    storage.saveLS(nameLS);
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
    } else {
        console.log(text.absent);
    }
    storage.saveLS(nameLS);
}

function getName(storage) {
    let allName = storage.getKeys();
    for (let i of allName) {
        console.log(i);
    } 
}





