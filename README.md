# street-image

## Proje Kurulumu

- ```   npm install   ```
- .env dosyasına api keylerini yazın örnek .env.dist dosyası `VUE_APP_GEO_NAMES_USER=  `
  `VUE_APP_PIXBAY_API_KEY=  `
  `VUE_APP_OPEN_WEATHER_API_KEY=`
- Apiler
    - [Geonames](https://www.geonames.org/export/web-services.html)
    - [Pixabay](https://pixabay.com/api/docs/)
    - [Open Weather Map](https://openweathermap.org/)

## Kullanılanlar
- Tailwind CSS
- ESlint
- Prettier
- Pug HTML
- SASS

## Proje Videosu
[Youtube LINK](https://youtu.be/dbH-ka_qwTs)

## Proje Tanımı

Please find the coding challenge below:

The user should be able to type in a location name.

Display a list of location images, related with user entered keyword (which is a location name like stanbul or Ankara ) In the image list:

The name of the location should be displayed below the image.

The number of images in first page should be 100  
Please check UI Design document to display images properly

if the user clicks on any of the listed images, the application should navigate to another page which displays selected image as cover and also display a card with basic informations listed below

Name of the user entered location Current temperature  
Population

In this second page if the user navigates back to the first page, the state of first page should be preserved. ( it can be either browsers back button or a proper button which you implemented.)

Our goal is to see how you can sanitize and enrich data and use it from one API interaction to another and present it collectively to the user

Please be sure you apply following basic design and development principles in your implementation:

Structured/scalable implementation  
Using a css preprocessor like sass or less  
Responsive Design  
Cross browser compatibility  
Error handling, especially in case of API errors or Network related issues  
Partial loading of page components in case of having any issues in one of the apis (non-breaking pages) A proper README.md file for project installation and running steps

Bonus:  
Lazy load of images in first listing page.
Usage of Tailwindcss