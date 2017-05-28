angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    var views = [
        'Home', 'RPIA-About', 'FAQ', '5939-About', 'FR59-About', 'Officers', 'Communications', 'Media', 'Minutes',
        'Mutual-Aid', 'Radio-Callsigns', 'Attendant-Training', 'Compatibility', 'Constitution', 'Contact', 'Copy',
        'Coverage', 'CPR-Certification', 'Crew-Chief-Training', 'Devs', 'DOH-Resources', 'Driver-Training',
        'EMT-Reciprocity', 'In-Service-Training', 'Login', 'Misc-Forms', 'New-Members-Training', 'RENSCO-Resources',
        'SOP', 'Supervisor-Training', 'System-Requirements', 'Text-Message-Dispatch', 'Coverage-Details',
        'Join', 'Night-Crews', 'Member-List', 'Stocking-Issue', 'Fuel-Log', 'Add-Member', 'Expirations', 'Community',
        'Edit-Member', 'Games-Events', 'Add-Event', 'Edit-Default', 'Event', 'Game', 'Modify-Schedule', 'My-Training',
        'My-Settings', 'Announcements', 'Nominations', 'Fuel-Log', '404'
    ];

    views.forEach(function (elem, index) {
        $routeProvider.when('/' + elem.toLowerCase(), {
            templateUrl: 'views/' + elem.toLowerCase() + '.html',
            controller: elem.replace(/-/g, '') + 'Ctrl',
            caseInsensitiveMatch: true,
            activeTab: elem.toLowerCase().replace(/ /g, '-'),
            title: elem.replace(/-/g, ' ')
        });
    });

    $routeProvider.when('/edit-member/:memberId', {
        templateUrl: 'views/edit-member.html',
        controller: 'EditMemberCtrl',
        caseInsensitiveMatch: true,
        activeTab: 'edit-member',
        title: 'Edit Member'
    })

    $routeProvider.when('/logout', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    });

    $routeProvider.otherwise({
        redirectTo:'/404'
    });

    // $locationProvider.html5Mode(true);

}]);