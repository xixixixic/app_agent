export function formatBankNum (BankNo, dom) {
    if (BankNo === '') return
    let account = String(BankNo)
    account = account.substring(0, 22) /* 帐号的总数, 包括空格在内 */
    if (account.match('.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}') === null) {
        /* 对照格式 */
        if (account.match('.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|' + '.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|' +
        '.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|' + '.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}') === null) {
            let accountNumeric = ''
            let accountChar = ''
            let i
            for (i = 0; i < account.length; i++) {
                accountChar = account.substr(i, 1)
                if (!isNaN(accountChar) && (accountChar !== ' ')) {
                    accountNumeric = accountNumeric + accountChar
                }
            }
            account = ''
            for (i = 0; i < accountNumeric.length; i++) {   /* 可将以下空格改为-,效果也不错 */
                if (i === 4) account = account + ' '  /* 帐号第四位数后加空格 */
                if (i === 8) account = account + ' '  /* 帐号第八位数后加空格 */
                if (i === 12) account = account + ' ' /* 帐号第十二位后数后加空格 */
                account = account + accountNumeric.substr(i, 1)
            }
        }
    } else {
        account = ' ' + account.substring(1, 5) + ' ' + account.substring(6, 10) + ' ' + account.substring(14, 18) + '-' + account.substring(18, 25)
    }
    if (account !== BankNo) dom = account
}