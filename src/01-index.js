import sayHello from './assets/js/hello'
sayHello()

// 资源模块类型相关测试
import imgsrc from './assets/img/dp.png'
const oImg = document.createElement('img')
oImg.style.cssText = 'width:80px;height:80px'
oImg.src = imgsrc
document.body.append(oImg)

import imgsrc2 from './assets/img/mp.svg'
const oImg2 = document.createElement('img')
oImg2.style.cssText = 'width:80px;height:80px'
oImg2.src = imgsrc2
document.body.append(oImg2)

import txt from './assets/other/test.txt'
const oDiv = document.createElement('div')
oDiv.style.cssText = 'height:100px;width:100px;background-color:aliceblue'
oDiv.textContent = txt
oDiv.classList.add('add-bg')
document.body.append(oDiv)

import imgsrc3 from './assets/img/bg.jpg'
const oImg3 = document.createElement('img')
oImg3.style.cssText = 'height:80px'
oImg3.src = imgsrc3
document.body.append(oImg3)

// 打包 css 相关测试
import './css/main.css'
import './css/main.scss'

// 打包字体测试
const oSpan = document.createElement('span')
oSpan.innerHTML = '&#xe644;'
oSpan.classList.add('icon')
document.body.append(oSpan)

// 加载 csv|tsv|xml 格式文件
import data1 from './assets/other/data.csv'
import data2 from './assets/other/data.xml'
console.log(data1)
console.log(data2)

// 加载 toml、yaml、json5 格式文件
import toml from './assets/other/data.toml'
import yaml from './assets/other/data.yaml'
import json5 from './assets/other/data.json5'

console.log(toml)
console.log(yaml)
console.log(json5)