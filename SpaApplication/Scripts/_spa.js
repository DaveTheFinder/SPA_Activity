
var app = angular.module("spa", ["ngResource", "ngRoute"]);

app.factory('employeeService', function ($resource) {
    return $resource('/api/employees/:id',
        { id: '@Id' },
        {
            update: { method: 'PUT' }
        });
});

app.factory('departmentService', function ($resource) {
    return $resource('/api/departments/:id',
        { id: '@Id' },
        {
            update: { method: 'PUT' }
        });
});


app.controller("mainController", function ($scope) {

});

app.controller("employeeController", function ($scope, employeeService) {

    $scope.employee = employeeService.query();

});

app.controller("departmentController", function ($scope, departmentService) {

    $scope.departments = departmentService.query();

    $scope.department = {
        Id: 0,
        Name: '',
    };

    $scope.deleteDepartment = function (department) {
        departmentService.remove(department, $scope.refreshData);
    };

    $scope.refreshData = function () {
        $scope.departments = departmentService.query();
    };

    $scope.showAddDialog = function () {
        $('#modal-dialog').modal('show');
    };

    $scope.saveDepartment = function() {
        departmentService.save($scope.department, $scope.refreshData);
        $('#modal-dialog').modal('hide');
        
        $scope.clearCurrentDepartment();
    };

    $scope.clearCurrentDepartment = function () {
        $scope.department = { Id: 0, Name: '' };

    };

});

app.controller("employeeController", function ($scope, employeeService) {

    $scope.employees = employeeService.query();

    $scope.employee = {
        Id: 0,
        Name: '',
        Position: '',
        DepartmentId: 0
    };

    $scope.deleteEmployee = function (employee) {
        employeeService.remove(employee, $scope.refreshData);
    };

    $scope.refreshData = function () {
        $scope.employees = employeeService.query();
    };

    $scope.showAddDialog = function () {
        $('#modal-dialog').modal('show');
    };

    $scope.saveEmployee = function () {
        employeeService.save($scope.employee, $scope.refreshData);
        $('#modal-dialog').modal('hide');

        $scope.clearCurrentEmployee();
    };

    $scope.clearCurrentEmployee = function () {
        $scope.employee = {Id: 0, Name: '', Position: '', DepartmentId: 0,};
    };

});


    app.config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'mainController'
        }).when('/employees', {
            templateUrl: '/Content/Views/Employees.html',
            controller: 'employeeController'
        }).when('/departments', {
            templateUrl: '/Content/Views/Departments.html',
            controller: 'departmentController'
        });
    });
