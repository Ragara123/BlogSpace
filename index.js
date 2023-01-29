const titleInput = document.getElementById('title')
const bodyInput = document.getElementById('body')
const postsDiv = document.getElementById('blogs')
const form = document.getElementById('form')
let postsArray = []
const renderPostElements = () => {
    let html = ''
    for(let post of postsArray){
        html += `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <hr>
        `
    }
    postsDiv.innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(response => response.json())
    .then(data => {
        const posts = data.slice(0,5)
        for(let post of posts){
            postsArray.push(post)
            renderPostElements()
        }
    })

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const post = {
            title : titleInput.value,
            body : bodyInput.value
        }

        const options = {
            method : "POST",
            body : JSON.stringify(post),
            headers : {
                "Content-Type" : "application/json"
            }
        }
        fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
            .then(response => response.json())
            .then(data => {
                postsArray.unshift(data)
                form.reset()
                renderPostElements()
            })
    }

    form.addEventListener('submit', handleFormSubmit)

