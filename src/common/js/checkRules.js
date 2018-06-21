
export function checkName (name) {
    if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name)) {
        return '请检查姓名是否输入正确'
    }
}

