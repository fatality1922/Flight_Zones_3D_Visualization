https://fatality1922.github.io/Flight_Zones_3D_Visualization/</br></br>

![ezgif com-gif-maker](https://user-images.githubusercontent.com/13122492/216832372-a00b2020-a857-497c-bc3d-f030b7d6bfca.gif)
![ppm2](https://user-images.githubusercontent.com/13122492/216833403-514da9f4-26a6-4790-bc22-9703881afd01.png)


Use PPM to change the angle of your view </br></br>
To change visibility of zone type press three-bars button in upper-left corner. </br></br>
This project is purposed to visualise flight zones of Poland in 3D. </br>
That means both vertical and horizontal borders are showed correctly.</br>
Dependend on mapbox style of the map you can also see terrain elevation 
and buildings. 

Shown zones has maximum height based on fakeHeight parameter created to prevent 3D display bugs </br>
in cases when zones have equal heights. 
This implies some inaccuracy, nevertheless it has minimal impact </br> 
on the proper presentation of the zones.

Moreover application has automatic cache-buster mechanism what means there's </br>
no need to clean your cache memory when new version is released. 

Planned features:
- toggle styling of the map (terrain elevation/normal map
- add zones to global variable via Redux/Context
- show more info about zone after click
