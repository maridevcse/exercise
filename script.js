let app=angular.module('app',['ngDialog']);

app.filter('celsius', [function() {
    return function(celsius) {
        if (celsius === undefined || celsius === null) {
            return '';
        }
        return celsius + ' °C';
    };
}])
app.config(function($sceDelegateProvider) {  
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain. **.
        'http://ergast.com/**'
      ]);

    })


app.controller('appController',['$scope','$log','$sce','$http','$sce','ngDialog',function($scope,$log,$sce,$http,$sce,ngDialog){
    $scope.name="Scope Binded without Specifying a controller";
    $scope.names=['Ranveer','Rahul','Rajesh','Anvar','Michale'];
    $scope.apiData=[];
    $scope.cats = [
                        {name:'John',salary:30000,age:30},
                        {name:"Ben",salary:10000,age:25},
                        {name: "Lawrence",salary:15000,age:20},
                        {name: "Jeff",salary:40000,age:23} ]
                                                                
    $scope.filterValue="name";
    $scope.apiFoxData=[]
    $scope.reverseSort=false;

    $scope.toggleSort=column=>{
        $scope.reverseSort=$scope.filterValue===column ? !$scope.reverseSort : false;
        $scope.filterValue=column; }

    $scope.toggleStyle=column=>{
        if($scope.filterValue===column){
            return $scope.reverseSort ? 'arrow-down':'arrow-up'
        }
        return '';
    }
  
    
   $scope.openDialog=()=>{

       ngDialog.open({
           template:"<p>This is a Dialog</p>",
           plain:true
       })
   }

   $scope.openExternalDialog=()=>{

    var dialog=ngDialog.open({
        template:"./template/ngdialogTemplate.html",
        className:'ngdialog-theme-default',
        scope:$scope
       
    })

    setTimeout(function(){
      
        dialog.close();
        
    },2000)

    }
   
    
  
  
    $http.get('https://randomfox.ca/floof/').then(el=>$scope.apiFoxData.push(el.data)).catch(err=>alert(err))
 
    $scope.weatherSearch=(location)=>{
       $scope.apiData=[];
       $http.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=3d823cbee7fdad42d1bb0d81d397fc29`).then(el=>$scope.apiData.push(el.data)).catch(err=>alert(err.data.message.toUpperCase()))
       $scope.weather="";
        
    }


}])




 