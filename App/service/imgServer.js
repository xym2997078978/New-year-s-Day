app.factory('imgConfig', function ($q, $http) {
    return {
        getJson: function (url, type) {
            var def = $q.defer();
            $http({
                url: url,
                method: type || 'GET'
            }).success(function (data) {
                def.resolve(data);
            }).error(function (error) {
                def.reject(error);
            });
            return def.promise;
        }
    };
});