const getTime=(time)=>{
  let hour=parseInt(time/3600)
  let remainingSeconds=time%3600
  let minute=parseInt(remainingSeconds/60)
  remainingSeconds=remainingSeconds%60;
  return `${hour} hour ${minute} minute ${remainingSeconds} second ago`
}


//1- fetch, load and Show categories in html
//create loadCategories
const loadCategories = async () => {
    const fetched = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await fetched.json()
    const display = displayCategories(data.categories)
}
//create loadVideos
const loadVideos = async () => {
    const fetched = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await fetched.json()
    const display = displayVideos(data.videos)
}
//create displayCategories
const displayCategories = (data) => {
    const buttonContainer = document.getElementById('btn-container')
    for (const item of data) {
        const btn = document.createElement('button')
        btn.classList = 'btn'
        btn.innerText = item.category
        buttonContainer.appendChild(btn)
    }
}
//create displayVideos
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container')
    for (const video of videos) {
        const divv = document.createElement('div')
        divv.classList = "card bg-base-100"
        divv.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"
            src=${video.thumbnail}
            alt="Shoes" />
            ${
                video.others.posted_date?.length==0?"":`<span class="absolute right-2 bottom-2 bg-black text-white p-1">${getTime(video.others.posted_date)}</span>`
            }
        </figure>
        <div class="flex mx-0 my-2">
          <div>
           <img class="rounded-full w-10 h-10 object-cover" src="${video.authors[0].profile_picture}"/> 
          </div>
          <div>
           <h2 class="font-bold">${video.title}</h2>
           <div class="flex">
              <p class="text-gray-400">${video.authors[0].profile_name}</p>
              ${
                video.authors[0].verified===true? '<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"' :""
              }
           </div>
          </div>
       </div>`
        videosContainer.appendChild(divv)
    }
}
loadCategories()
loadVideos()