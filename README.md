<a name="readme-top"></a>

  <h3 align="center">Keyboard Blog Management - Code Test</h3>

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About

![Project Screen Shot][screenshot]

<div>
<h3>Keyboard Blog Management - Code Test</h3>
<p align="justify">Meet Keyboard Blog Management – Your All-in-One Hub for Custom Keyboards

Welcome to Keyboard Blog Management , the ultimate platform designed to streamline your journey into the world of custom keyboards. Whether you’re a hobbyist, a professional, or just curious about mechanical keyboards, our blog is here to simplify the process, boost your creativity, and keep you connected with a thriving community of enthusiasts.

From in-depth guides on building your first custom keyboard to expert tips on optimizing performance and aesthetics, we’ve got everything you need to stay ahead of the curve. Our goal? To help you focus less on the hassle and more on what matters most—crafting the perfect typing experience.</p>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This Project is built with :

* [![ReactJs][React.js]][React-url]
* [![MySQL DB][MySQL]][MySQL-url]
* [![Laravel][Laravel]][Laravel-url]
* [![PHP][PHP]][PHP-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow the instruction below to install the project locally.

### Installation

Follow the steps below for installation of this project.

1. Clone the repo.
   ```sh
   git clone https://github.com/sodaAPI/alturian-coding-test.git
   ```
2. Install NPM packages in ./alturian-coding-test/client/
   ```sh
   npm install
   ```
3. Install composer packages in ./alturian-coding-test/
   ```sh
   composer install
   ```
4. Setting your databases in .env.
   ```sh
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=db_alturian
   DB_USERNAME=root
   DB_PASSWORD=
   ```
5. Migrate Database
   ```sh
   php artisan migrate
   ```
6. Seed Database
   ```sh
   php artisan db:seed
   ```
7. Run your MySQL server.
8. Start server ./alturian-coding-test/
   ```sh
   php artisan serve
   ```
9. Start client in ./alturian-coding-test/client/
   ```sh
   npm run dev
   ```


   
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[screenshot]: /client-side/src/Images/hero-bg.png
[React.js]: https://img.shields.io/badge/React_Js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-20232A?style=for-the-badge&logo=TailwindCSS&logoColor=06B6D4
[MySQL]: https://img.shields.io/badge/MySQL-20232A?style=for-the-badge&logo=mysql&logoColor=4479A1
[Laravel]: https://img.shields.io/badge/Laravel-20232A?style=for-the-badge&logo=laravel&logoColor=FF2D20
[PHP]: https://img.shields.io/badge/PHP-20232A?style=for-the-badge&logo=php&logoColor=777BB4
[PHP-url]: https://www.php.net/
[Laravel-url]: https://laravel.com/
[TailwindCSS-url]: https://tailwindcss.com/
[MySQL-url]: https://www.mysql.com/
[React-url]: https://reactjs.org/
