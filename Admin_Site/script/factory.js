//New method
app.factory('userFactory', function ($http) {
    return {
        login: function (userName, password) {
            var param = {
                userName: userName,
                password: password
            };
            return $http.post(serviceUrls.userLoginUrl, param);
        }
    };
});
app.factory('typeFactory', function ($http) {
    return {
        list: function (accessToken) {
            var param = {
                accessToken: accessToken
            };
            return $http.post(serviceUrls.typeListUrl, param);
        },
        update: function (id, name) {
            var param = {
                typeId: id,
                typeName: name
            };
            return $http.post(serviceUrls.typeUpdateUrl, param);
        },
        add: function (name) {
            var param = {
                typeName: name
            };
            return $http.post(serviceUrls.typeAddUrl, param);
        },
        delete: function (id) {
            var param = {
                typeId: id
            };
            return $http.post(serviceUrls.typeDeleteUrl, param);
        }
    };
});


// Api Urls
var serviceUrls = {};
serviceUrls.baseUrl = 'http://www.saigontech.edu.vn/proshop-api';
serviceUrls.userLoginUrl = serviceUrls.baseUrl + '/login.php';
