const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []
let isInitialLoad = true

//Unsplash API
let initialCount = 5
const apiKey = 'eL2TcRZHLSGRarvDUYPm1Zh6eWxy5E0o6F2dMc0-0n8'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`

// NEW Block ****
function updateAPIURLWithNewCount (picCount) {
   apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`
}

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded ++
    if (imagesLoaded === totalImages){
        ready = true
        loader.hidden = true
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links & Photos, and toDOM 
function displayPhotos(){
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log('total images', totalImages)

    //Run function for each object in photosArray
    photosArray.forEach((photo) =>{
        //Create <a> to link to Unsplash
        const item = document.createElement("a");
        // item.setAttribute("href", photo.links.html)
        // item.setAttribute("target", "_blank")
        // Create <img> for photo
        setAttributes(item, {
            href:photo.links.html,
            target: '_blank'
        })
        const img = document.createElement("img")
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item)
        
    })
}

// Get photo from Unspla
async function getPhotos(){
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
        if (isInitialLoad){
            updateAPIURLWithNewCount(30)
            isInitialLoad = false
        }
    } catch (error){
        // Catch Error Here
        console.log("fail")
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos()
    }
})


getPhotos()