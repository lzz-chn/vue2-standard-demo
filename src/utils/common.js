import { nanoid } from 'nanoid'
import day from 'dayjs'
import { klona } from 'klona'

/**
 * @description 计算时长
 * @param {string} timestamp 时间戳
 * @returns D天 H时 M分 S秒
 */
export const calculationTime = (timestamp) => {
  if (timestamp) {
    let days = timestamp / 1000 / 60 / 60 / 24
    let daysRound = Math.floor(days)
    let hours = timestamp / 1000 / 60 / 60 - 24 * daysRound
    let hoursRound = Math.floor(hours)
    let minutes = timestamp / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound
    let minutesRound = Math.floor(minutes)
    let seconds =
      timestamp / 1000 - 24 * 60 * 60 * daysRound - 60 * 60 * hoursRound - 60 * minutesRound
    let secondsRound = Math.floor(seconds)

    return `${daysRound === 0 ? '' : daysRound + '天 '}
            ${hoursRound === 0 ? '' : hoursRound + '时'}
            ${minutesRound === 0 ? '' : minutesRound + '分'}
            ${secondsRound === 0 ? '-' : secondsRound + '秒'}`
  } else {
    return '-'
  }
}

/**
 * @description 判断是否为ios系统
 * @returns true or false
 */
export const isIOS = () => {
  let u = navigator.userAgent
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  return isIOS ? true : false
}

/**
 * @description 识别网络环境
 * @returns 接口地址
 */
export const recognitionEnv = () => {
  let ip = window.location.hostname
  let isInterNet = false

  isInterNet = ip.match(/^10\./) // 10.0.0.0--10.255.255.255
  isInterNet = ip.match(/^172\.1[6-9]|2[0-9]|31\./) // 172.16.0.0--172.31.255.255
  isInterNet = ip.match(/^192\.168\./) // 192.168.0.0--192.168.255.255

  return isInterNet ? 'intraNet' : 'extraNet'
}

/**
 * @description 生成唯一值
 * @param {number} 唯一值大小
 * @returns 唯一值
 */
export const uuid = (size) => nanoid(size)

/**
 * @description 获取图片base64文件
 * @param {HTMLElement} img
 * @returns base64格式图片
 */
export const getBase64Image = (img) => {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  let dataURL = canvas.toDataURL('image/' + ext)
  return dataURL
}

/**
 * @description 获取图片file格式文件
 * @param {string} dataUrl
 * @param {string} filename
 * @returns file格式图片
 */
export const getFileImage = (dataUrl, filename) => {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

/**
 * @description 递归树结构子数据
 * @param {*} pk
 * @param {*} data
 * @returns
 */
export const getTreeChildren = (pk, data) => {
  let children = []

  for (const item of data) {
    if (item.parentFk === pk) {
      children.push(item)
    }
  }
  for (const child of children) {
    let childCopy = getTreeChildren(child.pk, data)
    if (childCopy.length > 0) {
      child.children = childCopy
    }
  }

  return children
}

/**
 * @description 处理树结构数据
 * @param {*} data
 * @returns
 */
export const processTreeData = (data) => {
  let result = []

  for (const item of data) {
    if (!item.parentFk) {
      item.children = getTreeChildren(item.pk, data)
      result.push(item)
    }
  }

  return result
}

/**
 * @description 递归子菜单父级数据
 * @param {*} parentFk
 * @param {*} data
 * @returns
 */
export const getMenuParent = (parentFk, data) => {
  let parent = []

  for (const item of data) {
    if (item.pk === parentFk) {
      parent.push(item)
    }
  }
  for (const item of parent) {
    let parentCopy = getMenuParent(item.parentFk, data)
    if (parentCopy.length > 0) {
      parent = [...parent, ...parentCopy]
    }
  }

  return parent
}

/**
 * @description 处理时间和日期的工具库
 * @param {*} date
 * @returns
 */
export const dayjs = (date) => day(date)

/**
 * @description 深度拷贝数据，安全处理Array，Date，Map，Object，RegExp，Set，TypedArray等类型
 * @param {*} input
 * @returns
 */
export const klonaClone = (input) => klona(input)
