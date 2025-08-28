import moment from 'moment'

export const getTextByDate = (timestamps:string) => {
    const date = moment.utc('2025-03-22T10:00:00.000Z')

    const formatted = `${date.date()} ${customMonths[date.month()]}, ${date.year()}`
    
    return formatted;
} 

const customMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Auc', 'Sep', 'Ouc', 'Nov', 'Dec']