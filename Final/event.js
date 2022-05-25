//Some variable initialization 
let full_name = document.querySelector('#name');
let lucky_number = document.querySelector('#child');
let birthday = document.querySelector('#birthday');
let order_user = document.querySelector('#order');
let rate = document.querySelector('#rate');
let reset = document.querySelector('[type=reset]');
let notification = document.querySelector('#notification')
notification.addEventListener('click', notificationUser)


//After successful submition this function runs a success message
function notificationUser(e) {
    e.target.classList.add('remove_notification')
    if (e.target.classList.contains('add_notification')) {
        e.target.classList.remove('add_notification');
    }
}

//This function gets called when user does not fill the input correctly
function alertBoarder() {
    this.classList.remove('alert_border');
    switch (this.name) {
        case 'fullname': ;
            full_name.value = '';
            full_name.placeholder = '';
            break;

        case 'lucky_number': ;
            lucky_number.value = '';
            lucky_number.placeholder = '';
            break;

        case 'birthday': ;
            birthday.value = '';
            break;

        case 'product':
            rate.value = '';
            break;

    };

};


//When inputs are filled after poping alert to the user, alerts are deleted via this function.
function removeAlert() {
    if (this.value === '') {
        this.classList.add('alert_border');
        switch (this.name) {
            case 'fullname': ;
                full_name.value = 'Please enter your Full Name';
                break;

            case 'lucky_number': ;
                lucky_number.placeholder = 'Write Down your Lucky number Between 1 - 10';
                break;
            case 'birthday': ;
                birthday.value = 'Input your birthday please';
                break;

            case 'product': ;
                rate.value = 'Give Us a Rate !';
                break;

        };


    };
};



//These functions check if user has filled all the inputs completely.
//If not they pop up allert, and if they are filled they remove the previous alert.
full_name.addEventListener('focus', alertBoarder);
full_name.addEventListener('blur', removeAlert);

lucky_number.addEventListener('focus', alertBoarder);
lucky_number.addEventListener('blur', removeAlert);

birthday.addEventListener('focus', alertBoarder);
birthday.addEventListener('blur', removeAlert);

rate.addEventListener('focus', alertBoarder);
rate.addEventListener('blur', removeAlert);



//This function removes all the values that are typed in inputs and refreshes every thing
//It also deletes the cart
reset.addEventListener('click', () => {
    let allInputs = [...document.querySelectorAll('input')];
    allInputs.forEach(item => {
        item.classList.remove('alert_border');
        item.placeholder = '';
    });
    document.querySelector('#order_selection').classList.remove('alert_border_order');
    document.querySelector('#sum').placeholder = '$0';
    localStorage.removeItem('product');
    document.querySelector('#result').style.display = 'none';
    document.querySelector('#user_info').style.display = 'none';
});