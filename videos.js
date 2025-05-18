//1- fetch, load and Show categories in html
//create loadCategories
const loadCategories = async () => {
    const fetched = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await fetched.json()
    const display = displayCategories(data.categories)
}
//create displayCategories
const displayCategories = (data) => {
    const buttonContainer=document.getElementById('btn-container')
    for(const item of data){
        const btn=document.createElement('button')
        btn.classList='btn'
        btn.innerText=item.category
        buttonContainer.appendChild(btn)
    }
}
loadCategories()