//Some of initial variables
let data_json = './data.json';
let menu = document.querySelector('#option');
let selected_items_information = [];
let item_checker = [];
let sum = 0;
let search = false;


//Array of selected information
let user_information;

//Total price variables
document.querySelector('#sum').value = '$0';
let totalAmount = 0;

//Form variables
let form = document.forms.pastry;
form.fullname.value = '';
form.lucky_number.value = '';
form.birthday.value = '';
form.product.value = '';

let validate_radio_btn = document.querySelectorAll('[type=radio]');
validate_radio_btn.forEach(item => item.checked = false);
let check_box = document.querySelector('[type=checkbox]');
check_box.checked = false;

//Array of selected items in html form
let products = [];


//Tags that show user information and selected items in the cart
document.querySelector('#result').style.display = 'none';
document.querySelector('#user_info').style.display = 'none';



//This class get all the information from form inputs and 
//assign them to the veryfication function
class ItemCreator {
    constructor(data) {
        this.name = data.a;
        this.lucky_number = data.b;
        this.birthday = data.c;
        this.vip = data.d;
        this.order = data.e;
        this.product = data.f;
    };

    //This function transfer all data from form inputs and prints thm to customer cart as information of user
    veryfication() {
        let result = `<div>
                        <span><strong>Full Name: </strong></span>
                        <span>${this.name}</span>
                    </div>
                    <div>
                        <span><strong>Lucky Number: </strong></span>
                        <span>${this.lucky_number}</span>
                    </div>
                    <div>
                        <span><strong>Your Birthday: </strong></span>
                        <span>${this.birthday}</span>
                    </div>
                    <div>
                        <span><strong>VIP Membership: </strong></span>
                        <span>${this.vip}</span>
                    </div>
                    <div>
                        <span><strong>Your Order: </strong></span>
                        <span>${this.order}</span>
                    </div>
                    <div>
                        <span><strong>Your Rate: </strong></span>
                        <span>${this.product}</span>
                        </div>`
        return result;
    };

};

//Get data from JSON object and generate all the items in OUR SHOP section
totalItem = (data) => {
    let result = data['info'].map(product => {
        return `<li id="product">
        <img id="pic" src=${product.image} />
        <span>${product.price}</span>
        <span>${product.name}</span>
        </li>`
    });
    menu.innerHTML = result.join('');
    let options = document.querySelectorAll('#option li');
    options.forEach(item => item.addEventListener('click', getOption));
};



//This function is executed when items are clicked and takes image, name and price of the selected items,
//and pushes them into an array for later usage in our cart
function getOption(e) {
    let price = e.currentTarget.children[1].textContent;
    price = price.split('$');
    let basicPrice = price.splice(price.indexOf(0), 1);
    let product_price = parseInt(basicPrice);
    let product_name = e.currentTarget.children[2].textContent;
    let image = e.currentTarget.children[0].src;
    let targetProduct = image.indexOf('image');
    let product_image = image.slice(targetProduct);
    let item = { product_price, product_image, product_name, basicPrice, count: 1 };
    if (selected_items_information == null) {
        selected_items_information.push(item);
    } else {
        let finder = selected_items_information.map(product => {
            return product.product_image;
        });
        if (finder.includes(product_image)) {
            search = true;
        } else {
            search = false;
            selected_items_information.push(item);
        };
    };
    card();
};

//This dunction checks if the item is already in the cart, it pops up an error to the user

//This function the total amount of price from selected items in the cart
calculator = () => {
    selected_items_information? sum = selected_items_information.reduce((total, product) => {
        return total += product.product_price;
    }, 0) : price = [];
    totalAmount = selected_items_information ? `$${sum}` : '$0';
    document.querySelector('#sum').value = totalAmount;
};

//This function targets items that we select from the whole items 
//in our confictionery and adds them to the cart
card = () => {
    if (!products) {
        document.querySelector('#result').textContent = 'No item';
    };
    selected_items_information? products = selected_items_information.map(product => {
        return `<li id="new">
        <img src=${product.product_image} />
        <div>
        <span>${product.product_name}</span>
        <span>Unit Price</span>
        <span>$${product.basicPrice}</span>
        <span id="plus">+</span>
        <span id="result_sum">${product.count}</span>
        <span id="minus">-</span>
        <span>Total</span>
        <span id="total">$<span>${product.product_price}</span></span>
        </div>
        </li>`
    }): products = [];
    document.querySelector('#result').innerHTML = products.join('');
    calculator();
    itemCards();
};

// Increment and Decremnt price and number of items in our cart are done by this function
function itemCards() {
    if (selected_items_information !== null) {
        let plus = document.querySelectorAll('#plus');
        plus.forEach(item => {
            item.addEventListener('click', (e) => {
                let parent = e.target.parentElement.previousElementSibling.src;
                let targetProduct = parent.indexOf('images');
                let product_image = parent.slice(targetProduct);
                let data = selected_items_information.map(product => {
                    if (product_image == product.product_image) {
                        product.product_price
                        product.count += 1;
                        e.target.parentElement.children[4].textContent = product.count;
                        e.target.parentElement.children[7].textContent = product.basicPrice * product.count;
                        product.product_price =  product.basicPrice * product.count;
                        return product;
                    } else {
                        return product;
                    };
                });
                calculator();
            });
        });

        let minus = document.querySelectorAll('#minus');
        minus.forEach(item => {
            item.addEventListener('click', (e) => {
                let parent = e.target.parentElement.previousElementSibling.src;
                let targetProduct = parent.indexOf('image');
                let product_image = parent.slice(targetProduct);
                let data = selected_items_information.map(product => {
                    if (product_image == product.product_image) {
                        if (product.count <= 1) {
                            product.count = 1;
                        } else {
                            product.count -= 1;
                        };
                        e.target.parentElement.children[4].textContent = product.count;
                        e.target.parentElement.children[7].textContent = product.basicPrice * product.count;
                        product.product_price = product.basicPrice * product.count;
                        return product;
                    } else {
                        return product;
                    };
                });
                calculator();
            });
        });
    };
};

//Form validation function
validateProfile = (e) => {
    e.preventDefault();
    document.querySelector('#order_selection').classList.remove('alert_border_order');
    let flag = true;
    if (products.length == 0) {
        document.querySelector('#result').textContent = 'No item';
    };
    if (form.fullname.value == "") {
        flag = false;
        form.fullname.value = 'Please enter your Full Name!';
        form.fullname.classList.add('alert_border');
    } else if (form.fullname.value.length > 10 || form.fullname.value.length < 3) {
        flag = false;
        form.fullname.value = 'Your Name Must Be Not Gratter than 10 and Less than 3';
        form.fullname.classList.add('alert_border');
    };


    if (form.lucky_number.value == "") {
        flag = false;
        form.lucky_number.placeholder = 'Write Down your Lucky number Between 1 - 10';
        form.lucky_number.classList.add('alert_border');

    };

    if (form.lucky_number.value) {
        if (10 < form.lucky_number.value || form.lucky_number.value <= 0) {
            flag = false;
            form.lucky_number.value = '';
            form.lucky_number.placeholder = 'Between 1 - 10 Only !';
            form.lucky_number.classList.add('alert_border');
        };
    };

    if (form.birthday.value == "") {
        flag = false;
        form.birthday.classList.add('alert_border');
    } else if (form.birthday.value < "2010-01-01") {
        alert('Your Birthday Must Be After 2010-01-01 and You dont get Discount!');
    };

    if (!(validate_radio_btn[0].checked || validate_radio_btn[1].checked)) {
        document.querySelector('#order_selection').classList.add('alert_border_order');
        flag = false;

    };
    if (form.product.value == "") {
        flag = false;
        form.product.value = 'Give Us a Rate!';
        form.product.classList.add('alert_border');
    };

    //If all the inputes are correctly full, variable flag gets true and all input values
    //are stored in user_information object and passed to ItemCreator class.
    if (flag) {
        user_information = {
            a: form.fullname.value,
            b: form.lucky_number.value,
            c: form.birthday.value,
            d: check_box.checked ? 'YES' : 'NO',
            e: form.order.value,
            f: form.product.value
        };
        //If all inputs are filled correctly, ItemCreator class is called and values are passed to make 
        //user information based on what user has typed.
        let publish = new ItemCreator(user_information);
        document.querySelector('#user_info').innerHTML = publish.veryfication();
        document.querySelector('#result').style.display = 'block';
        document.querySelector('#user_info').style.display = 'block';
        document.querySelector('#sum').value = totalAmount;
        let after_submission = [...document.querySelectorAll('input')];
        after_submission.forEach(item => {
            item.classList.remove('alert_border');
            item.placeholder = '';
            item.value = '';
        });
        validate_radio_btn.forEach(item => item.checked = false);
        check_box.checked = false;
        alertUser.classList.add('add_notification');
        alertUser.classList.remove('remove');

    } else {
        user_information = ''
        document.querySelector('#user_info').innerHTML = '';
    };
};


//Gtting JSON information with AJAX from JSON file
//Assign the JSON to totalItem function
window.addEventListener('DOMContentLoaded', () => {
    let http = new XMLHttpRequest();
    http.open('GET', data_json);    
    http.responseType = 'text';
    http.send();
    http.onload = function () {
        if (this.readyState == 4 && 200 <= this.status <= 400) {
            totalItem(JSON.parse(this.responseText))
        } else {
            console.log('There is error');
        };
    };
});

//Form validation via validateProfile function
form.addEventListener('submit', validateProfile);


