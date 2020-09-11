"use stricts";

app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            jQuery('body').append('<script src="js/custom.min.js"></script>');
        }, 50);
    });
});

app.controller("loginController", function ($scope, $location, loginFactory) {
    $scope.login = function () {

        loginFactory.login($scope.userName, $scope.password).then(function (response) {
            var data = response.data;
            if (data == 1) {
                $location.path("/home");
            }
            else {
                $scope.errorMessage = "Wrong username or password";
            }
        });
    };
});


// app.controller("forgotPassController", function ($scope) {});
app.controller("homeController", function ($scope) {
});

//add admin controller
app.controller("addAdminController", function ($scope, $location, adminFactory) {
    $scope.add = function () {
        var file = $scope.file;
        // var active = true;
        // if ($scope.isActive == "0")
        //     active = false;
        var address = $scope.address;
        if ($scope.address == null)
            address = "";
        adminFactory.uploadFiles(file, $scope.firstName, $scope.lastName, $scope.username, $scope.password,
            $scope.email, address, $scope.phone, $scope.isActive).then(function (response) {
            if (response.status == 200) {
                $location.path('admin/list');
            }
        });
    };
});

// admin list controller
app.controller("adminListController", function ($scope, $window, $compile, $filter, adminFactory) {
    adminFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.adminList = response.data;
            var t = jQuery("#adminList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 25,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.adminList,
                "rowId": "adm_id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "adm_firstName"},
                    {"data": "adm_lastName"},
                    {"data": "adm_username"},
                    {"data": "adm_email"},
                    {"data": "adm_address"},
                    {"data": "adm_phone"},
                    {"data": "adm_isActive"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    $compile(document.getElementById('adminList'))($scope);
                }
            });
            t.on('order.dt search.dt', function () {
                t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });
    $scope.linkEdit = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var admin = $filter('filter')($scope.adminList, {adm_id: rowId})[0];
        $scope.admin = admin;

        if(admin.adm_isActive == true)
            jQuery('#yesActive').iCheck('check');
        else
            jQuery('#noActive').iCheck('check');
        jQuery('#yesActive').on('ifChecked', function(event){
            $scope.admin.adm_isActive = true;
        });
        jQuery('#noActive').on('ifChecked', function(event){
            $scope.admin.adm_isActive = false;
        });


        $scope.update = function () {

            alert($scope.admin.adm_isActive);
            adminFactory.update($scope.admin).then(function (response) {
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
            });
        }

    };
    $scope.close = function () {
        $window.location.reload();
    }
});


////Match the passwords jquery.
app.directive('passwordMatch', function () {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var checker = function () {
                var e1 = scope.$eval(attrs.ngModel); //get the value in password input
                var e2 = scope.$eval(attrs.passwordMatch); //get the value in confirm password input
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
                control.$setValidity("unique", n); //create form control
            });
        }
    };
});

// author list controller
app.controller("authorListController", function ($scope, $window, $compile, $filter,authorFactory) {
    authorFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.authorList = response.data;
            //jQuery
            var t = jQuery("#authorList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 50,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.authorList,
                "rowId": "aut_id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "aut_firstName"},
                    {"data": "aut_lastName"},
                    {"data": "aut_email"},
                    {"data": "aut_phone"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal"  ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    //jQuery("select[name=tbl_length]").select2({minimumResultsForSearch: -1});
                    $compile(document.getElementById('authorList'))($scope);
                }
            });
            t.on('order.dt search.dt', function () {
                t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });
    $scope.linkEdit = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var author = $filter('filter')($scope.authorList, {adm_id: rowId})[0];
    };
    $scope.linkEdit = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var admin = $filter('filter')($scope.adminList, {adm_id: rowId})[0];
        $scope.admin = admin;

        if(admin.adm_isActive == true)
            jQuery('#yesActive').iCheck('check');
        else
            jQuery('#noActive').iCheck('check');
        jQuery('#yesActive').on('ifChecked', function(event){
            $scope.admin.adm_isActive = true;
        });
        jQuery('#noActive').on('ifChecked', function(event){
            $scope.admin.adm_isActive = false;
        });


        $scope.update = function () {

            alert($scope.admin.adm_isActive);
            adminFactory.update($scope.admin).then(function (response) {
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
            });
        }

    };
    $scope.close = function () {
        $window.location.reload();
    }
});
// add author controller
app.controller("addAuthorController", function ($scope, $location, authorFactory) {
    $scope.add = function () {
        authorFactory.add($scope.firstName, $scope.lastName, $scope.phone, $scope.email, $scope.remark).then(function (response) {
            if (response.status == 200)
                $location.path('author/list');
        });
    }

});

// app.controller("editAuthorController", function ($scope, $location, authorFactory) {
//     authorFactory.view(id).then(function(response){
//         if(response.status == 200){
//             var data = response.data;
//             $scope.firstNameJson = data.aut_firstName;
//             $scope.lastNameJson = data.aut_lastName;
//             $scope.phoneJson = data.aut_phone;
//             $scope.emailJson = data.aut_email;
//             $scope.remarkJson = data.aut_remark;
//         }
//     });
//     $scope.edit = function(){
//         authorFactory.update($scope.firstName, $scope.lastName, $scope.phone, $scope.email, $scope.remark).then(function (response) {
//             if (response.status == 200)
//                 $location.path('author/list');
//         });
//     };
// });


app.controller("changeAdminPassController", function ($scope) {
    app.directive('passwordMatch', function () {
        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function (scope, elem, attrs, control) {
                var checker = function () {
                    var p1 = scope.$eval(attrs.ngModel); //get the value in password input
                    var p2 = scope.$eval(attrs.passwordMatch); //get the value in confirm password input
                    return p1 == p2;
                };
                scope.$watch(checker, function (n) {
                    control.$setValidity("unique", n); //create form control
                });
            }
        };
    });
});
// app.controller("profileController", function ($scope) {});
// app.controller("productListController", function ($scope) {});

// book list controller
app.controller("bookListController", function ($scope, $window, $compile, $filter, bookFactory) {
    bookFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.bookList = response.data;
            var t = jQuery("#bookList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 50,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.bookList,
                "rowId": "id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "title"},
                    {"data": "isbn"},
                    {"data": "status"},
                    {"data": "retailPrice"},
                    {"data": "salePrice"},
                    {"data": "quantity"},
                    {"data": "isActive"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal"  ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    $compile(document.getElementById('bookList'))($scope);
                }
            });
            t.on('order.dt search.dt', function () {
                t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });

    $scope.linkEdit = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var book = $filter('filter')($scope.bookList, {id: rowId})[0];
        $scope.book = book;

        if(book.status == 0)
            jQuery('#status0').iCheck('check');
        else if(book.status == 1)
            jQuery('#status1').iCheck('check');
        else if(book.status == 2)
            jQuery('#status2').iCheck('check');
        else
            jQuery('#status3').iCheck('check');

        jQuery('#status0').on('ifChecked', function(event){
            $scope.book.status = 0;
        });
        jQuery('#status1').on('ifChecked', function(event){
            $scope.book.status = 1;
        });
        jQuery('#status2').on('ifChecked', function(event){
            $scope.book.status = 2;
        });
        jQuery('#status3').on('ifChecked', function(event){
            $scope.book.status = 3;
        });

        if(book.isActive == true)
            jQuery('#yesActive').iCheck('check');
        else
            jQuery('#noActive').iCheck('check');
        jQuery('#yesActive').on('ifChecked', function(event){
            $scope.book.isActive = true;
        });
        jQuery('#noActive').on('ifChecked', function(event){
            $scope.book.isActive = false;
        });

        $scope.update = function () {
            bookFactory.update($scope.book).then(function (response) {
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
            });
        }
        // $scope.status = book.status;
        // $scope.quantity = book.quantity;
        // $scope.retailPrice = book.retailPrice;
        // $scope.salePrice = book.salePrice;
        // $scope.isActive = book.isActive;
        // var title = book.title;
        // var isbn = book.isbn;
        // var publishingDate = book.publishingDate;
        // var importedDate = book.importedDate;
        // var category = $scope.category.getId();
        // var genre = $scope.genre.getId();
        // var language = $scope.language.getId();
        // var publisher = $scope.publisher.getId();


    };
    $scope.close = function () {
        $window.location.reload();
    };
});


app.controller("addBookController", function ($scope, bookFactory, categoryFactory, genreFactory, languageFactory, publisherFactory) {
    categoryFactory.list().then(function (response) {
        if (response.status == 200) {
            var data = response.data;
            $scope.categoryList = data;
        }
    });
    genreFactory.list().then(function (response) {
        if (response.status == 200) {
            var data = response.data;
            $scope.genreList = data;
        }
    });
    languageFactory.list().then(function (response) {
        if (response.status == 200) {
            var data = response.data;
            $scope.languageList = data;
        }
    });
    publisherFactory.list().then(function (response) {
        if (response.status == 200) {
            var data = response.data;
            $scope.publisherList = data;
        }
    });
    var importedDate = new Date();
    var titleBook = $scope.title;
    var createBook = {"title":$scope.title,"isbn":$scope.isbn,"publishingDate": $scope.pub_year,"importedDate": importedDate,
         "status": $scope.status,"retailPrice":$scope.retailPrice,"salePrice":$scope.salePrice,"isActive":$scope.isActive,
        "cat_id":$scope.category,"gen_id":$scope.genre,"lan_id":$scope.language,"pub_id":$scope.publisher};

    $scope.add = function () {
        bookFactory.add(createBook).then(function (response) {
            if (response.status == 200)
                $location.path("/book/list");
        });
    }
});

//Category List Controller
app.controller("categoryListController", function ($scope, $filter, $window, $compile, categoryFactory) {
    categoryFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.categoryList = response.data;
            var t = jQuery("#categoryList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 10,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.categoryList,
                "rowId": "id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "name"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    $compile(document.getElementById('categoryList'))($scope);
                }
            });
            t.on('order.dt search.dt', function () {
                t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });
    $scope.linkEdit = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var category = $filter('filter')($scope.categoryList, {id: rowId})[0];
        $scope.category = category;
        $scope.update = function () {
            categoryFactory.update(rowId, $scope.category.name).then(function (response) {
                if (response.status == 200) {
                    $scope.messageEdit = "Update Successfully!";
                }
                else
                    $scope.messageEdit = "Update Fail";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
    $scope.delete = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        categoryFactory.delete(rowId).then(function (response) {
            var status = response.status;
            if (status == 409)
                alert("Delete Fail");
            if (status == 200)
                $window.location.reload();


        });
    };
});

app.controller("addCategoryController", function ($scope, $location, categoryFactory) {
    $scope.add = function () {
        categoryFactory.add($scope.catName).then(function (response) {
            if (response.status == 200)
                $location.path("category/list");
        });
    }
});

//Genre List Controller
app.controller("addGenreController", function ($scope, $location, genreFactory) {
    $scope.add = function () {
        genreFactory.add($scope.genreName).then(function (response) {
            if (response.status == 200)
                $location.path("genre/list");
        });
    }
});

app.controller("genreListController", function ($scope, $filter, $window, $compile, genreFactory) {
    genreFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.genreList = response.data;
            var t = jQuery("#genreList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 10,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.genreList,
                "rowId": "id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "genreName"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>  <a href="" ng-click="delete($event)"><i class="fa fa-remove text-danger"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    $compile(document.getElementById('genreList'))($scope);
                }
            });
            t.on('order.dt search.dt', function () {
                t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });
    $scope.linkEdit = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var genre = $filter('filter')($scope.genreList, {id: rowId})[0];
        $scope.genres = genre;
        $scope.update = function () {
            genreFactory.update(rowId, $scope.genres.genreName).then(function (response) {
                if (response.status == 200) {
                    $scope.messageEdit = "Update Successfully!";
                }
                else
                    $scope.messageEdit = "Update Fail";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
    $scope.delete = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        genreFactory.delete(rowId).then(function (response) {
            var status = response.status;
            if (status == 409)
                alert("Delete Fail");
            if (status == 200)
                $window.location.reload();


        });
    };
});

// add language Controller
app.controller("addLanguageController", function ($scope, $location, languageFactory) {
    $scope.add = function () {
        languageFactory.add($scope.language).then(function (response) {
            if (response.status == 200)
                $location.path("language/list");
        });
    }
});
// language list controller
app.controller("languageListController", function ($scope, $filter, $window, $compile, languageFactory) {
    languageFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.languageList = response.data;
            var t = jQuery("#languageList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 10,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.languageList,
                "rowId": "id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "language"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>  <a href="" ng-click="delete($event)"><i class="fa fa-remove text-danger"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    $compile(document.getElementById('languageList'))($scope);
                }
            });
            t.on('order.dt search.dt', function () {
                t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });
    $scope.linkEdit = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var language = $filter('filter')($scope.languageList, {id: rowId})[0];
        $scope.language = language;
        $scope.update = function () {
            languageFactory.update(rowId, $scope.language.language).then(function (response) {
                if (response.status == 200) {
                    $scope.messageEdit = "Update Successfully!";
                }
                else
                    $scope.messageEdit = "Update Fail";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
    $scope.delete = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        languageFactory.delete(rowId).then(function (response) {
            var status = response.status;
            if (status == 200)
                $window.location.reload();


        });
    };
});

// add publisher controller
app.controller("addPublisherController", function ($scope, $location, publisherFactory) {
    $scope.add = function () {
        publisherFactory.add($scope.name, $scope.phone, $scope.phone, $scope.fax, $scope.email, $scope.address).then(function (response) {
            if (response.status == 200)
                $location.path("publisher/list");
        });
    }
});

// publisher list controller
app.controller("publisherListController", function ($scope, $filter, $window, $compile, publisherFactory) {
    publisherFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.publisherList = response.data;
            var t = jQuery("#publisherList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 10,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.publisherList,
                "rowId": "id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "publisherName"},
                    {"data": "phone"},
                    {"data": "fax"},
                    {"data": "email"},
                    {"data": "address"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>  <a href="" ng-click="delete($event)"><i class="fa fa-remove text-danger"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    $compile(document.getElementById('publisherList'))($scope);
                }
            });
            t.on('order.dt search.dt', function () {
                t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });
    $scope.linkEdit = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var publisher = $filter('filter')($scope.publisherList, {id: rowId})[0];
        $scope.publisher = publisher;
        $scope.update = function () {
            publisherFactory.update(rowId, $scope.publisher.publisherName, $scope.publisher.phone,
                $scope.publisher.fax, $scope.publisher.email, $scope.publisher.address).then(function (response) {
                if (response.status == 200) {
                    $scope.messageEdit = "Update Successfully!";
                }
                else
                    $scope.messageEdit = "Update Fail";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
    $scope.delete = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        languageFactory.delete(rowId).then(function (response) {
            var status = response.status;
            if (status == 200)
                $window.location.reload();
        });
    };
});

app.controller("customerListController", function ($scope, $filter, $window, $compile, customerFactory) {
    customerFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.customerList = response.data;
            var t = jQuery("#customerList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 10,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.customerList,
                "rowId": "id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "firstName"},
                    {"data": "lastName"},
                    {"data": "username"},
                    {"data": "gender"},
                    {"data": "dob"},
                    {"data": "email"},
                    {"data": "phone"},
                    {"data": "address"},
                    {"data": "status"},
                    {"data": "isActive"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    $compile(document.getElementById('customerList'))($scope);
                }
            });
            t.on('order.dt search.dt', function () {
                t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    });
    $scope.linkEdit = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var customer = $filter('filter')($scope.customerList, {id: rowId})[0];
        $scope.customer = customer;
        $scope.update = function () {
            publisherFactory.update(rowId, $scope.publisher.publisherName, $scope.publisher.phone,
                $scope.publisher.fax, $scope.publisher.email, $scope.publisher.address).then(function (response) {
                if (response.status == 200) {
                    $scope.messageEdit = "Update Successfully!";
                }
                else
                    $scope.messageEdit = "Update Fail";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
    $scope.delete = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        languageFactory.delete(rowId).then(function (response) {
            var status = response.status;
            if (status == 200)
                $window.location.reload();
        });
    };
});
app.controller("orderListController", function ($scope) {
});
app.controller("commentListController", function ($scope) {
});
app.controller("feedbackListController", function ($scope) {
});
app.controller("imageListController", function ($scope) {
});

