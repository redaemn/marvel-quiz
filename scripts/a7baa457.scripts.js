"use strict";angular.module("marvelQuizApp",["marvelQuizApp.common","marvelQuizApp.quizzes","ngRoute"]).config(["$routeProvider","$httpProvider","MarvelWrapperProvider",function(a,b,c){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/options",{templateUrl:"views/options.html",controller:"OptionsCtrl"}).otherwise({redirectTo:"/"}),c.setApiKey("fad24ca2acf5adc8c2e73d2ad1a8b06a"),b.interceptors.push("MarvelApiLimitExceededInterceptor")}]).run(["$rootScope","MarvelApiStatus","APP_STATE_EVENTS",function(a,b,c){a.$on("$locationChangeStart",function(d,e){var f=e.indexOf("/quiz/")>-1;f&&b.apiLimitExceeded()&&(d.preventDefault(),a.$broadcast(c.marvelApiLimitExceeded))})}]),angular.module("marvelQuizApp.common",["ngRoute"]),angular.module("marvelQuizApp.quizzes",["marvelQuizApp.common"]),angular.module("marvelQuizApp").controller("HomeCtrl",["$scope","GoogleAnalytics",function(a,b){b.pageView(),a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("marvelQuizApp").controller("NavbarCtrl",["$scope","Quiz","$location",function(a,b,c){a.quizzes=b.getAllQuizzes(),a.isActive=function(a){return c.path()===a}}]),angular.module("marvelQuizApp").controller("MainCtrl",["$scope","QUIZ_EVENTS","Score","APP_STATE_EVENTS",function(a,b,c,d){a.attemptedQuizzes=function(){return c.getAttemptedQuizzes()},a.successRate=function(){return c.successRate()},a.$on(b.quizStart,function(a,b){c.registerAttemptedQuiz(b.quizName)}),a.$on(b.correctAnswer,function(a,b){c.registerCorrectAnswer(b.quizName)}),a.$on(b.wrongAnswer,function(a,b){c.registerWrongAnswer(b.quizName)}),a.$on(d.marvelApiLimitExceeded,function(){a.marvelApiLimitExceeded=!0})}]),angular.module("marvelQuizApp").controller("OptionsCtrl",["$scope","Score","$window","GoogleAnalytics",function(a,b,c,d){d.pageView(),a.resetScore=function(){c.confirm("Are you sure you want to delete all your prestige and start from scratch?")&&b.resetScore()}}]),angular.module("marvelQuizApp.common").provider("Quiz",["$routeProvider",function(a){function b(a){return a.replace(/^mq\./,"")}function c(a,b){return void 0===b&&(b=" "),a.replace(/[A-Z]/g,function(a){return b+a.toLowerCase()})}function d(a){return a.replace(/^([a-z])|\s+([a-z])/g,function(a){return a.toUpperCase()})}function e(a){return"/quiz/"+c(b(a),"-")}function f(a){return a.displayName?a.displayName:d(c(b(a.uniqueName)))}var g={},h={uniqueName:"",controller:"",templateUrl:""};this.register=function(b){if(b=angular.extend({},h,b),0!==b.uniqueName.indexOf("mq."))throw new Error('Quiz unique name "'+b.uniqueName+'" must start with "mq." prefix');if(g[b.uniqueName])throw new Error('Quiz "'+b.uniqueName+'" already registered.');g[b.uniqueName]={displayName:f(b),route:e(b.uniqueName)},a.when(g[b.uniqueName].route,{templateUrl:"quizzes/"+b.templateUrl,controller:b.controller})},this.$get=function(){function a(){return null===b&&(b=angular.copy(g)),b}var b=null;return{getAllQuizzes:a}}}]),angular.module("marvelQuizApp.common").provider("MarvelWrapper",function(){var a;this.setApiKey=function(b){a=b},this.$get=["$http","Cache","$q","GoogleAnalytics","MarvelApiStatus",function(b,c,d,e,f){function g(a){var b=d.defer();return b.resolve(a),b.promise}function h(a){var b="";return 429===a.status?(e.marvelServiceLimitExceeded(),f.apiLimitExceeded(!0)):0===a.status?e.marvelServiceError("0 - Aborted"):(b+=a.status,a.data.code&&(b+=" - "+a.data.code),a.data.message&&(b+=" - "+a.data.message),e.marvelServiceError(b)),d.reject(a)}function i(){var d="totalCharacters",f=c.get(d);return f?(e.marvelServiceCacheHit("characters"),g(f)):b.get(k+"/characters",{params:{limit:1,apikey:a}}).then(function(a){var b=a.data.data.total;return c.put(d,b),e.marvelServiceRequest("characters"),b},h)}function j(d){var f="characters/"+angular.toJson(d),i=c.get(f);return i?(e.marvelServiceCacheHit("characters"),g(i)):b.get(k+"/characters",{params:angular.extend(d,{apikey:a})}).then(function(a){var b=a.data.data.results;return c.put(f,b),e.marvelServiceRequest("characters"),b},h)}var k="//gateway.marvel.com/v1/public";return{totalCharacters:i,characters:j}}]}),angular.module("marvelQuizApp.common").service("MarvelData",["MarvelWrapper","$q","Utils",function(a,b,c){function d(c){if(c=angular.extend({},j,c),c.count<1||c.count>100)throw new Error("MarvelData[getRandomCharacter()]: Count param must be between 1 and 100");return a.totalCharacters().then(function(a){var d,e=[];for(d=0;d<c.count;++d)e.push(c.withImageAvailable?g(a):f(a));return b.all(e)})}function e(b){return a.characters({limit:i,offset:i*(b-1)})}function f(a){var b=c.getRandomInt(0,a-1),d=Math.ceil((b+1)/i);return e(d).then(function(a){return a[b%i]})}function g(a){return f(a).then(function(b){return h(b)?b:g(a)})}function h(a){var b=/^.+\/image_not_available$/;return!b.test(a.thumbnail.path)}var i=10,j={count:1,withImageAvailable:!1};this.getRandomCharacter=d}]),angular.module("marvelQuizApp.common").service("Cache",["$window",function(a){function b(a,b,c){this.data=a,this.created=b?new Date(b):new Date,c&&(this.expiration=c)}function c(){var a,c;return i&&(a=i.getItem("MarvelQuizApp"))?(c={},angular.forEach(angular.fromJson(a),function(a,d){var e=new b(a.data,a.created,a.expiration);e.isExpired()||(c[d]=e)}),c):{}}function d(a){i&&i.setItem("MarvelQuizApp",angular.toJson(a))}function e(a,c,d){h[a]=angular.isDefined(d)?new b(c,null,d):new b(c)}function f(a){return h[a]?h[a].isExpired()?(delete h[a],g):h[a].data:g}var g,h,i=a.localStorage||null;b.prototype.isExpired=function(){var a=new Date;return-1===this.expiration?!1:a-this.created>(this.expiration||864e5)},h=c(),angular.element(a).on("unload",function(){d(h)}),this.put=e,this.get=f}]),angular.module("marvelQuizApp.common").service("GoogleAnalytics",["$window","$location",function(a,b){function c(){i("send","pageview",b.path())}function d(){i("send","event","marvel-link","click",b.path())}function e(a){i("send","event","marvel-service","request",a)}function f(a){i("send","event","marvel-service","cache-hit",a)}function g(a){i("send","event","marvel-service","error-response",a)}function h(){i("send","event","marvel-service","limit-exceeded")}var i=angular.isFunction(a.ga)?a.ga:angular.noop;this.pageView=c,this.marvelLinkClick=d,this.marvelServiceRequest=e,this.marvelServiceCacheHit=f,this.marvelServiceError=g,this.marvelServiceLimitExceeded=h}]),angular.module("marvelQuizApp.common").constant("QUIZ_EVENTS",{quizStart:"quiz-event-start",correctAnswer:"quiz-event-correct-answer",wrongAnswer:"quiz-event-wrong-answer"}),angular.module("marvelQuizApp").service("Score",["Cache",function(a){function b(){return{version:n,attemptedQuizzes:{},correctAnswers:{},wrongAnswers:{}}}function c(a){return angular.isUndefined(a.version)&&(a.version=1),a}function d(){a.put("scoreValues",m,-1)}function e(a){return a&&m.attemptedQuizzes[a]?m.attemptedQuizzes[a]:f()}function f(){var a=0;return angular.forEach(m.attemptedQuizzes,function(b){a+=b}),a}function g(a){if(!angular.isString(a))throw new Error("Score[registerAttemptedQuiz()]: quizName parameter is not valid");return m.attemptedQuizzes[a]=(m.attemptedQuizzes[a]||0)+1,d(),m.attemptedQuizzes[a]}function h(a){if(!angular.isString(a))throw new Error("Score[registerCorrectAnswer()]: quizName parameter is not valid");return m.correctAnswers[a]=(m.correctAnswers[a]||0)+1,d(),m.correctAnswers[a]}function i(){var a=0;return angular.forEach(m.correctAnswers,function(b){a+=b}),a}function j(a){if(!angular.isString(a))throw new Error("Score[registerWrongAnswer()]: quizName parameter is not valid");return m.wrongAnswers[a]=(m.wrongAnswers[a]||0)+1,d(),m.wrongAnswers[a]}function k(a){var b,c,d;return a&&m.attemptedQuizzes[a]&&m.correctAnswers[a]?(c=m.attemptedQuizzes[a],d=m.correctAnswers[a]):(c=f(),d=i()),b=0!==c?d/c:0,(100*b).toFixed(2)}function l(){m=b(),d()}var m,n=1;m=a.get("scoreValues")||b(),m.version!==n&&(c(m,n),d()),this.getAttemptedQuizzes=e,this.registerAttemptedQuiz=g,this.registerCorrectAnswer=h,this.registerWrongAnswer=j,this.successRate=k,this.resetScore=l}]),angular.module("marvelQuizApp.common").service("MarvelApiLimitExceededInterceptor",["$q","MarvelApiStatus","$rootScope","APP_STATE_EVENTS",function(a,b,c,d){function e(a){return a.url.indexOf("/gateway.marvel.com/")>-1}return{request:function(f){var g=a.defer();return f.timeout=g.promise,e(f)&&b.apiLimitExceeded()&&(g.resolve(),c.$broadcast(d.marvelApiLimitExceeded)),f||a.when(f)}}}]),angular.module("marvelQuizApp").service("MarvelApiStatus",["Cache",function(a){function b(b){return angular.isDefined(b)&&(c=b,a.put("apiLimitExceeded",c,18e5)),c}var c=a.get("apiLimitExceeded")||!1;this.apiLimitExceeded=b}]),angular.module("marvelQuizApp.common").constant("APP_STATE_EVENTS",{marvelApiLimitExceeded:"app-state-event-marvel-api-limit-exceeded"}),angular.module("marvelQuizApp.common").service("Utils",function(){function a(a,b){return Math.floor(Math.random()*(b-a+1))+a}function b(a){for(var b,c,d=a.length;0!==d;)c=Math.floor(Math.random()*d),d-=1,b=a[d],a[d]=a[c],a[c]=b;return a}this.getRandomInt=a,this.shuffleArray=b}),angular.module("marvelQuizApp").directive("marvelLink",["GoogleAnalytics",function(a){function b(){a.marvelLinkClick()}return{template:'<a class="marvel-link" ng-href="{{url}}" ng-transclude target="_blank"></a>',replace:!0,transclude:!0,scope:{url:"@"},restrict:"E",link:function(a,c){c.on("click",b)}}}]),angular.module("marvelQuizApp").directive("marvelApiLimitExceededModal",function(){return{restrict:"E",templateUrl:"views/common/marvel-api-limit-exceeded-modal.html",replace:!0,scope:{toggle:"="},link:function(a,b){a.$watch("toggle",function(a){b.modal(a===!0?"show":"hide")})}}}),angular.module("marvelQuizApp.quizzes").config(["QuizProvider",function(a){a.register({uniqueName:"mq.matchCharacters",controller:"mq.matchCharacters.MainCtrl",templateUrl:"matchCharacters/views/main.html"})}]),angular.module("marvelQuizApp.quizzes").controller("mq.matchCharacters.MainCtrl",["$scope","MarvelData","QUIZ_EVENTS","GoogleAnalytics","Utils",function(a,b,c,d,e){function f(){d.pageView(),a.characters=[],a.correctNames=[],a.chosenNames=[],a.answered=!1,a.correctAnswer=!1,a.loadingCharacters=!0,a.loadingError=!1,g=null,b.getRandomCharacter({count:4,withImageAvailable:!0}).then(function(b){angular.forEach(b,function(b){a.characters.push({image:b.thumbnail,name:b.name,urls:b.urls}),a.chosenNames.push(b.name)}),e.shuffleArray(a.chosenNames),a.loadingCharacters=!1,a.$emit(c.quizStart,{quizName:"matchCharacters"})},function(){a.loadingCharacters=!1,a.loadingError=!0})}var g;f(),a.restart=f,a.selectName=function(b){var c;a.answered||(null!==g?(g!==b&&(c=a.chosenNames[g],a.chosenNames[g]=a.chosenNames[b],a.chosenNames[b]=c),g=null):g=b)},a.isNameSelected=function(a){return a===g},a.checkAnswer=function(){var b=!0;a.answered=!0,angular.forEach(a.chosenNames,function(c,d){a.characters[d].name!==c&&(b=!1)}),a.correctAnswer=b,b?a.$emit(c.correctAnswer,{quizName:"matchCharacters"}):a.$emit(c.wrongAnswer,{quizName:"matchCharacters"})},a.isNameCorrect=function(b){return a.chosenNames[b]===a.characters[b].name},a.showSolution=function(){angular.forEach(a.characters,function(b){a.correctNames.push(b.name)})}}]);