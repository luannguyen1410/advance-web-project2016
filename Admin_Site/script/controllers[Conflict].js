"use stricts";

app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            jQuery('body').append('<script src="js/custom.min.js"></script>');
        }, 50);
    });
});

app.controller("loginController", function ($scope, $location, loginFactory) {
    $scope.login = function(){
        loginFactory.login($scope.userName).then(function(response){
            if (response.status == 200) {
                var dataPassword = response.data;
                var password = $scope.password;
                if (password == dataPassword) {
                    $location.path("home");
                } else {
                    $scope.errorMessage = "Wrong username or password";
                }

            } else {
                alert("Error!");
            }
        });
    };
});


// app.controller("forgotPassController", function ($scope) {});
app.controller("homeController", function ($scope) {});

// admin list controller
app.controller("adminListController", function ($scope, $window, $compile, $filter, adminFactory) {
    adminFactory.list().then(function(response){
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
                 {"data": "adm_phone"},
                 {"data": "adm_address"},
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

    $scope.linkEdit = function($event){
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var administrator = $filter('filter')($scope.adminList, {adm_id : rowId})[0];
        $scope.ADMIN = administrator;

        var active = true;
        if($scope.activeRadio == "0")
            active = false;
        var userName = ADMIN.adm_username;
        var password = ADMIN.adm_password;
        var image = ADMIN.adm_image;
        if($scope.activeRadio == 0)
            isActive = true;
        else
            isActive = false;

        $scope.update = function(){
            categoryFactory.update(rowId, $scope.ADMIN.adm_firstName, $scope.ADMIN.adm_lastName,
                userName , password, $scope.ADMIN.adm_email, $scope.ADMIN.adm_address,
                $scope.ADMIN.adm_phone, isActive, image).then(function (response) {
                if (response.status == 200) {
                    $scope.messageEdit = "Update Successfully!";
                }
                else
                    $scope.messageEdit = "Update Fail";
            });
        }

    };
    $scope.close = function(){
        $window.location.reload();
    };
});
//add admin controller
app.controller("addAdminController", function ($scope, $location, adminFactory) {
    $scope.add = function() {
        var file = $scope.file;
        var active = true;
        if($scope.isActive == "0")
            active = false;
        adminFactory.uploadFiles(file, $scope.firstName, $scope.lastName, $scope.username, $scope.password,
            $scope.email, $scope.address, $scope.phone, active).then(function (response) {
            if (response.status == 200) {
                $location.path('admin/list');
            }
        });
    };
});

////Match the passwords jquery.
app.directive('passwordMatch', function(){
	return{
		restrict: 'A',
		scope: true,
		require: 'ngModel',
		link: function(scope, elem, attrs, control){
			var checker = function(){
				var e1 = scope.$eval(attrs.ngModel); //get the value in password input
				var e2 = scope.$eval(attrs.passwordMatch); //get the value in confirm password input
				return e1 == e2;
			};	
			scope.$watch(checker, function(n){
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
                "rowId": "aut_id",
                "aoColumns": [
                    {"data": null, "sDefaultContent": "", "sClass": "bg-gray", "bSortable": false},
                    {"data": "aut_firstName"},
                    {"data": "aut_lastName"},
                    {"data": "aut_email"},
                    {"data": "aut_phone"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>',
                        "sClass": "text-nowrap",
                        "bSortable": false
                    }
                ],
                "order": [[2, "asc"]],
                "initComplete": function () {
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
    $scope.linkEdit = function($event){
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var author = $filter('filter')($scope.authorList, {id : rowId})[0];
        $scope.author = author;
        var list = author.appearsOnBook;
        $scope.update = function(){
            authorFactory.update(rowId, $scope.author.aut_firstName,$scope.author.aut_lastName,$scope.author.aut_phone,
                $scope.author.aut_email,$scope.author.remark, list).then(function (response) {
                if (response.status == 200) {
                    $scope.messageEdit = "Update Successfully!";
                }
                else
                    $scope.messageEdit = "Update Fail";
            });
        }
    };
});
// add author controller
app.controller("addAuthorController", function ($scope, $location, authorFactory) {
    $scope.add = function(){
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
	app.directive('passwordMatch', function(){
        return{
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function(scope, elem, attrs, control){
                var checker = function(){
                    var p1 = scope.$eval(attrs.ngModel); //get the value in password input
                    var p2 = scope.$eval(attrs.passwordMatch); //get the value in confirm password input
                    return p1 == p2;
                };
                scope.$watch(checker, function(n){
                    control.$setValidity("unique", n); //create form control
                });
            }
        };
    });
});
// app.controller("profileController", function ($scope) {});
// app.controller("productListController", function ($scope) {});

// book list controller
app.controller("bookListController", function ($scope, $window, $compile, bookFactory) {
    bookFactory.list().then(function(response){
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
                    {"data": "publishingDate"},
                    {"data": "importedDate"},
                    {"data": "boo_status"},
                    {"data": "retailPrice"},
                    {"data": "salePrice"},
                    {"data": "quantity"},
                    {"data": "boo_isActive"},
                    {
                        "data": null,
                        "sDefaultContent": '<a href="" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>  <a href="" ng-click="delete($event)"><i class="fa fa-remove text-danger"></i></a>',
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
    $scope.linkEdit = function($event){
        var rowId = jQuery($event.target).closest("tr").attr('id');
        alert(rowId);

    };
    $scope.delete = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        alert(rowId);
        bookFactory.delete(rowId).then(function (response) {
            if (response.status == 200) {
                $window.location.reload();
            }
        });
    };
});


app.controller("addBookController", function ($scope, bookFactory) {
	  var date = new Date();
        $scope.add = function(){
            bookFactory.add($scope.catName).then(function (response) {
                if (response.status == 200)
                    $location.path("category/list");
            });
        }
});

app.controller("categoryListController", function ($scope,$filter, $window, $compile, categoryFactory) {
    categoryFactory.list().then(function(response){
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
                        "sDefaultContent": '<a href="" data-toggle="modal" data-target="#myModal" ng-click="linkEdit($event)"><i class="fa fa-edit"></i></a>  <a href="" ng-click="delete($event)"><i class="fa fa-remove text-danger"></i></a>',
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
    $scope.linkEdit = function($event){
        var rowId = jQuery($event.target).closest("tr").attr('id');
        var category = $filter('filter')($scope.categoryList, {id : rowId})[0];
        $scope.category = category;
        $scope.update = function(){
            categoryFactory.update(rowId, $scope.category.name).then(function (response) {
                if (response.status == 200) {
                    $scope.messageEdit = "Update Successfully!";
                }
                else
                    $scope.messageEdit = "Update Fail";
            });
        }
    };
    $scope.close = function(){
        $window.location.reload();
    }
    $scope.delete = function ($event) {
        var rowId = jQuery($event.target).closest("tr").attr('id');
        categoryFactory.delete(rowId).then(function (response) {
            var status = response.status;
            if(status == 409)
                alert("Delete Fail");
            if (status == 200)
                $window.location.reload();


        });
    };
});

app.controller("addCategoryController", function ($scope,$location, categoryFactory) {
    $scope.add = function(){
        categoryFactory.add($scope.catName).then(function (response) {
            if (response.status == 200)
                $location.path("category/list");
        });
    }
});
//  app.controller("addGenreController", function ($scope) {});
//  app.controller("addLanguageController", function ($scope) {});
//  app.controller("addPublisherController", function ($scope) {});
// app.controller("tableController", function ($scope) {});


//app.controller("customerListController", function ($scope) {});
// app.controller("genreListController", function ($scope) {});
// app.controller("orderListController", function ($scope) {});
// app.controller("publisherListController", function ($scope) {});
// app.controller("languageListController", function ($scope) {});
// app.controller("commentListController", function ($scope) {});
// app.controller("feedbackListController", function ($scope) {});
// app.controller("imageListController", function ($scope){});
//

// app.controller("editBookController", function ($scope) {});
// app.controller("editCategoryController", function ($scope) {});
// app.controller("editGenreController", function ($scope) {});
// app.controller("editLanguageController", function ($scope) {});
// app.controller("editPublisherController", function ($scope) {});

