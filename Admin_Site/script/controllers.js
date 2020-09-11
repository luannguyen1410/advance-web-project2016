"use stricts";

app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            jQuery('body').append('<script src="js/custom.min.js"></script>');
        }, 10);
    });
});
// login Controller
app.controller("loginController", function ($scope, $location, $cookieStore, loginFactory) {
    $scope.login = function () {
        loginFactory.login($scope.userName, $scope.password).then(function (response) {
            if (response.status == 200) {
                var data = response.data;
                if (data.adm_isActive == true) {
                    $cookieStore.put("admin", data);
                    $location.path("/home");
                }
                else
                    $scope.errorMessage = "Wrong username or password";
            }


        });
    };
});


// app.controller("forgotPassController", function ($scope) {});
app.controller("homeController", function ($scope) {
    
});

app.controller("profileController", function ($scope, $cookieStore, $rootScope) {
    $scope.admFirstName = $cookieStore.get("admin").adm_firstName;
    $scope.admLastName = $cookieStore.get("admin").adm_lastName;
    $scope.admEmail = $cookieStore.get("admin").adm_email;
    $scope.admAddress = $cookieStore.get("admin").adm_address;
    $scope.admPhone = $cookieStore.get("admin").adm_phone;

});

//add admin controller
app.controller("addAdminController", function ($scope, $location, adminFactory) {
    jQuery('#yesRadio').on('ifChecked', function (event) {
        $scope.isActive = true;
    });
    jQuery('#noRadio').on('ifChecked', function (event) {
        $scope.isActive = false;
    });
    $scope.add = function () {
        var file = $scope.file;
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
app.controller("adminListController", function ($scope, $window, $compile, $filter,  adminFactory) {
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
                    {
                        "data": null, mRender: function (data, type, row) {
                        if (row.adm_isActive == true)
                            return "<i class='fa fa-check text-info'></i>";
                        else
                            return "<i class='fa fa-times text-danger'></i>";
                    }
                    },
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

        if (admin.adm_isActive == true)
            jQuery('#yesActive').iCheck('check');
        else
            jQuery('#noActive').iCheck('check');
        jQuery('#yesActive').on('ifChecked', function (event) {
            $scope.admin.adm_isActive = true;
        });
        jQuery('#noActive').on('ifChecked', function (event) {
            $scope.admin.adm_isActive = false;
        });


        $scope.update = function () {
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
app.controller("authorListController", function ($scope, $window, $compile, $filter, authorFactory) {
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
                "rowId": "id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "aut_firstName"},
                    {"data": "aut_lastName"},
                    {"data": "aut_email"},
                    {"data": "aut_phone"},
                    {"data": "remark"},
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
        var author = $filter('filter')($scope.authorList, {id: rowId})[0];
        $scope.author = author;
        $scope.update = function () {
            authorFactory.update($scope.author).then(function (response) {
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
});
// add author controller
app.controller("addAuthorController", function ($scope, $location, authorFactory) {
    $scope.add = function () {
        authorFactory.add($scope.firstName, $scope.lastName, $scope.phone, $scope.email, $scope.remark).then(function (response) {
            if (response.status == 200)
                $location.path('author/list');
        });
    };
});

// app.controller("changeAdminPassController", function ($scope) {
//


// book list controller
app.controller("bookListController", function ($scope, $window, $compile, $filter,  bookFactory) {
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
                    {
                        "data": null, mRender: function (data, type, row) {
                        if (row.status == 0)
                            return "Old";
                        else if (row.status == 1)
                            return "New";
                        else if (row.status == 2)
                            return "Sale";
                        else
                            return "Best-seller";
                    }
                    },
                    {"data": "retailPrice"},
                    {"data": "salePrice"},
                    {"data": "quantity"},
                    {
                        "data": null, mRender: function (data, type, row) {
                        if (row.isActive == true)
                            return "<i class='fa fa-check text-info'></i>";
                        else
                            return "<i class='fa fa-times text-danger'></i>";
                    }
                    },
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

        if (book.status == 0)
            jQuery('#status0').iCheck('check');
        else if (book.status == 1)
            jQuery('#status1').iCheck('check');
        else if (book.status == 2)
            jQuery('#status2').iCheck('check');
        else
            jQuery('#status3').iCheck('check');

        jQuery('#status0').on('ifChecked', function (event) {
            $scope.book.status = 0;
        });
        jQuery('#status1').on('ifChecked', function (event) {
            $scope.book.status = 1;
        });
        jQuery('#status2').on('ifChecked', function (event) {
            $scope.book.status = 2;
        });
        jQuery('#status3').on('ifChecked', function (event) {
            $scope.book.status = 3;
        });

        if (book.isActive == true)
            jQuery('#yesActive').iCheck('check');
        else
            jQuery('#noActive').iCheck('check');
        jQuery('#yesActive').on('ifChecked', function (event) {
            $scope.book.isActive = true;
        });
        jQuery('#noActive').on('ifChecked', function (event) {
            $scope.book.isActive = false;
        });

        $scope.update = function () {
            bookFactory.update($scope.book).then(function (response) {
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
});


app.controller("addBookController", function ($scope, $timeout, $location,  authorFactory, bookFactory, categoryFactory, genreFactory, languageFactory, publisherFactory) {
    authorFactory.list().then(function (response) {
        if (response.status == 200) {
            var data = response.data;
            $scope.authorList = data;
        }
    });
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
    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            jQuery('#radStatus1, #radStatus2, #radStatus3, #radStatus4').on('ifChecked', function (event) {
                $scope.status = $(this).val();
            });

            jQuery('#yesActive').on('ifChecked', function (event) {
                $scope.isActive = true;
            });
            jQuery('#noActive').on('ifChecked', function (event) {
                $scope.isActive = false;
            });
        }, 0);
    });


    $scope.add = function () {
        var importedDate = new Date();
        var publishingYear = new Date($scope.pub_year);
        var quantity = 0;
        bookFactory.uploadFiles($scope.file, $scope.title, $scope.isbn, publishingYear, importedDate, $scope.status, $scope.description,
            quantity, $scope.retailPrice, $scope.salePrice, $scope.isActive, $scope.category, $scope.genre,
            $scope.language, $scope.publisher, $scope.author).then(function (response) {
            if (response.status == 200)
                $location.path("book/list");
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
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
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
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
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
        publisherFactory.add($scope.name, $scope.phone, $scope.fax, $scope.email, $scope.address).then(function (response) {
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
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
    $scope.delete = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        publisherFactory.delete(rowId).then(function (response) {
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
                    {
                        "data": null, mRender: function (data, type, row) {
                        if (row.gender == 0)
                            return "Male";
                        else
                            return "Female";
                    }
                    },
                    {"data": "dob"},
                    {"data": "email"},
                    {"data": "phone"},
                    {"data": "address"},
                    {
                        "data": null, mRender: function (data, type, row) {
                        if (row.status == 0)
                            return "New";
                        else if (row.status == 1)
                            return "Normal";
                        else if (row.status == 2)
                            return "Premium";
                        else
                            return "V.I.P";
                    }
                    },
                    {
                        "data": null, mRender: function (data, type, row) {
                        if (row.isActive == true)
                            return "<i class='fa fa-check text-info'></i>";
                        else
                            return "<i class='fa fa-times text-danger'></i>";
                    }
                    },
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


        if (customer.status == 0)
            jQuery('#status0').iCheck('check');
        else if (customer.status == 1)
            jQuery('#status1').iCheck('check');
        else if (customer.status == 2)
            jQuery('#status2').iCheck('check');
        else
            jQuery('#status3').iCheck('check');

        jQuery('#status0').on('ifChecked', function (event) {
            $scope.customer.status = 0;
        });
        jQuery('#status1').on('ifChecked', function (event) {
            $scope.customer.status = 1;
        });
        jQuery('#status2').on('ifChecked', function (event) {
            $scope.customer.status = 2;
        });
        jQuery('#status3').on('ifChecked', function (event) {
            $scope.customer.status = 3;
        });

        if (customer.isActive == true)
            jQuery('#yesActive').iCheck('check');
        else
            jQuery('#noActive').iCheck('check');
        jQuery('#yesActive').on('ifChecked', function (event) {
            $scope.customer.isActive = true;
        });
        jQuery('#noActive').on('ifChecked', function (event) {
            $scope.customer.isActive = false;
        });


        $scope.update = function () {
            customerFactory.update($scope.customer).then(function (response) {
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
});

app.controller("orderListController", function ($scope, $filter, $window, $compile, orderFactory, orderListFactory) {
    orderFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.orderList = response.data;
            var t = jQuery("#orderList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 10,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.orderList,
                "rowId": "ord_id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "ord_id"},
                    {"data": "ord_purchaseDate"},
                    {"data": "ord_shippingDate"},
                    {"data": "shippingTime"},
                    {"data": "shippingAddress"},
                    {"data": "phone"},
                    {
                        "data": null, mRender: function (data, type, row) {
                        if (row.ord_status == 0)
                            return "Contacted";
                        else if (row.ord_status == 1)
                            return "Not Ship";
                        else if(row.ord_status == 2)
                            return "Fail";
                        else
                            return "Success"
                    }
                    },
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a> <a href="" data-toggle="modal"  data-target="#myModal2" ng-click="view($event)"><i class="fa fa-eye"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    $compile(document.getElementById('orderList'))($scope);
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
        var order = $filter('filter')($scope.orderList, {ord_id: rowId})[0];
        $scope.order = order;

        if (order.ord_status == 0)
            jQuery('#status0').iCheck('check');
        else if (order.ord_status == 1)
            jQuery('#status1').iCheck('check');
        else if(order.ord_status == 2)
            jQuery('#status2').iCheck('check');
        else
            jQuery('#status3').iCheck('check');

        jQuery('#status0').on('ifChecked', function (event) {
            $scope.order.ord_status = 0;
        });
        jQuery('#status1').on('ifChecked', function (event) {
            $scope.order.ord_status = 1;
        });
        jQuery('#status2').on('ifChecked', function (event) {
            $scope.order.ord_status = 2;
        });
        jQuery('#status3').on('ifChecked', function (event) {
            $scope.order.ord_status = 3;
        });

        $scope.update = function () {
            orderFactory.update($scope.order).then(function (response) {
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
            });
        }
    };


    $scope.view = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var orderDetail = $filter('filter')($scope.orderList, {ord_id: rowId})[0];
        $scope.orderDetail = orderDetail;

        orderListFactory.list(rowId).then(function (response) {
            if (response.status == 200)
                $scope.orderDetailList = response.data;
        });

    };

    $scope.close = function () {
        $window.location.reload();
    };
    $scope.close2 = function () {
        jQuery("#myModal2").modal('hide');
    }
});


// app.controller("commentListController", function ($scope) {
// });

//Feedback List Controller
app.controller("feedbackListController", function ($scope, $filter, $window, $compile, feedbackFactory) {
    feedbackFactory.list().then(function (response) {
        if (response.status == 200) {
            $scope.feedbackList = response.data;
            var t = jQuery("#feedbackList").DataTable({
                "aLengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 10,
                "retrieve": true,
                //"processing": true,
                "deferRender": true,
                "aaData": $scope.feedbackList,
                "rowId": "fee_id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "fee_cusName"},
                    {"data": "fee_email"},
                    {"data": "fee_subject"},
                    {"data": "fee_message"},
                    {"data": "fee_createdDate"},
                    {
                        "data": null, mRender: function (data, type, row) {
                        if (row.status == 0)
                            return "New";
                        else if (row.status == 1)
                            return "Read";
                        else if (row.status == 2)
                            return "Spam";
                        else
                            return "Answered";
                    }
                    },
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
                    $compile(document.getElementById('feedbackList'))($scope);
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
        var feedback = $filter('filter')($scope.feedbackList, {fee_id: rowId})[0];
        $scope.feedback = feedback;

        if (feedback.status == 0)
            jQuery('#status0').iCheck('check');
        else if (feedback.status == 1)
            jQuery('#status1').iCheck('check');
        else if (feedback.status == 2)
            jQuery('#status2').iCheck('check');
        else
            jQuery('#status3').iCheck('check');

        jQuery('#status0').on('ifChecked', function (event) {
            $scope.feedback.status = 0;
        });
        jQuery('#status1').on('ifChecked', function (event) {
            $scope.feedback.status = 1;
        });
        jQuery('#status2').on('ifChecked', function (event) {
            $scope.feedback.status = 2;
        });
        jQuery('#status3').on('ifChecked', function (event) {
            $scope.feedback.status = 3;
        });

        $scope.update = function () {
            feedbackFactory.update($scope.feedback).then(function (response) {
                if (response.status == 200)
                    $scope.messageEdit = "Update Successfully!";
            });
        }
    };
    $scope.close = function () {
        $window.location.reload();
    };
});


