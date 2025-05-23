const getTime = (time) => {
    let hour = parseInt(time / 3600)
    let remainingSeconds = time % 3600
    let minute = parseInt(remainingSeconds / 60)
    remainingSeconds = remainingSeconds % 60;
    return `${hour} hour ${minute} minute ${remainingSeconds} second ago`
}
const removeActiveButtons = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for (let button of buttons) {
        button.classList.remove('colouring-btn')
    }
}
const categoryWiseVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(ref => ref.json())
        .then(data => {
            //remove the active from all
            removeActiveButtons();
            //add active to the specific button
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add("colouring-btn")
            displayVideos(data.category)
        })


}
const showDetails = async (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data)
}
const displayDetails = (video) => {
    const detailContainer = document.getElementById('ModalContent')
    detailContainer.innerHTML = `
       <img class="w-full" src="${video.video.thumbnail}" />
       <p>${video.video.description}</p>
    `
    document.getElementById('CustomModal').showModal();
}


//1- fetch, load and Show categories in html
//create loadCategories
const loadCategories = async () => {
    const fetched = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await fetched.json()
    const display = displayCategories(data.categories)
}
//2- fetch, load and Show videos in html
//create loadVideos
const loadVideos = async () => {
    const fetched = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await fetched.json()
    const display = displayVideos(data.videos)
}
//create displayCategories
const displayCategories = (data) => {
    const buttonContainer = document.getElementById('btn-container')
    //all button
    const divv = document.createElement('div')
    divv.innerHTML = `<button onclick="loadVideos()" class='btn'>All</button>`
    buttonContainer.appendChild(divv)
    //all button end
    for (const item of data) {
        const buttonDiv = document.createElement('div')
        buttonDiv.innerHTML = `
           <button id="btn-${item.category_id}" onclick="categoryWiseVideo('${item.category_id}')" class='btn category-btn'>
             ${item.category}
           </button>
        `
        buttonContainer.appendChild(buttonDiv);
    }
}
//create displayVideos
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container')
    videosContainer.innerHTML = ""
    if (videos.length == 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
           <div class="min-h-[300px] w-full flex flex-col justify-center items-center">
                  <img src='Icon.png'/>
                  <h1 class="text-3xl font-bold text-center">Oops!Sorry,There is no<br>content here</h1>
 
           </div>
        `
    } else {
        videosContainer.classList.add('grid')
    }
    for (const video of videos) {
        const divv = document.createElement('div')
        divv.classList = "card bg-base-100"
        divv.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"
            src=${video.thumbnail}
            alt="Shoes" />
            ${video.others.posted_date.length != 0 ? `<span class="absolute right-2 bottom-2 bg-black text-white p-1 text-xs">${getTime(video.others.posted_date)}</span>` : ''
            }
        </figure>
        <div class="flex mx-0 my-2 gap-2">
          <div>
           <img class="rounded-full w-10 h-10 object-cover" src="${video.authors[0].profile_picture}"/> 
          </div>
          <div>
           <h2 class="font-bold">${video.title}</h2>
           <div class="flex gap-2">
              <p class="text-gray-400">${video.authors[0].profile_name}</p>
              ${video.authors[0].verified === true ? '<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>' : ""
            }
           </div>
           <div>
              <button onclick="showDetails('${video.video_id}')" class="btn my-2 text-white bg-red-600">Details</button>
           </div>
          </div>
        </div>
    `
        videosContainer.appendChild(divv)
    }
}
loadCategories()
loadVideos()