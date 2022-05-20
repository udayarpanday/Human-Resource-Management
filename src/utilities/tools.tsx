import moment from 'moment';

export const formatDate = (dateTime: Date, format: string = "MM/DD/YYYY") => {
    if (dateTime) {
        return moment(dateTime).format(format);
    }
    return "";
}

export const formatTextFieldDate = (dateTime: Date, format: string = "MM/DD/YYYY") => {
    if (dateTime) {
        return moment(dateTime).format(format);
    }
    return "";
}