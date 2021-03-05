# InfoVis_IngredientsGraphVisualization

Final project for the Information Visualization course, Roma Tre 2019/2020

  
  

## Client description

  

  

Graphical visualization of the "TheMealDB" dataset, based on the free APIs made available [here](https://www.themealdb.com/).

  

  

The main purpose of the application is to explore the dataset by searching recipes starting from a subset of ingredients.

  

Users can:

  

- Begin their search process either by clicking on one of the ingredients listed by alphabetical order on the homepage (this will lead to a single ingredient based search) or by writing any combination of ingredients they please on the search bar.

  

- Filter the results both upstream and downstream of their query to the system by using the following criteria:

  

- Category

  

- Geographical Area

  

In response, our system will suggest a set of recipe cards, previewing the corrisponding dishes to the user and how many ingredients he needs/he's missing. The results will be shown in an alphabetical order by default.

  

From here, users can:

  

- Sort the results in either ascending or descending order on a missing ingredients basis.

  

- Select one of the results to visualize a sheet containing ingredient measures, a set of instructions and a link to the video recipe.

  

At any of the described steps, users can decide to clear the search bar and the filter criterias by clicking on the "Clear" button next to the search bar without losing the results of their previous search.

  

Clicking on the website logo will completely reload the application.

  
  

### Technologies / Libraries

- Javascript

- Vue.js

- Bootstrap

- Bootstrap-vue

- TheMealDB

  

### Project setup

From the @/client folder:

```

npm install

npm run serve

```
