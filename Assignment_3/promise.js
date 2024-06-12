const userLeft = false;
const userWatchingCatMeme = true;

// callback function
function watchTutorialCallback(callback, errorCallback) {
    if (userLeft) {
        errorCallback({
        name: 'User Left',
        message: ':('
        })
    } else if (userWatchingCatMeme) {
        errorCallback({
        name: 'User Watching Cat Meme',
        message: 'WebDevSimplified < Cat'
        })
    } else {
        callback('Thumbs up and Subscribe')
    }
}

watchTutorialCallback((message) => {
    console.log('Success: ' + message)
}, (error) => {
    console.log(error.name + ' ' + error.message)
})


// promise function 
function watchTutorialPromise() {
    return new Promise((resolve, reject) => {
        if (userLeft) {
            reject({
            name: 'User Left',
            message: ':('
            })
        } else if (userWatchingCatMeme) {
            reject({
            name: 'User Watching Cat Meme',
            message: 'WebDevSimplified < Cat'
            })
        } else {
            resolve('Thumbs up and Subscribe')
        }
    })
}

watchTutorialPromise().then((message) => {
    console.log('Success: ' + message)
}).catch((error) => {
    console.log(error.name + ' ' + error.message)
})



// promise.all function
const recordVideoOne = new Promise((resolve, reject) => {
    resolve('Video 1 Recorded')
})

const recordVideoTwo = new Promise((resolve, reject) => {
    resolve('Video 2 Recorded')
})

const recordVideoThree = new Promise((resolve, reject) => {
    resolve('Video 3 Recorded')
})

Promise.all([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((messages) => {
    console.log(messages)
}) 

// if we use race instead of all, it will return the first promise that is resolved

