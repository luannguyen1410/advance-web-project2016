app.service('shoppingCart',function($cookies) {
    this.list = function() {
        return $cookies.getObject('shoppingCart');
    };
    this.add = function(id,name, price, image) {
        //get
        var shoppingCart = $cookies.getObject('shoppingCart');
        var newList = [];
        if (shoppingCart) {
            var exist = false;
            angular.forEach(shoppingCart, function(value, key) {
                if (value.id == id) {
                    value.quantity = value.quantity + 1;
                    exist = true;
                }
                this.push(value);
            }, newList);

            if (!exist) {
                newList.push(this.newItem(id, name, price, image));
            }
        } else {
            newList.push(this.newItem(id, name, price, image));
        }
        //update
        $cookies.putObject('shoppingCart', newList);
        return newList;
    };

    this.newItem = function(id, name, price, image) {
        var newItem = {};
        newItem.id = id;
        newItem.name = name;
        newItem.price = price;
        newItem.image = image;
        newItem.quantity = 1;
        return newItem;
    };

    this.delete = function(id) {
        //get
        var shoppingCart = $cookies.getObject('shoppingCart');
        var newList = [];
        if (shoppingCart) {
            var exist = false;
            angular.forEach(shoppingCart, function(value, key) {
                if (value.id != id) { this.push(value); }
            }, newList);
        }
        //update
        $cookies.putObject('shoppingCart', newList);
        return newList;
    };
    this.remove = function(){
        var newList = [];
        $cookies.putObject('shoppingCart', newList);
        return newList;
    }
});
