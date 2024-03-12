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

let  drinkStorage = new ObjStorageClass();
let  dishStorage = new ObjStorageClass();

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
    store(storage);
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

function deleteInformation(text, storage ) {
    let name = prompt(text.enterName, '');
    let deleteVal = storage.deleteValue(name);
    if (deleteVal) {
        console.log(text.remove);
    } else {
        console.log(text.absent);
    }
    store(storage);
}

function getName(storage) {
    let allName = storage.getKeys();
    for (let i of allName) {
        console.log(i);
    } 
}


function store(storage) {
    if(storage == drinkStorage) {
        localStorage.setItem('lsDrinkStorage',JSON.stringify(storage));
    } else if(storage == dishStorage) {
        localStorage.setItem('lsDishStorage',JSON.stringify(storage));
    } 
 }
 
function getObj(storage) {
    let objJson, drinkObj;

    if(storage == drinkStorage) {
        objJson = localStorage.getItem('lsDrinkStorage');

        if(objJson) {
            drinkObj = JSON.parse(objJson).obj;
        } 

    } else if(storage == dishStorage) {
        objJson = localStorage.getItem('lsDishStorage');

        if(objJson) {
            drinkObj = JSON.parse(objJson).obj;
        } 
    }

    for(let i in drinkObj) {
        storage.addValue(i, drinkObj[i]);
    } 
}

getObj(drinkStorage);
getObj(dishStorage);



