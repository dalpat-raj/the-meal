const mainn = document.querySelector('.main');
const formm = document.getElementById('formm');
const search = document.getElementById('search');
const id_select = document.getElementById('id_select');
const go_back = document.querySelector('.go_back');
const menu_btn = document.getElementById('menu_btn');
const headerr = document.querySelector('.header');


menu_btn.addEventListener('click',()=>{
    headerr.classList.toggle('headerrr')
})

// *******************  select event   *******************
id_select.addEventListener('change',(e)=>{
    e.preventDefault();
    let vlvl = id_select.value;
    mainn.innerHTML = '';
    mainn.classList.toggle('hide')
    
    if(vlvl){
        searchmeal(vlvl);
        mainn.classList.toggle('active')
    }
    else{
        alert('please enter meal name')
    }
})

// **************************   search event **************
formm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let searchvalue = search.value;
    mainn.innerHTML = '';
    mainn.classList.toggle('hide')

    if(searchvalue){
        searchmeal(searchvalue);
        search.value = '';
        mainn.classList.toggle('active')
    }else{
        alert('please enter meal name')
    }
})

// ****************************   search meal  **************

function searchmeal(srvalue){
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c='+ srvalue).then((resp)=>{
        return resp.json()
    }).then((daya)=>{
        mealsearch(daya.meals);
    }).catch(erro =>{
        mainn.innerHTML = `<h2>Sorry Data not found<br>
        <small>Please enter vaild name</small><br>
        <button class="btn go_back" id="go_back">go-back</button></h2>
        `;
        document.getElementById('go_back').addEventListener('click',()=>{
            mainn.innerHTML = '';
            getmeal();
        })
    })
}

function mealsearch(semeal){
    semeal.forEach((mealse)=>{
        const credivv = document.createElement('div')
        credivv.classList.add('container')
        
        credivv.innerHTML = `<div class="dataa"><div class="imgg">
        <img src="${mealse.strMealThumb}" alt="${mealse.strMealThumb}">
        </div>
        <div>
        <h4 class="categ">${mealse.strMeal}</h4>
        </div>
        </div>`;
        mainn.appendChild(credivv);
    })
}


// *********************   display meals  **************
getmeal();

function getmeal(){
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then((resp)=>{
        return resp.json();
    }).then((meal)=>{
        creatmeal(meal.categories);
    })
}

function creatmeal(meals){
    meals.forEach(catt => {
        const creop = document.createElement('option');
        creop.setAttribute('value', `${catt.strCategory}`);
        creop.innerHTML = `${catt.strCategory}`
        id_select.appendChild(creop)

        const crediv = document.createElement('div')
        crediv.classList.add('container')
        crediv.innerHTML = `<div class="dataa"><div class="imgg">
        <img src="${catt.strCategoryThumb}" alt="${catt.strCategoryThumb}">
        </div>
        <div>
        <h4 class="categ">${catt.strCategory}</h4>
        </div>
        </div>`;
        mainn.append(crediv);
    })
}
