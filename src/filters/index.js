import moment from "moment";

const filterDatetime = (date, format) => {
    return moment(date).format(format);
}

const filterUtcDatetime = (date, format) => {
  return moment(date).utc().format(format);
}

const formatVND = (data) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data)
}

const formatDate = (date) => {
    if (!date || date === null) {
        return ''
    } else {
        return moment(date).format('DD/MM/YYYY');
    }
}

export default { filterDatetime, filterUtcDatetime, formatVND, formatDate};
