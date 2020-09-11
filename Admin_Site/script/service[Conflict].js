//login admin factory
app.factory('loginFactory', function($http) {
    return {
        login: function(userName) {
            var param = {
                userName: userName
            };
            return $http.post(serviceUrls.adminLoginUrl+"/"+userName);
        },
    };
});

//admin factory
app.factory('adminFactory', function ($http, Upload) {
    return {
        list: function () {
            return $http.get(serviceUrls.adminListUrl);
        },
        view: function(){
          return $http.get(serviceUrls.adminInfoUrl+ "/"+id)  ;
        },
        uploadFiles: function(file,firstName, lastName, username, password, email, address, phone, isActive){
            var param = {
                file: file,
                adm_firstName: firstName,
                adm_lastName: lastName,
                adm_username: username,
                adm_password: password,
                adm_email: email,
                adm_address: address,
                adm_phone: phone,
                adm_isActive: isActive
            };
            return Upload.upload({
                url: serviceUrls.adminAddUrl,
                data: param
            });
        },
        update: function (id, firstName, lastName, username, password, email, address, phone, isActive) {
            var param = {
                adm_id: id,
                adm_firstName: firstName,
                adm_lastName: lastName,
                adm_username: username,
                adm_password: password,
                adm_email: email,
                adm_address: address,
                adm_phone: phone,
                adm_isActive: isActive
            };
            return $http.put(serviceUrls.adminUpdateUrl + "/"+id, param);
        }
    };
});

//author factory
app.factory('authorFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.authorListUrl);
        },
        view: function(){
            return $http.get(serviceUrls.authorInfoUrl+ "/"+id)  ;
        },
        add: function (firstName, lastName, phone, email, remark) {
            var param = {
                aut_firstName: firstName,
                aut_lastName: lastName,
                aut_phone: phone,
                aut_email: email,
                remark: remark
            };
            return $http.post(serviceUrls.authorAddUrl, param);
        },
        delete: function (id) {
            return $http.delete(serviceUrls.authorDeleteUrl+ "/"+id);
        },
        update: function (id,firstName, lastName, phone, email, remark) {
            var param = {
                id: id,
                aut_firstName: firstName,
                aut_lastName: lastName,
                aut_phone: phone,
                aut_email: email,
                remark: remark
            };
            return $http.put(serviceUrls.authorUpdateUrl + "/"+id, param);
        }
    };
});

//book factory
app.factory('bookFactory', function($http) {
    return {
        list: function() {
            return $http.get(serviceUrls.bookListUrl);
        },
        add: function (title, isbn, publishingDate, importedDate, status, retailPrice, salePrice, quantity, isActive) {
            var param = {
                title: title,
                isbn: isbn,
                publishingDate: publishingDate,
                importedDate: importedDate,
                boo_status: status,
                retailPrice: retailPrice,
                salePrice: salePrice,
                quantity: quantity,
                boo_isActive: isActive
            };
            return $http.post(serviceUrls.bookAddUrl, param);
        },
        delete: function (id) {
            return $http.delete(serviceUrls.bookDeleteUrl+ "/"+id);
        },
        update: function (title, isbn, publishingDate, importedDate, status, retailPrice, salePrice, quantity, isActive) {
            var param = {
                title: title,
                isbn: isbn,
                publishingDate: publishingDate,
                importedDate: importedDate,
                boo_status: status,
                retailPrice: retailPrice,
                salePrice: salePrice,
                quantity: quantity,
                boo_isActive: isActive
            };
            return $http.put(serviceUrls.bookUpdateUrl + "/"+id, param);
        }
    };
});

//category factory
app.factory('categoryFactory', function($http) {
    return {
        list: function() {
            return $http.get(serviceUrls.categoryListUrl);
        },
        view: function(id){
            return $http.get(serviceUrls.categoryInfoUrl+ "/"+id)  ;
        },
        add: function (name) {
            var param = {
                name: name
            };
            return $http.post(serviceUrls.categoryAddUrl, param);
        },
        delete: function (id) {
            return $http.delete(serviceUrls.categoryDeleteUrl+ "/"+id);
        },
        update: function (id, name) {
            var param = {
                id: id,
                name: name
            };
            return $http.put(serviceUrls.categoryUpdateUrl + "/"+id, param);
        }
    };
});




// Api Urls
var serviceUrls = {};
serviceUrls.baseUrl = 'http://localhost:8282';

serviceUrls.adminListUrl = serviceUrls.baseUrl + '/VietBook/administrator/list';
serviceUrls.authorListUrl = serviceUrls.baseUrl + '/VietBook/author/list';
serviceUrls.bookListUrl = serviceUrls.baseUrl + '/VietBook/book/list';
serviceUrls.categoryListUrl = serviceUrls.baseUrl + '/VietBook/category/listName';

serviceUrls.adminAddUrl = serviceUrls.baseUrl + '/VietBook/administrator/create';
serviceUrls.authorAddUrl = serviceUrls.baseUrl + '/VietBook/author/create';
serviceUrls.bookAddUrl = serviceUrls.baseUrl + '/VietBook/book/create';
serviceUrls.categoryAddUrl = serviceUrls.baseUrl + '/VietBook/category/create';

serviceUrls.adminUpdateUrl = serviceUrls.baseUrl + '/VietBook/adminnistrator/update';
serviceUrls.authorUpdateUrl = serviceUrls.baseUrl + '/VietBook/author/update';
serviceUrls.bookUpdateUrl = serviceUrls.baseUrl + '/VietBook/book/update';
serviceUrls.categoryUpdateUrl = serviceUrls.baseUrl + '/VietBook/category/update';

serviceUrls.authorDeleteUrl = serviceUrls.baseUrl + '/VietBook/author/delete';
serviceUrls.bookDeleteUrl = serviceUrls.baseUrl + '/VietBook/book/delete';
serviceUrls.categoryDeleteUrl = serviceUrls.baseUrl + '/VietBook/category/delete';

serviceUrls.adminInfoUrl = serviceUrls.baseUrl + '/VietBook/administrator/view';
serviceUrls.authorInfoUrl = serviceUrls.baseUrl + '/VietBook/author/view';
serviceUrls.categoryInfoUrl = serviceUrls.baseUrl + '/VietBook/category/view';

serviceUrls.adminLoginUrl = serviceUrls.baseUrl + "/admin/login";

