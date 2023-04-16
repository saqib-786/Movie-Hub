let darkMode = document.querySelector('#darkMode');
let body = document.querySelector('body');
body.classList.add('lightMode');
let selectItems = document.querySelectorAll('.select-item');
let darkModeIcon = document.querySelector('#darkModeIcon');


darkMode.addEventListener('click',()=>{
    body.classList.toggle('darkMode');
   if(darkModeIcon.src === './Images/moon.png'){
    darkModeIcon.src = './Images/sun.png';
   }
 
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
   let lang = document.getElementById('language');
   let rate = document.getElementById('rating');
   let rankContainer = document.getElementById('body-rank');
   let imgContainer = document.getElementById('img-container');
   let yearContainer = document.getElementById('year-container');
//    let detailContainer = document.getElementById('detail-container')
   let num = 1;

   genres.addEventListener('change',()=>{
    data.forEach((names)=>{
        
        let div = document.createElement('div');
        
        
        div.setAttribute('class','moive-box')
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        h3.setAttribute('class','movie-title');
        let para = document.createElement('p');
        // let paraText = document.createTextNode('');
        // para.appendChild(paraText)


        
        if(genres.value === names.genres){
          
            div.innerHTML = `
            <div id="inner-box">
            <div id="num-container">${num++}</div>
            <div id="grid-container">
                <div id="img-container"><img src="https://image.tmdb.org/t/p/w45${names.poster_path}" /></div>
                <div id="detail-container">
                    <h3 class="movie-title">${names.title}</h3>
                    <span id="certification">${names.certification}</span>
                     <span class="duration">${names.genres}</span>
                     <span class="duration">${Math.floor(names.runtime / 60)}h ${names.runtime % 60}m</span>
                </div>
            </div>
        </div>
        <div id="year-container">${names.release_date.slice(0,4)}</div>   
            `
            rankContainer.appendChild(div);
            // div.setAttribute('class','movie-box')
            // innerBox.appendChild(grid);
            // grid.appendChild(imgContainer);
            // grid.appendChild(detailContainer);
            
            // div.appendChild(innerBox);

            // para.innerText = num++;
            // div.appendChild(numContainer.appendChild(para));
            // grid.appendChild(imgContainer);
            // grid.appendChild(detailContainer);
            // h3.innerText = names.title;

            // div.appendChild(grid.appendChild(detailContainer.appendChild(h3)));
            
            // let year = names.release_date.slice(0,4);
            // let text = document.createTextNode(year);
            
            // numContainer.innerHTML = p
            
            
            // yearContainer.appendChild(p);
            // div.appendChild(yearContainer.appendChild(p))
            // rankContainer.appendChild(div);
            

            
        }
    })
   })





   const movieDetails = [];
   genres.addEventListener('change',()=>{
    movieDetails.push(genres.value);
   console.log(movieDetails)

   });

   year.addEventListener('change',()=>{
    movieDetails.push(year.value);
    console.log(movieDetails)
   })

   let Lang  = document.getElementById('language')
   Lang.addEventListener('change',()=>{
    movieDetails.push(lang.value);
    console.log(movieDetails)

   })

   rate.addEventListener('change',()=>{
    movieDetails.push(rate.value);
   
   })


})()