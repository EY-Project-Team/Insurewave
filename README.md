# Insurewave

Insurewave is a project created by EY for insuring container and shipping vessels used by Maersk. A contract will be created by the broker for the shipping vessels that need to be insured and send to the insurance company for insurance.

 

Three kind of users will be there EY users , Brokers, Insurers
First EY users will enter all the shipping details of the client in the Assets/Vessels page (eg) container, Ship, engine, anchor, crane
Broker User will create a contract for the assets that need to be insured he will calculate the premium based on the cost of each Vessels. Then he will send the contact to insurer.
Insurer user will accept or reject the contract, if its accepted it will be sent to Broker, and then the Broker will send the contract back to EY User.
 

This is a blockchain and IOT based project, it’s an 1.5 year project if we use these technologies it will take more time. Above is the stripped down requirement of the project.


<img src="https://i.ytimg.com/vi/o8yvRfXCkhc/hqdefault.jpg" alt="Logo" width="80" height="80" style="max-width: 100%;">

### Built With

* [Angular](https://angular.io/)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [.NET Framework](https://dotnet.microsoft.com/en-us/learn/dotnet/what-is-dotnet)
* [REST API](redhat.com/en/topics/api/what-is-a-rest-api)
* [Microsoft SQL Server](https://www.microsoft.com/en-in/sql-server/)

### Installation

1. Download and Restore the Database From Insurewave.bak
2. Clone the API & ANGULAR Repo.
3. Open the WebApplication1 in Visual Studio code and connect your database of 'Insurewave' using Server Explorer & Get the Connection String.
4. Replace the Connection String with your new Connection String in appsettings.json , Startup.cs , InsurewaveContext.cs
5. Under Nuget Package Console , Run the API using Dotnet Run.
6. cd to Angular Project Folder in Visual Studio Code or whichever IDE you use for Angular
7. Install NPM Packages for the Angular Frontend using NPM Install.
8. ng serve --open in Console

## TODO

- [ ] U.I. Updation Required
- [ ] Implementation of Dependency Injection & Repository in WEB API
- [ ] XUnit Testing for WEB API
- [ ] UserType AuthGuard 

