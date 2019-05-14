# The National Biogeographic Map

This project consists of a lightweight React APP and Leaflet map viewer.

The source for this project is publicly available at:
https://github.com/usgs-bis/National-Biogeographic-Map-React

Content is driven from our public API:
https://sciencebase.usgs.gov/staging/bis/

Source data, including metadata information contained in this app can be found at:
https://www.sciencebase.gov/catalog/

## Technologies used:
1. React https://reactjs.org/
2. Leaflet https://leafletjs.com/
3. D3 https://d3js.org/
4. Pdfmake http://pdfmake.org/#/
5. Turf https://turfjs.org/
6. Bootstrap https://getbootstrap.com/
7. Html2canvas https://html2canvas.hertzen.com/

## To Run:

* yarn

        yarn install
        yarn start // Uses `.env.dev-local`

* npm

        npm install
        npm start // Uses `.env.dev-local`

* docker

        ./run.sh

    To build a static site (`npm run build`) and serve:

        ./run.sh static

## Building:

* `npm run build`
* * builds the app for production deploy using `.env.production`

* `npm run build:beta`
* * builds the app for beta deploy using `.env.beta` to override values in `.env.production`

* `npm run build:dev`
* * builds the app for development deploy using `.env.dev` to override values in `.env.production`


## To review and publish

* This project follows a three branch structure.
     * development ->  https://dev-sciencebase.usgs.gov/biogeography
     * beta ->  https://my-beta.usgs.gov/biogeography/
     * master (FUTURE) -> https://maps.usgs.gov/biogeography
* Merge code into development branch for review
* Open a PR to beta branch for further review and testing
* After code is reviewed and tested, open a pr to master branch to deploy to production

## Current Deploys:

* ### Biogeography

    * DEV-IS k8s: (Deprecated) ~~https://master.staging.sciencebase.gov/biogeography~~
    * DEV-IS: (Internal USGS Only) https://dev-sciencebase.usgs.gov/biogeography
    * My-BETA: https://my-beta.usgs.gov/biogeography/

* ### Terrestrial Ecosystems 2011

    * DEV-IS k8s: (Deprecated) ~~https://master.staging.sciencebase.gov/terrestrial-ecosystems-2011~~
    * DEV-IS: (Internal USGS Only) https://dev-sciencebase.usgs.gov/terrestrial-ecosystems-2011
    * MY-BETA: https://my-beta.usgs.gov/terrestrial-ecosystems-2011/

## Authors

* Ben Gotthold
* Jake Juszak

## Acknowledgments

* This version of the  National Biogeographic Map was heavily influenced by the previous <a href="https://github.com/usgs-bis/nbm_front_end" target="_blank">version</a>


## Copyright and License

<p>This USGS product is considered to be in the U.S. public domain, and is licensed under <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">CC0 1.0</a>.
Although this software program has been used by the U.S. Geological Survey (USGS), no warranty, expressed or implied, is made by the USGS or the U.S. Government as to the accuracy and functioning of the program and related program material nor shall the fact of distribution constitute any such warranty, and no responsibility is assumed by the USGS in connection therewith. </p>
