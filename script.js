var results;
var section = 'home';
async function getsectionresults(section){
    try{
        var data = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=aXqGh0j5nyFbMVQEtcsYwKroomXgV7ee`);

        var finaldata = await data.json();

        results = finaldata.results;
        
        //return results;

        //console.log(results);
    } catch (err) {
        alert(err);
    }

}

var container = document.createElement('div');
container.classList.add('container');

var heading = document.createElement('h1');
heading.innerText = 'THE PERTINENT TIMES';
heading.setAttribute('class','text-center');

var navbar = document.createElement('nav');
navbar.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');

var navdiv = document.createElement('div');
navdiv.classList.add('collapse', 'navbar-collapse');
navdiv.id='navbarNavAltMarkup';

var div = document.createElement('div');
div.classList.add('navbar-nav');

var home = document.createElement('a');
home.classList.add('nav-link', 'active');

home.addEventListener('click',function(){display('home')}, false);
//home.href ='#';
home.innerText = 'HOME';
home.id = 'home';
home.name ='home';
var span = document.createElement('span');
span.setAttribute('class','sr-only');
span.innerHTML ='(current)';
home.append(span);

var world = document.createElement('a');
world.classList.add('nav-link');
//world.href ='#';
world.addEventListener('click',function(){display('world')}, false);
world.innerText = 'WORLD';
world.id = 'world';
world.name = 'world';

var politics = document.createElement('a');
politics.classList.add('nav-link');
//politics.href ='#';
politics.addEventListener('click',function(){display('politics')}, false);
politics.innerText = 'POLITICS';
politics.id = 'politics';
politics.name = 'politics';

var magazine = document.createElement('a');
magazine.classList.add('nav-link');
//magazine.href ='#';
magazine.addEventListener('click',function(){display('magazine')}, false);
magazine.innerText = 'MAGAZINE';
magazine.id = 'magazine';
magazine.name = 'magazine';

var technology = document.createElement('a');
technology.classList.add('nav-link');
//technology.href ='#';
technology.addEventListener('click',function(){display('technology')}, false);
technology.innerText = 'TECHNOLOGY';
technology.id = 'technology';
technology.name = 'technology';

var science = document.createElement('a');
science.classList.add('nav-link');
//science.href ='#';
science.addEventListener('click',function(){display('science')}, false);
science.innerText = 'SCIENCE';
science.id = 'science';
science.name = 'science';

var health = document.createElement('a');
health.classList.add('nav-link');
//health.href ='#';
health.addEventListener('click',function(){display('health')}, false);
health.innerText = 'HEALTH';
health.id = 'health';
health.name = 'health';

var sports = document.createElement('a');
sports.classList.add('nav-link');
//sports.href ='#';
sports.addEventListener('click',function(){display('sports')}, false);
sports.innerText = 'SPORTS';
sports.id = 'sports';
sports.name = 'sports';

var arts = document.createElement('a');
arts.classList.add('nav-link');
//arts.href ='#';
arts.addEventListener('click',function(){display('arts')}, false);
arts.innerText = 'ARTS';
arts.id = 'arts';
arts.name = 'arts';

var fashion = document.createElement('a');
fashion.classList.add('nav-link');
//fashion.href ='#';
fashion.addEventListener('click',function(){display('fashion')}, false);
fashion.innerText = 'FASHION';
fashion.id = 'fashion';
fashion.name = 'fashion';

var food = document.createElement('a');
food.classList.add('nav-link');
//food.href ='#';
food.addEventListener('click',function(){display('food')}, false);
food.innerText = 'FOOD';
food.id = 'food';
food.name = 'food';

var travel = document.createElement('a');
travel.classList.add('nav-link');
//travel.href ='#';
travel.addEventListener('click',function(){display('travel')}, false);
travel.innerText = 'TRAVEL';
travel.id = 'travel';
travel.name = 'travel';

div.append(home,world,politics,magazine,technology,science,health,sports,arts,fashion,food,travel);
navdiv.append(div);
navbar.append(navdiv);
container.append(heading ,navbar);

document.body.append(container);

async function display(val)
{    
    try{
        await getsectionresults(val);       
        await addcard(results);
        
    } catch (err) {
        alert(err);
    }
}

display('head');
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function addcard(results)
{    
   
    var newdiv = document.createElement('div');
    newdiv.id ='containerdiv';

    results.forEach(item => {
        var divcard = document.createElement('div');
    divcard.classList.add('card', 'mb-3');

    var divrow = document.createElement('div');
    divrow.classList.add('row', 'no-gutters');

    var divcol1 = document.createElement('div');
    divcol1.classList.add('col-md-9');

    var divbody = document.createElement('div');
    divbody.classList.add('card-body');

    var section = document.createElement('section');    

    var cat = document.createElement('h2');
    cat.classList.add('sectioncard','text-uppercase');
    cat.innerHTML = item['section'];
    var title = document.createElement('div');
    title.classList.add('titlecard');
    title.innerHTML = item['title'];
    var date = document.createElement('div');
    date.classList.add('datecard');
    date = new Date(item['created_date']);    
    date.innerHTML = month[date.getMonth()]+" "+date.getDate();
    var abstract = document.createElement('div');
    abstract.classList.add('abstractcard');
    abstract.innerHTML = item['abstract'];
    var cntreading = document.createElement('a');
    cntreading.classList.add('continuereading');
    cntreading.href = item['short_url'];
    cntreading.innerText = 'Continue reading';
    cntreading.id = 'continuereading';    

    section.append(cat,title,date,abstract,cntreading);
    divbody.append(section);

    divcol1.append(divbody);

    var divcol2 = document.createElement('div');
    divcol2.classList.add('col-md-3');

    var image = document.createElement('img');
    var imgurl;
    
            for(let i =0;i<item['multimedia'].length;i++){
                if(item['multimedia'][i].url.includes("articleInline")){
                    imgurl = item['multimedia'][i].url;
                    break;
                }
            }
   
    image.src = imgurl;   
    image.setAttribute('class','img_thumbnail');
    
    divcol2.append(image);

    divrow.append(divcol1,divcol2);
    divcard.append(divrow);
    newdiv.append(divcard);
    container.append(newdiv);

    
    });
    //var container = document.querySelector('.container2');
    let olddiv = document.getElementById('containerdiv');
    
    container.replaceChild(newdiv,olddiv);   
  
}


