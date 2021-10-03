<div align="center">
  <h1 align="center">Data Catalog</h1>

  <p align="center">
    A dataset manager application aiming to ease the management of datasets coming from different sources.
    <br />
    <br />
    <em><strong>Note:</strong> This is the web frontend application of the Data Catalog project. Details in the <a href="#related-projects">Related projects</a> section.</em>
    <br />
    <br />
    <a href="https://datacatalogfrontend.azurewebsites.net/">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#related-projects">Related projects</a></li>
  </ol>
</details>


## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Nowadays, there are more and more platforms where people can, and eventually will store data. This creates a system that is almost impossible to see through. Many times people will waste their time looking for data that is essential for their work or personal life.

The motivation behind the Data Catalog project is to create a platform where people can manage their data stored in several different locations. Moreover, the application will allow them to share data with other users, which can be ideal for coworkers or friends. So this platform would make data management easy, which would allow users to save time and energy.

### Built With

* [React](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [styled-components](https://styled-components.com/)


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:data-catalog/datacatalog-frontend.git
   ```
   or <br/>
   ```sh
   git clone https://github.com/data-catalog/datacatalog-frontend.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```


## Usage

1. Create a `.env` file based on the `.env.example`.

2. Start the application with `npm start`.


## Contact

Szilárd Tumó - tumoszilard@gmail.com

Project Link: [https://gitlab.com/tumoszilard/eventplanner](https://gitlab.com/tumoszilard/eventplanner)

## Related projects:

The list of Data Catalog projects can be found [here](https://github.com/data-catalog).

- [User Service API](https://github.com/data-catalog/datacatalog-user-api)
- [Asset Service API](https://github.com/data-catalog/datacatalog-asset-api)
- [Versioning Service API](https://github.com/data-catalog/datacatalog-versioning-api)


- [User Service](https://github.com/data-catalog/datacatalog-user-service)
- [Asset Service](https://github.com/data-catalog/datacatalog-asset-service)
- [Versioning Service](https://github.com/data-catalog/datacatalog-versioning-service)


- [Web Frontend](https://github.com/data-catalog/datacatalog-frontend)
- [Python library](https://github.com/data-catalog/datacatalog-python-library)

### Deployed applications:

- [Web Frontend](https://datacatalogfrontend.azurewebsites.net/)
- [User Service](https://userhandlingservice.azurewebsites.net/)
- [Asset Service](https://assethandlingservice.azurewebsites.net/)
- [Versioning Service](https://versioningservice.azurewebsites.net/)

***Note**: The services sleep after 30 minutes fo inactivity. You may need to wait a couple of minutes for the applications to start.*

