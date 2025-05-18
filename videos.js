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
// const itm = {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

// create displayVideos
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
        </figure>
        <div class="flex mx-0 my-2">
          <div>
           <img class="rounded-full w-10 h-10 object-cover" src="${video.authors[0].profile_picture}"/> 
          </div>
          <div>
           <h2 class="font-bold">${video.title}</h2>
           <div class="flex">
              <p class="text-gray-400">${video.authors[0].profile_name}</p>
              ${video.authors[0].verified===true?'<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"':""}
           </div>
          </div>
       </div>`
        videosContainer.appendChild(divv)
    }
}
loadCategories()
loadVideos()