app.run(function($rootScope, $window,genreFactory, publisherFactory, bookBestSellerFactory, bookFactory) {
    genreFactory.list().then(function (response){
        if(response.status == 200)
            $rootScope.genreList = response.data;
    });

    publisherFactory.list().then(function (response){
        if(response.status == 200)
            $rootScope.publisherList = response.data;
    });

    bookBestSellerFactory.list().then(function (response) {
        if(response.status == 200)
            $rootScope.bookBestSellerList = response.data;
    })
    bookFactory.list().then(function (response) {
        if(response.status == 200)
            $rootScope.bookAllList = response.data;
    });
    $rootScope.logout = function () {
        $cookieStore.remove("customer");
        $window.location.reload();
    }
});

app.controller("bookController", function ($scope,$routeParams, $location, shoppingCart, bookFactory) {
    bookFactory.showBook($routeParams.id).then(function (response) {
        if (response.status == 200) {
            var data = response.data;
            $scope.bookList = data;
        }
    });
    $scope.show = function (id) {
        $location.path('/book/detail/' + id);
    };

    $scope.addToCart = function(id, name, price, image){
        $scope.shoppingCart = shoppingCart.add(id, name, price, image);
    };

});
app.controller("newReleaseController", function ($scope, $location, shoppingCart, bookNewReleaseFactory) {

    bookNewReleaseFactory.showBook().then(function (response) {
        if (response.status == 200) {
            var data = response.data;
            $scope.newBookList = data;
        }
    });
    $scope.show = function (id) {
        $location.path('/book/detail/' + id);
    };

    $scope.addToCart = function(id, name, price, image){
        $scope.shoppingCart = shoppingCart.add(id, name, price, image);
    };
});


app.controller("homeController", function ($scope) {});

app.controller("loginController", function ($scope, $location, $cookieStore, userFactory) {
    $scope.login = function () {
        userFactory.login($scope.username, $scope.password).then(function (response) {
            if (response.status == 200) {
                var data = response.data;
                if (data.isActive == true) {
                    $cookieStore.put("customer", data);
                    $location.path("home");
                }
                else
                    $scope.errorMessage = "Wrong username or password";
            }
        });
    };
});

app.controller("cartController", function ($scope, shoppingCart) {
    $scope.shoppingCart = shoppingCart.list();
    $scope.remove = function(id) {
        $scope.shoppingCart = shoppingCart.delete(id);
    };
});

app.controller("checkoutController", function ($scope, shoppingCart, checkoutFactory, $cookieStore) {
    $scope.shoppingCart = shoppingCart.list();

    var total = 0;
    var cart = shoppingCart.list();
    for(var i = 0; i < cart.length; i++)
    {
        total += cart[i].quantity * cart[i].price;
    }
    if(total == 0)
        $scope.totalMoney = "There are nothing in you cart";
    else
        $scope.totalMoney = "$"+total;
    $scope.checkout = function () {
        var order = {};

        order.shippingDate = $scope.shippingDate;
        order.shippingTime = $scope.shippingTime;
        order.shippingAddress = $scope.shippingAddress;
        order.phone = $scope.phone;
        order.status = 0;
        order.cust_id = $cookieStore.get("customer").id;		
        order.orderDetail = [];

        for(var i = 0; i < cart.length; i++){
            var detail = {};
            detail.boo_id = cart[i].id;			
            detail.price = cart[i].price;
            detail.quantity = cart[i].quantity;
            order.orderDetail.push(detail);
        }
        checkoutFactory.checkout(order).then(function (response) {
            if(response.status == 200){
                $scope.message = "You just ordered successfully";
                $("#checkoutForm").trigger('reset');
                shoppingCart.remove();
            }
        })
    }
});



app.controller("accountController", function ($scope, $rootScope, $cookieStore) {
    $rootScope.cust_id = $cookieStore.get("customer").id;
    $rootScope.custFirstName = $cookieStore.get("customer").firstName;
    $rootScope.custLastName = $cookieStore.get("customer").lastName;
    $rootScope.custUsername = $cookieStore.get("customer").username;
    $rootScope.custEmail = $cookieStore.get("customer").email;
    $rootScope.custPhone = $cookieStore.get("customer").phone;
    $rootScope.custAddress = $cookieStore.get("customer").address;
    var imageCustomer = $cookieStore.get("customer").image;
    if (imageCustomer == null)
        $rootScope.custImage = "product02.jpg";
    else
        $rootScope.custImage = imageCustomer;

});

app.controller("signUpController", function ($scope, $location, signupFactory) {
    $scope.signup = function () {
        var image = "";
        var status = 0;
        var active = true;
        signupFactory.signup($scope.cusFirstName, $scope.cusLastName, $scope.cusUserName, $scope.cusPass, $scope.gender,
            $scope.cusDob, $scope.cusEmail, $scope.cusPhone, $scope.cusAddress, status, image, active).then(function (response) {
            if (response.status == 200){
                $scope.mgs = "You just sign up sucessfully"
                $("#signUpForm").trigger('reset');
            }

        });
    };
});

app.controller("contactController", function ($scope, $location, contactFactory) {
    $scope.contact = function () {
        var createdDate = new Date();
        var status = 0;
        contactFactory.contact($scope.cusName, $scope.email, $scope.subject, $scope.message, createdDate ,status).then(function (response) {
            if (response.status == 200){
                $scope.mgs = "You have sent the message to us successfully"
                $("#main-contact-form").trigger('reset');
            }
        });
    };
});

app.controller("forgotPassController", function ($scope) {
});

app.controller("bookDetailController", function ($scope, $routeParams, bookFactory, bookBestSellerFactory, shoppingCart) {
    bookFactory.view($routeParams.id).then(function (response) {
        if (response.status == 200) {
            var data = response.data;
            $scope.book = data;
        }
    });

    bookBestSellerFactory.view($routeParams.id).then(function (response) {
        if (response.status == 200) {
            var data = response.data;
            $scope.book = data;
        }
    });

    $scope.addToCart = function(id, name, price, image){
        $scope.shoppingCart = shoppingCart.add(id, name, price, image);
    };
});


app.controller("orderController", function ($scope, $routeParams, orderDetailFactory, orderFactory) {
    orderFactory.list($routeParams.id).then(function (response) {
        if (response.status == 200) {
            $scope.orderList = response.data;
        }
    });

    $scope.view = function (id) {
        orderDetailFactory.list(id).then(function (response) {
            if (response.status == 200)
                $scope.orderDetailList = response.data;
        });

    };

    $scope.close = function () {
        jQuery("#myModal2").modal('hide');
    }
});

app.controller("shopController", function ($scope) {
});




