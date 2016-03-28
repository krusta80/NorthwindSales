John,

Good work creating an app that persistently lets me manage my mock team. You did a good job using booleans in ng-disabled and ng-class to give clear indications when certain buttons were disabled.

The way you set up your Factories is correct but could be written a bit more semantic manner. It seems like you declare a few container objects, one of which contains the factory functions and another (newRegions) which is overwritten in one of the factory methods. 

In your controller, try declaring functions on the controller's $scope instead of using this. That way you don't risk overwriting one of your controller's native methods. 

I think you are definitely getting these newer concepts at play. In the future, look at some styleguides for Angular or other repos of successful projects to see some decent naming and code style conventions. Keep it up!
-Dan