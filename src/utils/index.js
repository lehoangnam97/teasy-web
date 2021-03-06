import {HTTP_STATUS_CODES_DEFINITIONS} from "../consts/http-status-codes-consts";

export * from './time-utils';

export function disabledStyleWrapper(disabled, style = {}, overrideStyle = {}) {
    return disabled ? {
        ...style,
        pointerEvents: 'none',
        opacity: 0.4,
        ...overrideStyle
    } : style;
}

export function getHttpsResponseDefinition(statusCode) {
    switch (statusCode) {
        case (statusCode >= 100 && statusCode <= 199) :
            return HTTP_STATUS_CODES_DEFINITIONS.informationalResponses;
        case (statusCode >= 200 && statusCode <= 299) :
            return HTTP_STATUS_CODES_DEFINITIONS.successfulResponses;
        case (statusCode >= 300 && statusCode <= 399) :
            return HTTP_STATUS_CODES_DEFINITIONS.redirects;
        case (statusCode >= 400 && statusCode <= 499) :
            return HTTP_STATUS_CODES_DEFINITIONS.clientErrors;
        case (statusCode >= 500 && statusCode <= 599) :
            return HTTP_STATUS_CODES_DEFINITIONS.serverErrors;
    }
    return HTTP_STATUS_CODES_DEFINITIONS.notValidCodes;
}

export function isNullOrEmpty(value) {
    return !value || value && value.length === 0;
}

export function trimSign(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
} 
