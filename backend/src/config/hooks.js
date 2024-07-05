import dotenv from 'dotenv'
dotenv.config()

export const validateEmail = (input) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(input.match(validRegex)){
        return true;
    }else{
        return false;
    }
}

export const validateNumberPhone = (input) => {

    if(input.length === 12){
        var regex = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{5})$/;

        return regex.test(input);
    }else if(input.length === 11){
        var regex = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/;

        return regex.test(input);
    }else if(input.length === 10){
        var regex = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{3})$/;

        return regex.test(input);
    }else{
        var regex = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/;

        return regex.test(input);
    }
}

export const validateCharacter = (input) => {
    if (typeof input !== "string" || !/^[a-zA-Z]*$/g.test(input)) {
        return false; 
    }else{
        return true;
    }
}