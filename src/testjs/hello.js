function getString() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello babel')
        }, 1000)
    })
}

async function hello() {
    let str = await getString()
    console.log('hello func: ' + str)
}

export default hello