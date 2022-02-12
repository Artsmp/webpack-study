import hello from "./testjs/hello"

hello()

// import _ from "lodash"

// console.log(_.join(['index', 'module', 'loaded!'], '=='))

import './async-module'

const btn = document.createElement('button')
btn.textContent = '点击执行加法运算'
btn.addEventListener('click', () => {
    import(/* webpackChunkName: 'math', webpackPrefetch: true */'./testjs/math').then(({ add }) => {
        console.log(add(1, 4))
    })
})

document.body.append(btn)

const btn2 = document.createElement('button')
btn2.textContent = '点击执行打印'
btn2.addEventListener('click', () => {
    import(/* webpackChunkName: 'print', webpackPrefetch: true */'./testjs/print').then(({ print }) => {
        console.log(print('webpackPreload'))
    })
})

document.body.append(btn2)