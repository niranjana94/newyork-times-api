var results;

async function getsectionresults(section){
    try{
        var data = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=aXqGh0j5nyFbMVQEtcsYwKroomXgV7ee`);

        var finaldata = await data.json();

        results = finaldata.results;
       
    } catch (err) {
        alert(err);
    }

}

var container = document.createElement('div');
container.classList.add('container');

var heading = document.createElement('h1');
heading.innerText = 'THE PERTINENT TIMES';
heading.setAttribute('class','text-center');
heading.setAttribute('style','font-family:Alfa Slab One');


var navbar = document.createElement('nav');
navbar.classList.add('navbar', 'navbar-expand-lg', 'navbar-light','border-top','border-bottom');


var navdiv = document.createElement('div');
navdiv.classList.add('collapse', 'navbar-collapse');
navdiv.id='navbarNavAltMarkup';

var div = document.createElement('div');
div.classList.add('navbar-nav');

var home = document.createElement('a');
home.classList.add('nav-link');
home.addEventListener('click',function(){display('home')}, false);
home.innerText = 'HOME';
home.id = 'home';
home.name ='home';
var span = document.createElement('span');
span.setAttribute('class','sr-only');
span.innerHTML ='(current)';
home.append(span);

var world = document.createElement('a');
world.classList.add('nav-link');
world.addEventListener('click',function(){display('world')}, false);
world.innerText = 'WORLD';
world.id = 'world';
world.name = 'world';

var politics = document.createElement('a');
politics.classList.add('nav-link');
politics.addEventListener('click',function(){display('politics')}, false);
politics.innerText = 'POLITICS';
politics.id = 'politics';
politics.name = 'politics';

var magazine = document.createElement('a');
magazine.classList.add('nav-link');
magazine.addEventListener('click',function(){display('magazine')}, false);
magazine.innerText = 'MAGAZINE';
magazine.id = 'magazine';
magazine.name = 'magazine';

var technology = document.createElement('a');
technology.classList.add('nav-link');
technology.addEventListener('click',function(){display('technology')}, false);
technology.innerText = 'TECHNOLOGY';
technology.id = 'technology';
technology.name = 'technology';

var science = document.createElement('a');
science.classList.add('nav-link');
science.addEventListener('click',function(){display('science')}, false);
science.innerText = 'SCIENCE';
science.id = 'science';
science.name = 'science';

var health = document.createElement('a');
health.classList.add('nav-link');
health.addEventListener('click',function(){display('health')}, false);
health.innerText = 'HEALTH';
health.id = 'health';
health.name = 'health';

var sports = document.createElement('a');
sports.classList.add('nav-link');
sports.addEventListener('click',function(){display('sports')}, false);
sports.innerText = 'SPORTS';
sports.id = 'sports';
sports.name = 'sports';

var arts = document.createElement('a');
arts.classList.add('nav-link');
arts.addEventListener('click',function(){display('arts')}, false);
arts.innerText = 'ARTS';
arts.id = 'arts';
arts.name = 'arts';

var fashion = document.createElement('a');
fashion.classList.add('nav-link');
fashion.addEventListener('click',function(){display('fashion')}, false);
fashion.innerText = 'FASHION';
fashion.id = 'fashion';
fashion.name = 'fashion';

var food = document.createElement('a');
food.classList.add('nav-link');
food.addEventListener('click',function(){display('food')}, false);
food.innerText = 'FOOD';
food.id = 'food';
food.name = 'food';

var travel = document.createElement('a');
travel.classList.add('nav-link');
travel.addEventListener('click',function(){display('travel')}, false);
travel.innerText = 'TRAVEL';
travel.id = 'travel';
travel.name = 'travel';

div.append(home,world,politics,magazine,technology,science,health,sports,arts,fashion,food,travel);
navdiv.append(div);
navbar.append(navdiv);
container.append(heading ,navbar);
var container2 = document.createElement('div');
container2.classList.add('container','container2');
container2.style.paddingTop = '10px';
container2.id = 'container2';
//container2.setAttribute('style','font-family: Yanone Kaffeesatz, sans-serif;');

document.body.append(container,container2);

async function display(val)
{    
    try{
        var els = document.querySelectorAll('.active');
        for (var i = 0; i < els.length; i++) {
            els[i].classList.remove('active')
        }

        var sec = document.getElementById(val);
        sec.classList.add('active');
        await getsectionresults(val);       
        await addcard(results);
        
    } catch (err) {
        alert(err);
    }
}

display('home');

function addcard(results)
{    
   var container = document.getElementById('container2');
   container.innerHTML ="";
    var newdiv = document.createElement('div');
    newdiv.id ='containerdiv';

    results.forEach(item => {
        var divcard = document.createElement('div');
    divcard.classList.add('card', 'mb-3','border');

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
    var datecreated = document.createElement('div');
    datecreated.classList.add('datecard');
    date = new Date(item['created_date']);    
    datecreated.innerHTML = date.toLocaleString('default', { month: 'long' })+" "+date.getDate();
    var abstract = document.createElement('div');
    abstract.classList.add('abstractcard');
    abstract.innerHTML = item['abstract'];
    var cntreading = document.createElement('a');
    cntreading.classList.add('continuereading');
    cntreading.href = item['short_url'];
    cntreading.innerText = 'Continue reading';
    cntreading.id = 'continuereading';    

    section.append(cat,title,datecreated,abstract,cntreading);
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
    image.setAttribute('style','width:100%;height:100%;object-fit: cover;') 
    
    divcol2.append(image);

    divrow.append(divcol1,divcol2);
    divcard.append(divrow);
    newdiv.append(divcard);
    container.append(newdiv);    
    }); 
  
}




