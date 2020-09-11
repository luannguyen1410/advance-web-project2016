app.factory('userFactory', function ($http) {
    return {
        login: function (userName, password) {
            return $http.post(serviceUrls.userLoginUrl + "?username=" + userName + "&password=" + password);
        }
    };
});

// Contact Factory
app.factory('contactFactory', function ($http) {
    return {
        contact: function (name, email, subject, message, createdDate, status) {
            var param = {
                fee_cusName: name,
                fee_email: email,
                fee_subject: subject,
                fee_message: message,
                fee_createdDate: createdDate,
                status: status
            };
            return $http.post(serviceUrls.contactUrl, param);
        }
    };
});

// Sign up Factory
app.factory('signupFactory', function ($http) {
    return {
        signup: function (firstName, lastName, username, pwd, gender, dob, email, phone, address, status, image, active) {
            var param = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: pwd,
                gender: gender,
                dob: dob,
                email: email,
                phone: phone,
                address: address,
                status: status,
                image: image,
                isActive: active
            };
            return $http.post(serviceUrls.signupUrl, param);
        }
    };
});

app.factory('genreFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.genreListUrl);
        }
    };
});

app.factory('publisherFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.publisherListUrl);
        },
        count: function (name) {
            return $http.get(serviceUrls.numberNewBookByPubUrl + "/" +name)
        }
    };
});

app.factory('bookFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.listBookUrl);
        },
        showBook: function (id){
            return $http.get(serviceUrls.listBookByGenreIDUrl + "/" + id);
        },
        view: function (id) {
            return $http.get(serviceUrls.bookDetailByIDUrl + "/" + id);
        }
    };
});

app.factory('bookNewReleaseFactory', function ($http) {
    return {
        showBook: function (){
            return $http.get(serviceUrls.listNewReleaseBooks);
        },
        view: function (id) {
            return $http.get(serviceUrls.bookDetailByIDUrl + "/" + id);
        }
    };
});

app.factory('bookBestSellerFactory', function ($http) {
    return {
        list: function (){
            return $http.get(serviceUrls.listBestSellerBooks);
        },
        view: function (id) {
            return $http.get(serviceUrls.bookDetailByIDUrl + "/" + id);
        }
    };
});

app.factory('checkoutFactory', function ($http) {
    return {
        checkout: function (order) {
            var params = {
                shippingDate: order.shippingDate,
                shippingTime: order.shippingTime,
                shippingAddress: order.shippingAddress,
                phone: order.phone,
                status: order.status,
                cust_id: order.cust_id,
                orderDetail: order.orderDetail
            };
            return $http.post(serviceUrls.checkoutUrl, params);
        }
    };
});

//order Factory
app.factory('orderFactory', function ($http) {
    return {
        list: function (id) {
            return $http.get(serviceUrls.orderListUrl+"/"+id);
        }
    };
});
//order details Factory
app.factory('orderDetailFactory', function ($http) {
    return {
        list: function (id) {
            return $http.get(serviceUrls.orderDetailUrl+"/"+id);
        }
    };
});

//Api Urls
var serviceUrls = {};
serviceUrls.baseUrl = 'http://localhost:8282';
//create
serviceUrls.contactUrl = serviceUrls.baseUrl + '/VietBook/feedback/create';
serviceUrls.signupUrl = serviceUrls.baseUrl + '/VietBook/customer/create';
serviceUrls.checkoutUrl = serviceUrls.baseUrl + '/VietBook/order/create';



//list of books
serviceUrls.listBookUrl = serviceUrls.baseUrl + '/VietBook/book/list';
serviceUrls.listBookByGenreIDUrl = serviceUrls.baseUrl + '/VietBook/book/listByGenre';
serviceUrls.listNewReleaseBooks = serviceUrls.baseUrl + '/VietBook/book/listNew';
serviceUrls.listBestSellerBooks = serviceUrls.baseUrl + '/VietBook/book/listBestSeller';
serviceUrls.bookDetailByIDUrl = serviceUrls.baseUrl + '/VietBook/book/view';

//list
serviceUrls.publisherListUrl = serviceUrls.baseUrl + '/VietBook/publisher/list';
serviceUrls.genreListUrl = serviceUrls.baseUrl + '/VietBook/genre/list';
serviceUrls.orderListUrl = serviceUrls.baseUrl + '/VietBook/order/listByCustomerID';

serviceUrls.orderDetailUrl = serviceUrls.baseUrl + '/VietBook/orderdetail/view';

//Login
serviceUrls.userLoginUrl = serviceUrls.baseUrl + '/VietBook/customer/login';