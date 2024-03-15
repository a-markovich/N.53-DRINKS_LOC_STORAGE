class ObjStorageClass {
    constructor (nameLS) {
        this.nameLS = nameLS;
        this.obj = {};
        let objJson = localStorage.getItem(this.nameLS);
        if (objJson) {
            this.obj = JSON.parse(objJson);
        }
    }
    addValue (key, value) {
        this.obj[key] = value;
        localStorage.setItem(this.nameLS, JSON.stringify(this.obj));
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
        localStorage.setItem(this.nameLS, JSON.stringify(this.obj));
        return result;
    }
    getKeys () {
        return Object.keys(this.obj);
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
                },

    dishText : {enterName : "Введите название блюда",
                isVal : "Блюдо горячее?",
                enterRecipe : "Введите рецепт блюда",
                name : "блюдо:",
                value: "горячее:",
                recipe : "рецепт приготовления:",
                absent : "такое блюдо отсутствует",
                remove : "блюдо удалено",
                },
};

let  drinkStorage = new ObjStorageClass("lsDrinkStorage");
let  dishStorage = new ObjStorageClass("lsDishStorage");

let drinkInfoBtn = document.getElementById("drinkInformation");
drinkInfoBtn.addEventListener("click", ()=>{setInformation(objText.drinkText, drinkStorage);});

let getDrinkInfoBtn = document.getElementById("getDrinkInformation");
getDrinkInfoBtn.addEventListener("click", ()=>{getInformation(objText.drinkText, drinkStorage);});

let delDrinkInfoBtn = document.getElementById("deleteDrinkInformation");
delDrinkInfoBtn.addEventListener("click", ()=>{deleteInformation(objText.drinkText, drinkStorage);});

let getDrinkNameBtn = document.getElementById("getDrinkName");
getDrinkNameBtn.addEventListener("click", ()=>{getName(drinkStorage);});


let dishInfoBtn = document.getElementById("dishInformation");
dishInfoBtn.addEventListener("click", ()=>{setInformation(objText.dishText, dishStorage);});

let getDishInfoBtn = document.getElementById("getDishInformation");
getDishInfoBtn.addEventListener("click", ()=>{getInformation(objText.dishText, dishStorage);});

let delDishInfoBtn = document.getElementById("deleteDishInformation");
delDishInfoBtn.addEventListener("click", ()=>{deleteInformation(objText.dishText, dishStorage);});

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

function deleteInformation(text, storage) {
    let name = prompt(text.enterName, '');
    let deleteVal = storage.deleteValue(name);
    if (deleteVal) {
        console.log(text.remove);
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




