var app = angular.module("VietBookApp", ["ngRoute", "ngCookies"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/home.html",
            controller: "homeController"
        })
        .when("/login", {
            templateUrl: "templates/login.html",
            controller: "loginController"
        })
        .when("/cart", {
            templateUrl: "templates/cart.html",
            controller: "cartController"
        })
        .when("/contact", {
            templateUrl: "templates/contact-us.html",
            controller: "contactController"
        })
        .when("/shop", {
            templateUrl: "templates/shop.html",
            controller: "shopController"
        })

        .when("/checkout", {
            templateUrl: "templates/checkout.html",
            controller: "checkoutController"
        })
        .when("/book/new", {
            templateUrl: "templates/new_release.html",
            controller: "newReleaseController"
        })
        .when("/account", {
            templateUrl: "templates/account.html",
            controller: "accountController"
        })
        .when("/sign/up", {
            templateUrl: "templates/sign_up.html",
            controller: "signUpController"
        })
        .when("/forgotPass", {
            templateUrl: "templates/forgotPass.html",
            controller: "forgotPassController"
        })        
        .when("/book/:id", {
            templateUrl: "templates/book.html",
            controller: "bookController"
        })
        .when("/book/detail/:id", {
            templateUrl: "templates/book_detail.html",
            controller: "bookDetailController"
        })
        .when("/order/:id", {
            templateUrl: "templates/order.html",
            controller: "orderController"
        })
        .otherwise({redirectTo: '/'});
});