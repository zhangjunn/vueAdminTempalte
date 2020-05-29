import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}` // 例如点击tree看到相应的title（Vue Admin Template）拼接
  }
  return `${title}`
}
