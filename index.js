
function search(fullName='') {
    let countriesList = document.getElementById("counrties_list");
    countriesList.innerHTML = '';

    let searchALert = document.getElementById('search_alert');
     let requestURL;
    if(fullName) {
         requestURL = 'https://restcountries.eu/rest/v2/name/'+fullName+'?fullText=true';  

    } else {
      
    let seachText = document.getElementById('search_text').value;
     requestURL = 'https://restcountries.eu/rest/v2/name/'+seachText;  
    }
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      const country = request.response;
      //console.log(country);
      if (country["status"] == 404) {
          search_alert.innerHTML = "at least Not in our planet!";
      } else if (country.length > 1) {
          search_alert.innerHTML = "i fund more than one!";  
            createList(country)
      } else if (country.length == 1) {
          search_alert.innerHTML = "i found it!";
          showCountry(country[0]);
      }
    }
    
    return false;    
}

function createList(countries) {
    let countriesList = document.getElementById("counrties_list");
    countriesList.innerHTML = '';
    for (c in countries) {
        //console.log(countries[c].name)
        let nameLink = document.createElement("li");
        nameLink.setAttribute('data-fullName' , countries[c].name); 
        nameLink.innerHTML = countries[c].name;
        nameLink.addEventListener('click',function(){
             search(this.innerHTML);
            //console.log(this)
        })
        countriesList.appendChild(nameLink);        
    }   
     
}


function showCountry(country){
    let name = document.getElementById("name");
    let flag = document.getElementById("flag");
    let nativeName = document.getElementById("nativeName");
    let region = document.getElementById("region");
    let capital = document.getElementById("capital");
    let population = document.getElementById("population");
    let demonym = document.getElementById("demonym");

    console.log(country);
    name.innerHTML = country["name"];
    nativeName.innerHTML = country["nativeName"];
    region.innerHTML = country["region"];
    capital.innerHTML = country["capital"];
    population.innerHTML = country["population"];
    demonym.innerHTML = country["demonym"];
    flag.setAttribute ('src',country["flag"]);
    
}