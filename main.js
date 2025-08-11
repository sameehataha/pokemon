const form = document.querySelector('form')
const loading = document.querySelector('.loading');
const search = document.querySelector('#search')
const result = document.querySelector('.result')
const randomBtn = document.querySelector('.btn-random')
const maxNum = 650

randomBtn.addEventListener('click', () => {
     removeResult()
     loading.classList.remove('d-none')
     let ranNum = Math.floor(Math.random() * maxNum)
     const URI = `https://pokeapi.co/api/v2/pokemon/${ranNum}`;
     getPokemon(URI,ranNum)
})

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    removeResult()
    loading.classList.remove('d-none')
    loadPokemon();
})

const removeResult = () =>{
   result.className = 'result';
   result.innerHTML = ''; 
}
result.addEventListener('click', removeResult)

const getPokemon = async(URI,text) => {
    try{
         const res = await fetch(URI);
         if(!res.ok || !text || text <= 0 || text >= maxNum){
            throw 'Please only numbers between 1 and 649 or type the name correctly'
         }
         const data = await res.json()
         console.log(data)
         const {id,name, sprites: {other:{dream_world:{front_default}}}} = data;
        setTimeout(() => {
                loading.classList.add('d-none');
                result.className = 'result active'
                result.innerHTML= `
                    <div class="pokebox found">
                        <span class="closebox">x</span>
                        <img src="${front_default}" alt="${name}" class="pokemon">
                        <h3 class="pokemon">${name}</h3>
                        <p class="pokenumber">#${id.toString().padStart(3, '0')}</p>
                    </div>`;
                search.value = null;  
        },1000)
        
    } catch(error){
        setTimeout(() => {
                loading.classList.add('d-none');
                result.className = 'result active'
                let pokenumber = search.value ? (isNaN(search.value) ? search.value:`#${search.value}`) : '';
                result.innerHTML= `
                <div class="pokebox notfound">
                    <span class="closebox">x</span>
                    <h1><span>4</span><img src="ball.png" alt="pokeball"/><span>4</span></h1>
                    <p>Pokemon <span class="pokenumber">${pokenumber}</span> not found</p>
                </div>`;
                search.value = null;  
        },1600)
    }
}
 function loadPokemon() {
    let text = search.value.trim()
    if(isNaN(text)) text = text.toLowerCase();
    const URI = `https://pokeapi.co/api/v2/pokemon/${text}`;
    getPokemon(URI,text)
 }