var app = angular.module("VietBookApp", ["ngRoute", "ngCookies", "ngFileUpload"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/login.html",
            controller: "loginController"
        })
        .when("/forgottenPassword", {
            templateUrl: "templates/forgottenPass.html",
            controller: "forgotPassController"
        })
        .when("/home", {
            templateUrl: "templates/home.html",
            controller: "homeController"
        })
        .when("/profile", {
            templateUrl: "templates/profile.html",
            controller: "profileController"
        })
        .when("/change/admin/password", {
            templateUrl: "templates/changeAdminPass.html",
            controller: "changeAdminPassController"
        })
        .when("/product/list", {
            templateUrl: "templates/product_list.html",
            controller: "productListController"
        })
        .when("/type/list", {
            templateUrl: "templates/type_list.html",
            controller: "typeListController"
        })
        .when("/type/edit", {
            templateUrl: "templates/type_edit.html",
            controller: "typeEditController"
        })
        .when("/add/admin", {
            templateUrl: "templates/form-add-admin.html",
            controller: "addAdminController"
        })
        .when("/add/author", {
            templateUrl: "templates/form-add-author.html",
            controller: "addAuthorController"
        })
        .when("/add/book", {
            templateUrl: "templates/form-add-book.html",
            controller: "addBookController"
        })
        .when("/add/category", {
            templateUrl: "templates/form-add-category.html",
            controller: "addCategoryController"
        })
        .when("/add/genre", {
            templateUrl: "templates/form-add-genre.html",
            controller: "addGenreController"
        })
        .when("/add/language", {
            templateUrl: "templates/form-add-language.html",
            controller: "addLanguageController"
        })
        .when("/add/publisher", {
            templateUrl: "templates/form-add-publisher.html",
            controller: "addPublisherController"
        })
        .when("/tableList", {
            templateUrl: "templates/table.html",
            controller: "tableController"
        })
        .when("/author/list", {
            templateUrl: "templates/listAuthor.html",
            controller: "authorListController"
        })
        .when("/book/list", {
            templateUrl: "templates/listBook.html",
            controller: "bookListController"
        })
        .when("/admin/list", {
            templateUrl: "templates/listAdmin.html",
            controller: "adminListController"
        })
        .when("/category/list", {
            templateUrl: "templates/listCategory.html",
            controller: "categoryListController"
        })
        .when("/customer/list", {
            templateUrl: "templates/listCustomer.html",
            controller: "customerListController"
        })
        .when("/genre/list", {
            templateUrl: "templates/listGenre.html",
            controller: "genreListController"
        })
        .when("/order/list", {
            templateUrl: "templates/listOrder.html",
            controller: "orderListController"
        })
        .when("/publisher/list", {
            templateUrl: "templates/listPublisher.html",
            controller: "publisherListController"
        })
        .when("/language/list", {
            templateUrl: "templates/listLanguage.html",
            controller: "languageListController"
        })
        .when("/comment/list", {
            templateUrl: "templates/listComment.html",
            controller: "commentListController"
        })
        .when("/feedback/list", {
            templateUrl: "templates/listFeedback.html",
            controller: "feedbackListController"
        })
        .when("/image/list", {
            templateUrl: "templates/listImage.html",
            controller: "imageListController"
        })

        .otherwise({redirectTo: '/'});

});