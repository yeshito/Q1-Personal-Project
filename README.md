![Image of Wine Discovery Website](website image/wine-discovery.png)

# Wine-Discovery
The task of navigating shelf after shelf of confusing wine labels, can be daunting for most wine consumers who just want to find a bottle to enjoy. After finally picking a bottle, the results can be disappointing. This common problem was the inspiration for creating Wine Discovery. Though there are apps such as winesearcher.com and snooth.com that are very good for finding a specific wine that you already have in mind, there is a need for an app that finds that specific wine that you like in the first place. This app makes the process of finding that bottle of wine that you enjoy at your price point easy and enjoyable.

# Process
I began this project by finding a suitable wine API (Application Program Interface) to use as my data source to search for wines and retrieve information about those wines. After looking at winesearcher.com and snooth.com as options I settled on the Snooth.com which was free to use and more suited to searching by category rather than specific wine name and vintage.

Once I was approved and given an API key I started sending API requests using Postman to get a sense of how general/specific of a search was needed to retrieve sufficient results that I could filter and present to the user. The first filter that I knew I wanted was by zipcode, to find a wine that a user can purchase in their area. In addition to the latter I found that choosing a wine category (red, white, rose, sparkling or dessert) and either a country of origin or a grape variety struck a good balance to get sufficient and pertinent results.

I found that only certain red and white varieties, and countries yielded results, so I only included those as the options for the user to select. I ordered the options in a way that makes sense for a user, and built the API request URL as options were selected.  


#Technologies used:
* HTML5
* CSS3
* Javascript
* JQuery 2.2.4
* Materialize
* Postman
* Heroku
