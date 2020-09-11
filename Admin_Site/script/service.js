//login admin factory
app.factory('loginFactory', function ($http) {
    return {
        login: function (userName, password) {
            return $http.post(serviceUrls.adminLoginUrl+"?username="+userName+"&password="+password);
        },
    };
});

//admin factory
app.factory('adminFactory', function ($http, Upload) {
    return {
        list: function () {
            return $http.get(serviceUrls.adminListUrl);
        },
        view: function () {
            return $http.get(serviceUrls.adminInfoUrl + "/" + id);
        },
        uploadFiles: function (file, firstName, lastName, username, password, email, address, phone, isActive) {
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
        update: function (admin) {
            var param = {
                adm_id: admin.adm_id,
                adm_firstName: admin.adm_firstName,
                adm_lastName: admin.adm_lastName,
                adm_username: admin.adm_username,
                adm_password: admin.adm_password,
                adm_email: admin.adm_email,
                adm_address: admin.adm_address,
                adm_phone: admin.adm_phone,
                adm_isActive: admin.adm_isActive
            };
            return $http.put(serviceUrls.adminUpdateUrl + "/" + admin.adm_id, param);
        }
    };
});

//author factory
app.factory('authorFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.authorListUrl);
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
        update: function (author) {
            var param = {
                id: author.id,
                aut_firstName: author.aut_firstName,
                aut_lastName: author.aut_lastName,
                aut_phone: author.aut_phone,
                aut_email: author.aut_email,
                remark: author.remark
            };
            return $http.put(serviceUrls.authorUpdateUrl + "/" + author.id, param);
        }
    };
});

//book factory
app.factory('bookFactory', function ($http, Upload) {
    return {
        list: function () {
            return $http.get(serviceUrls.bookListUrl);
        },
        uploadFiles: function (file, title, isbn, publishingDate, importedDate,  status, description,quantity,
                               retailPrice, salePrice, isActive, category, genre, language, publisher, author){
            var param = {
                file: file,
                title: title,
                isbn: isbn,
                publishingDate: publishingDate,
                importedDate: importedDate,
                status: status,
                description: description,
                quantity: quantity,
                retailPrice: retailPrice,
                salePrice: salePrice,
                isActive: isActive,
                category: category,
                genre: genre,
                language: language,
                publisher: publisher,
                author: author
            };
            return Upload.upload({
                url: serviceUrls.bookAddUrl,
                data: param
            });
        },		
        update: function (book) {
            var param = {
                id: book.id,
                title: book.title,
                isbn: book.isbn,
                publishingDate: book.publishingDate,
                importedDate: book.importedDate,
                status: book.status,
                description: book.description,
                quantity: book.quantity,
                retailPrice: book.retailPrice,
                salePrice: book.salePrice,
                isActive: book.isActive,
                category: book.category,
                genre: book.genre,
                language: book.language,
                publisher: book.publisher,
                author: book.author
            };
            return $http.put(serviceUrls.bookUpdateUrl + "/" + book.id, param);
        }
    };
});

//category factory
app.factory('categoryFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.categoryListUrl);
        },
        view: function (id) {
            return $http.get(serviceUrls.categoryInfoUrl + "/" + id);
        },
        add: function (name) {
            var param = {
                name: name
            };
            return $http.post(serviceUrls.categoryAddUrl, param);
        },
        delete: function (id) {
            return $http.delete(serviceUrls.categoryDeleteUrl + "/" + id);
        },
        update: function (id, name) {
            var param = {
                id: id,
                name: name
            };
            return $http.put(serviceUrls.categoryUpdateUrl + "/" + id, param);
        }
    };
});

//customer factory
app.factory('customerFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.customerListUrl);
        },
        update: function (customer) {
            var param = {
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: customer.phone,
                address: customer.address,
                status: customer.status,
                isActive: customer.isActive
            };
            return $http.put(serviceUrls.customerUpdateUrl+ "/" + customer.id, param);
        }
    };
});

//genre factory
app.factory('genreFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.genreListUrl);
        },
        add: function (genreName) {
            var param = {
                genreName: genreName
            };
            return $http.post(serviceUrls.genreAddUrl, param);
        },
        delete: function (id) {
            return $http.delete(serviceUrls.genreDeleteUrl + "/" + id);
        },
        update: function (id, genreName) {
            var param = {
                id: id,
                genreName: genreName
            };
            return $http.put(serviceUrls.genreUpdateUrl + "/" + id, param);
        }
    };
});

//language factory
app.factory('languageFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.languageListUrl);
        },
        add: function (language) {
            var param = {
                language: language
            };
            return $http.post(serviceUrls.languageAddUrl, param);
        },
        delete: function (id) {
            return $http.delete(serviceUrls.languageDeleteUrl + "/" + id);
        },
        update: function (id, language) {
            var param = {
                id: id,
                language: language
            };
            return $http.put(serviceUrls.languageUpdateUrl + "/" + id, param);
        }
    };
});

//language factory
app.factory('publisherFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.publisherListUrl);
        },
        add: function (publisherName, phone, fax, email, address) {
            var param = {
                publisherName: publisherName,
                phone: phone,
                fax: fax,
                email: email,
                address: address
            };
            return $http.post(serviceUrls.publisherAddUrl, param);
        },

        update: function (id, publisherName, phone, fax, email, address) {
            var param = {
                id: id,
                publisherName: publisherName,
                phone: phone,
                fax: fax,
                email: email,
                address: address
            };
            return $http.put(serviceUrls.publisherUpdateUrl + "/" + id, param);
        },
        delete: function (id) {
            return $http.delete(serviceUrls.publisherDeleteUrl+ "/" + id);
        }
    };
});

app.factory('customerFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.customerListUrl);
        },
        update: function (customer) {
            var param = {
                id: customer.id,
                phone: customer.phone,
                address: customer.address,
                status: customer.status,
                isActive: customer.isActive
            };
            return $http.put(serviceUrls.customerUpdateUrl+ "/" + customer.id, param);
        }
    };
});

//feedback Factory
app.factory('feedbackFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.feedbackListUrl);
        },
        update: function (feedback) {
            var param = {
                fee_id: feedback.fee_id,
                fee_cusName: feedback.fee_cusName,
                fee_email: feedback.fee_email,
                fee_subject: feedback.fee_subject,
                fee_message: feedback.fee_message,
                fee_createdDate: feedback.fee_createdDate,
                status: feedback.status
            };
            return $http.put(serviceUrls.feedbackUpdateUrl + "/" + feedback.fee_id, param);
        }
    };
});

//order Factory
app.factory('orderFactory', function ($http) {
    return {
        list: function () {
            return $http.get(serviceUrls.orderListUrl);
        },
        update: function (order) {
            var param = {
                ord_id: order.ord_id,
                ord_purchaseDate: order.ord_purchaseDate,
                ord_shippingDate: order.ord_shippingDate,
                shippingTime: order.shippingTime,
                shippingAddress: order.shippingAddress,
                phone: order.phone,
                ord_status: order.ord_status,
                customer: order.customer
            };
            return $http.put(serviceUrls.orderUpdateUrl + "/" + order.ord_id, param);
        }
    };
});

//order Factory
app.factory('orderListFactory', function ($http) {
    return {
        list: function (id) {
            return $http.get(serviceUrls.orderDetailUrl+"/"+id);
        }
    };
});

// Api Urls
var serviceUrls = {};
serviceUrls.baseUrl = 'http://localhost:8282';

// List Url
serviceUrls.adminListUrl = serviceUrls.baseUrl + '/VietBook/administrator/list';
serviceUrls.authorListUrl = serviceUrls.baseUrl + '/VietBook/author/list';
serviceUrls.bookListUrl = serviceUrls.baseUrl + '/VietBook/book/list';
serviceUrls.categoryListUrl = serviceUrls.baseUrl + '/VietBook/category/listName';
serviceUrls.genreListUrl = serviceUrls.baseUrl + '/VietBook/genre/list';
serviceUrls.languageListUrl = serviceUrls.baseUrl + '/VietBook/language/list';
serviceUrls.publisherListUrl = serviceUrls.baseUrl + '/VietBook/publisher/list';
serviceUrls.customerListUrl = serviceUrls.baseUrl + '/VietBook/customer/list';
serviceUrls.feedbackListUrl = serviceUrls.baseUrl + '/VietBook/feedback/list';
serviceUrls.orderListUrl = serviceUrls.baseUrl + '/VietBook/order/list';
// Create data Url
serviceUrls.adminAddUrl = serviceUrls.baseUrl + '/VietBook/administrator/create';
serviceUrls.authorAddUrl = serviceUrls.baseUrl + '/VietBook/author/create';
serviceUrls.bookAddUrl = serviceUrls.baseUrl + '/VietBook/book/create';
serviceUrls.categoryAddUrl = serviceUrls.baseUrl + '/VietBook/category/create';
serviceUrls.genreAddUrl = serviceUrls.baseUrl + '/VietBook/genre/create';
serviceUrls.languageAddUrl = serviceUrls.baseUrl + '/VietBook/language/create';
serviceUrls.publisherAddUrl = serviceUrls.baseUrl + '/VietBook/publisher/create';

// Update Url
serviceUrls.adminUpdateUrl = serviceUrls.baseUrl + '/VietBook/administrator/update';
serviceUrls.authorUpdateUrl = serviceUrls.baseUrl + '/VietBook/author/update';
serviceUrls.bookUpdateUrl = serviceUrls.baseUrl + '/VietBook/book/update';
serviceUrls.categoryUpdateUrl = serviceUrls.baseUrl + '/VietBook/category/update';
serviceUrls.genreUpdateUrl = serviceUrls.baseUrl + '/VietBook/genre/update';
serviceUrls.languageUpdateUrl = serviceUrls.baseUrl + '/VietBook/language/update';
serviceUrls.publisherUpdateUrl = serviceUrls.baseUrl + '/VietBook/publisher/update';
serviceUrls.customerUpdateUrl = serviceUrls.baseUrl + '/VietBook/customer/update';
serviceUrls.feedbackUpdateUrl = serviceUrls.baseUrl + '/VietBook/feedback/update';
serviceUrls.orderUpdateUrl= serviceUrls.baseUrl + '/VietBook/order/update';
// Delete Url
serviceUrls.authorDeleteUrl = serviceUrls.baseUrl + '/VietBook/author/delete';
serviceUrls.bookDeleteUrl = serviceUrls.baseUrl + '/VietBook/book/delete';
serviceUrls.categoryDeleteUrl = serviceUrls.baseUrl + '/VietBook/category/delete';
serviceUrls.genreDeleteUrl = serviceUrls.baseUrl + '/VietBook/genre/delete';
serviceUrls.languageDeleteUrl = serviceUrls.baseUrl + '/VietBook/language/delete';
serviceUrls.publisherDeleteUrl = serviceUrls.baseUrl + '/VietBook/publisher/delete';
// View info Url
serviceUrls.adminInfoUrl = serviceUrls.baseUrl + '/VietBook/administrator/view';
serviceUrls.authorInfoUrl = serviceUrls.baseUrl + '/VietBook/author/view';
serviceUrls.orderDetailUrl = serviceUrls.baseUrl + '/VietBook/orderdetail/view';
//Login Url
serviceUrls.adminLoginUrl = serviceUrls.baseUrl + "/VietBook/administrator/login";

