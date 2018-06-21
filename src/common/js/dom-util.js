export function addClass (element, className) {
    if (!new RegExp('(^|\\s)' + className + '(\\s|$)').test(element.className)) element.className += ' ' + className
}
