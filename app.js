let darkMode = document.querySelector('#darkMode');
let body = document.querySelector('body');
body.classList.add('lightMode');
let selectItems = document.querySelectorAll('.select-item');
let darkModeIcon = document.querySelector('#darkModeIcon');
let modeText = document.querySelector('#modeText');
let header = document.querySelector('header');
let select = document.querySelectorAll('select');
let logo = document.querySelector('#logo');
let movieTitle = document.querySelectorAll('movie-title');

movieTitle.forEach((item)=>{
    // if(body.className === 'darkMode'){
    //     item.classList.add('movie-title-dark');
    // }else{
    //     item.classList.add('movie-title');
    // }
    console.log(item.classList);
})

darkMode.addEventListener('click',()=>{
    if(darkModeIcon.getAttribute('src') == '/Images/sun.png'){
        darkModeIcon.setAttribute('src','/Images/moon.png')  ;
    }else{
        darkModeIcon.setAttribute('src','/Images/sun.png')  ;
    };
    body.classList.toggle('darkMode');

    if(modeText.innerText == 'Dark Mode'){
        modeText.innerText = 'Light Mode';
    }else{
        modeText.innerText = 'Dark Mode';
    }
    if(header.className === 'headerLight'){
        header.classList.add('headerDark');
    }else{
        header.classList.remove('headerDark');
    };

    select.forEach((selectItem)=>{
        selectItem.classList.toggle('selectDark');
    });

    if(logo.getAttribute('src') == './Images/logo light.png'){
        logo.setAttribute('src','./Images/logo dark.png');
    }else{
        logo.setAttribute('src','./Images/logo light.png');
    }

    
   
    // darkModeIcon.src = './Images/sun.png'
 
    // selectItems.forEach((item)=>{
    //     item.style.backgroundColor = '#607d8b'
    // })
});


        


(async function(){
    let response = await fetch('./data.json');
    let language = [];
    let data  = await response.json();
    // inserting languages dynamically 
    data.forEach((item)=>{
        language.push((item.original_language));
        
    })
    let newLanguage = [...new Set(language)];
    newLanguage.forEach((lang)=>{
        let language = document.getElementById('language');
        let option = document.createElement('option');
        option.innerHTML = lang;
        language.appendChild(option);
    })
   // inserting year dynamically
   let selectYear = document.getElementById('year');
   let yearArray = [];
   data.forEach((dates)=>{
    let year = dates.release_date.slice(0,4);
    yearArray.push(year);
    
   });
   yearArray = [...new Set(yearArray)];
   yearArray.sort();
   yearArray.forEach((year)=>{
    let option = document.createElement('option');
    option.innerText = year;
    selectYear.appendChild(option);
   });
   //Inserting rating dynamically
   let ratingArray = [];
   data.forEach((rating)=>{
    ratingArray.push(rating.vote_average);
    
   });
   ratingArray = [...new Set(ratingArray)];
   ratingArray.sort();
   let rating = document.getElementById('rating');
   ratingArray.forEach((rate)=>{
    let option = document.createElement('option');
    option.innerText = rate;
    rating.appendChild(option);

   });
   // filtering movie

 
   let genres = document.getElementById('genre');
   let year = document.getElementById('year');
//    let lang = document.getElementById('language');
   let rate = document.getElementById('rating');
   let rankContainer = document.getElementById('body-rank');

   let num = 1;
   function loadMovieData(result){
    
    result.filter((item)=>{
        // rankContainer.innerHTML = '';
        let div = document.createElement('div');
       div.setAttribute('class','moive-box');
        div.innerHTML = `
            <div id="inner-box">
            <div id="num-container">${num++}</div>
            <div id="grid-container">
                <div id="img-container"><img src="https://image.tmdb.org/t/p/w45${item.poster_path}" /></div>
                <div id="detail-container">
                    <h3 class="movie-title"><a target="_blank" href="${item.homepage}">${item.title}</a></h3>
                    <span id="certification">${item.certification}</span>
                     <span class="duration">${item.genres}</span>
                     <span class="duration">${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m</span>
                </div>
            </div>
        </div>
        <div id="year-container">${item.release_date.slice(0,4)}</div>   
            `
        rankContainer.appendChild(div);

    }); 

   };

   genres.addEventListener('change',()=>{
    rankContainer.innerHTML = '';
    let query = genres.value;
    let result = data.filter((e)=>{
        return e.genres.includes(query);
    });
    loadMovieData(result)
   })



   year.addEventListener('change',()=>{
    rankContainer.innerHTML = '';
    let query = year.value;
   let result = data.filter((val)=>{
        return val.release_date.includes(query) 
    });
    loadMovieData(result)
   })

   let Lang  = document.getElementById('language')
   Lang.addEventListener('change',()=>{
    rankContainer.innerHTML = '';
   let query = Lang.value;
   let result = data.filter((val)=>{
    return val.original_language.includes(query)
   });
   loadMovieData(result)

   })

   rate.addEventListener('change',()=>{
    rankContainer.innerHTML  = '';
    let query = rate.value;
    let result = data.filter((value)=>{
        return value.vote_average.toString() === query;
    });
  
    loadMovieData(result);
   
   })


})()

