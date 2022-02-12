function getComponent() {
    return import('lodash').then(({ default: _ }) => {
        const element = document.createElement('div')
        element.innerHTML = _.join(['async', 'module', 'loaded!'], '==')
        return element
    }).catch(reason => reason)
}

getComponent().then(comp => {
    document.body.append(comp)
})