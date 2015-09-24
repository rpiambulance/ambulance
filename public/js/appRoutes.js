angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    var views = [
        'Home', 'RPIA-About', 'FAQ', '5939-About', 'FR59-About', 'Officers', 'Communications', 'Media', 'Minutes',
        'Mutual-Aid', 'Radio-Callsigns', 'Attendant-Training', 'Compatibility', 'Constitution', 'Contact', 'Copy',
        'Coverage', 'CPR-Certification', 'Crew-Chief-Training', 'Devs', 'Docs', 'DOH-Resources', 'Driver-Training',
        'EMT-Reciprocity', 'In-Service-Training', 'Login', 'Misc-Forms', 'New-Members-Training', 'RENSCO-Resources',
        'Report-Issue', 'SOP', 'Supervisor-Training', 'System-Requirements', 'Text-Message-Dispatch'
    ];

    views.forEach(function (elem, index) {
        $routeProvider.when('/' + elem.toLowerCase(), {
            templateUrl: 'views/' + elem.toLowerCase() + '.html',
            controller: elem.replace('-', '') + 'Ctrl',
            caseInsensitiveMatch: true,
            activeTab: elem.toLowerCase().replace(' ', '-'),
            title: elem.replace('-', ' ')
        });
    });

    $routeProvider.otherwise({
        redirectTo:'/home'
    });

    //$locationProvider.html5Mode(true);

}]);