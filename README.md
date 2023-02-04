https://fatality1922.github.io/Flight_Zones_3D_Visualization/</br></br>

Use PPM to change the angle of your view </br></br>
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
- add zones to global variable via Redux/Context
- add user manual and short description
- add cache buster 
- toggle visibility of the zones with buttons
- add display of version number based on date of the build
