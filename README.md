[![CI/CD](https://github.com/taylorjg/basketcase-react/actions/workflows/ci.yml/badge.svg)](https://github.com/taylorjg/basketcase-react/actions/workflows/ci.yml)

# Description

This is a toy/mock online store app. It's main point of interest is the faceted navigation
which is driven by an Elasticsearch query on the backend.

The frontend is deployed to gh-pages and the backend is deployed to AWS using Serverless Framework.

## History

I initially wrote this as an AngularJS 1.x app back in 2017. The code is available in [this repo](https://github.com/taylorjg/BasketCase). Originally, the backend was an Express app and the whole thing was deployed to Heroku. Then, in 2022, Heroku removed all their free tier offerings so I moved the app to Render. The spin-up time seemed to be longer on Render than Heroku so I repackaged the backend code as a
serverless function and deployed it to AWS using Serverless Framework so that I could deploy the frontend
to gh-pages where it is always available.

# Features

* Change the sort order
* Filter by a search term
* Show faceted information - counts of products by brand, colour, price, etc.
* Filter by facets - allow results to be filtered by selecting brand, colour, price, etc.
* Responsive UI: filters are embedded in the page when the screen size is `md` or above otherwise they are shown in a slide out panel
* Infinite scrolling - scroll to the bottom of the page to load more results
* URL history - each time a change is made to the search term, sort order or facet selections, a new URL is pushed to the browser history allowing:
  * Bookmarking of URLs
  * Sharing of URLs
  * Navigation backwards and forwards through URLs

# Technologies

## Frontend

* JavaScript
* React
* Vite
* Material UI
* react-query
* Vitest + React Testing Library + msw
* Cypress + Cypress Testing Library
* GitHub Actions

## Backend

The code for the backend is available in [this repo](https://github.com/taylorjg/basketcase-serverless).

* Node.js
* Serverless Framework
* Elasticsearch (hosted on [Bonsai](https://bonsai.io/))

# Links

* [BasketCase Serverless Backend repo](https://github.com/taylorjg/basketcase-serverless)
* [Serverless Framework](https://www.serverless.com/)
* [Old AngularJS 1.x version of BasketCase](https://github.com/taylorjg/BasketCase)
