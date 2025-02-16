---
layout: post
title:  "Configuracion para Debian 12"
author: "Luis"
tags: Ensayo
comments: true
---

Estas son las configuraciones básicas que aplico al momento de instalar Debian en cualquier máquina. A nivel general se trata
de los repositorios backports y los añadidos `non-free` y `non-free-firmware` para mayor soporte de hardware. Adicionalmente, algunas cosas para 
un mejor soporte de multimedia y juegos. En el primer apartado encontrara lo mas basico para una optima experiencia dentro del sistema gracias a la añadidura 
de algunos extras. Posteriormente encontrara la respectiva configuracion personalizada enfocada en el gaming. 

# Configuracion general 

Primero, necesitamos configurar el archivo *sources.list* con el siguiente comando:
```
sudo nano /etc/apt/sources.list
```

Una vez allí procedemos a añadir:

```
#Repo oficial
deb https://ftp.debian.org/debian/ bookworm contrib main non-free non-free-firmware
#deb-src https://ftp.debian.org/debian/ bookworm contrib main non-free non-free-firmware

#Actualizaciones
deb https://ftp.debian.org/debian/ bookworm-updates contrib main non-free non-free-firmware
#deb-src https://ftp.debian.org/debian/ bookworm-updates contrib main non-free non-free-firmware

#Seguridad
deb https://security.debian.org/debian-security/ bookworm-security contrib main non-free non-free-firmware
#deb-src https://security.debian.org/debian-security/ bookworm-security contrib main non-free non-free-firmware

#Backports
deb https://ftp.debian.org/debian/ bookworm-backports contrib main non-free non-free-firmware
#deb-src https://ftp.debian.org/debian/ bookworm-backports contrib main non-free non-free-firmware

#Multimedia
deb https://www.deb-multimedia.org bookworm main non-free

```
Y continuamos a guardar los cambios. Podremos actualizar los repos, sin embargo, nos arrojará un error debido a la falta de la key para el repo multimedia.
Para instalarla es necesario ir al siguiente [link](https://deb-multimedia.org/dists/stable/main/binary-amd64/package/deb-multimedia-keyring) y descargar el archivo **.deb**. Por consola tambien podremos realizar la instalación mediante un:
```
sudo wget https://deb-multimedia.org/pool/main/d/deb-multimedia-keyring/deb-multimedia-keyring_2024.9.1_all.deb
sudo dpkg -i deb-multimedia-keyring_2016.8.1_all.deb
```
Una vez finalizado un simple: 

```
sudo apt update && sudo apt upgrade
```
Aplicará los cambios en el sistema teniendo ya las mejoras. No está demás añadir que el repo *multimedia* complementa y mejora el soporte de audio y video para Debian gracias a algunas licencias y 
al traer versiones más recientes de algunos programas. 


## Asteriscos en la terminal 
Para cuando necesite escribir la contraseña en la terminal me gustaría que aparecieran los asteriscos, para eso es necesario: 
```
sudo nano /etc/sudoers
```
En el apartado de `Defaults      env_reset` poner una coma después de esa variable y añadir `pwfeedback` quedando así: 
```
Defaults      env_reset,pwfeedback
```

## Firmware-linux-nonfree

Es un paquete que contiene el firmware privativo para una buena cantidad de hardware. Altamente recomendado para su instalación:

```
sudo apt install firmware-linux-nonfree
```

En el caso de tener una GPU de RADEON instalar:

```
sudo apt install firmware-amd-graphics
```
Muy util por cierto si tiene un hardware reciente de la compañia o si tiene problemas en algunos programas de edición como DavinciResolve.

Y si usted tiene una GPU **intel** le recomiendo adicionalmente que instale el siguiente paquete:

```
sudo apt install intel-media-va-driver-non-free
```
A grandes rasgos es una mejora en la decodificación/codificación de vídeo acelerada por hardware en varios puntos de entrada. La recomiendo en tanto es una version mas actualizada 
de su contraparte llamada *intel-media-va-driver* y que segun el [GitHub](https://github.com/intel/media-driver?tab=readme-ov-file#components-and-features) parece que esa no incluye componenetes privativos mientras su variante non-free si.

Hasta aquí son las configuraciones más básicas para una mejor experiencia en Debian. A continuación explicare los pasos para actualizar el kernel y la configuración para gaming.

# Configuracion de Lightdm y Grub

Bastante sencilla su configuracion, realmente por defecto esta bien pero en lo personal prefiero que aparezca de primeras al inicio mi usuario en vez de escribirlo manualmente. Para corregir esto:

```
sudo nano /etc/lightdm/lightdm.conf
```
Y buscar la linea para descomentarla:
```
greeter-hide-users=false
```
Ahora aparecerá nuestro usuario al inicio. En caso de necesitar mas configuraciones de inicio del sistema es muy recomendable usar el programa:
```
sudo apt install lightdm-gtk-greeter-settings
```

Para cambiar la resolucion del grub de inicio hay que buscar el archivo: 
```
sudo nano /etc/default/grub
```
Y en el apartado de:
```
#GRUB_GFXMODE=640x480
```
Hay que descomentarlo y proceder a establecer la resolución de su monitor.
También podemos quitar el plymouth buscando la linea:
```
GRUB_CMDLINE_LINUX_DEFAULT=""
```
Y dejarlo solo con comillas. 

## Tecla de inicio XFCE

En XFCE por defecto no funciona el atajo de presionar tecla de inicio, Windows o Super. Para que se despliegue dicho menú. Es necesario añadir el `whisker menu` dentro de la barra de tareas.
Una vez añadido ir a configuración general de XFCE o el `xfce4-settings-manager`. Una vez dentro ir a `teclado` y buscar la pestaña `Atajo de las aplicaciones`. Añadiremos una nueva cuya orden sera:
```
xfce4-popup-whiskermenu
```
Al momento de dar click en aceptar, nos pedira que presionemos una tecla para poder asignarla. Presione la tecla de inicio, Windows o Super.

# Instalar programas extra
Mis programas recomendados de momento son los siguientes. Recuerde que si tiene de escritorio a KDE o GNOME ya estan instalados algunos o sus correspondientes alternativas (para el caso de KDE):

```
sudo apt install lshw inxi hardinfo neofetch cpufetch cpu-x btop htop

sudo apt install vlc mpv

sudo apt install gdebi

sudo apt install arc-theme blackbird-gtk-theme

sudo apt install ttf-mscorefonts-installer

sudo apt install fonts-ubuntu

sudo apt install gparted

sudo apt install galculator

sudo apt install gnome-firmware

sudo apt install gnome-software gnome-package-updater

sudo apt install gnome-disk-utility 

sudo apt install gnome-text-editor 
```

## Programas backports recomendados
En mi caso es la selección personal de los mejores programas para tener en backports. Para instalar un paquete **backports** es de la siguiente forma:
```
sudo apt install -t bookworm-backports <package>
```
Siguiendo esta logica recomiendo los siguientes paquetes:
```
sudo apt install -t bookworm-backports libreoffice papirus-icon-theme telegram-desktop mesa-vulkan-drivers
```
Aqui se incluye la pila grafica de MESA. Muy importante para equipos nuevos y poder aprovechar el hardware moderno. 

Recuerde que también `pipewire` también es una excelente opción para su instalación. 

# Configuración Kernel, MESA y gaming
 
Para esta parte, es necesario recalcar que Debian por si mismo no ofrece el mas actualizado soporte de hardware en su version estable. En otras variantes si, pero no es el caso. 
Nosotros manualmente podemos modificar esto. Para el caso del kernel se plantean dos caminos a seguir que explico a continuación.

## Kernel
En primer lugar y como la opción mas sencilla y fácil que existe, es actualizar el kernel para que este a la par de los Backports de Debian.
Esto se puede realizar desde el **gestor de paquetes synaptic** y buscando el siguiente termino: **linux-image**. Despues, dentro de la inmensa cantidad de resultados que apareceran
nosotros tenemos que escoger la versión mas actualizada. Para la fecha de escritura de este articulo me topo con la version **linux-image-6.7.12+bpo-amd64**. Recuerde que la versión a instalar
en su pc es la que tenga dentro de su descripción **Linux X.X for 64-bit PCs**. Después proceda a marcar para instalar, espere unos momentos y reinicie su PC. Después de eso ya tendrá su Kernel actualizado.
 
![kernel]({{site.baseurl}}/assets/images/kernel67.png)

Como segunda opción esta la de usar los Customs Kernels. Vienen mucho mas actualizados en comparación al del repositorio de Debian y obtienen configuraciones especiales para jugar. 
Yo recomiendo tanto [XanMod](https://xanmod.org/) como [Liquorix](https://liquorix.net/).
Recuerde ver la guía de instalacion de los respectivos kernels además como comparativas de acuerdo a su necesidad. Aquí solo son mencionados como alternativas.

## MESA

MESA es la pila gráfica de Linux. En otras palabras, son los drivers de vídeo para el sistema que vienen a nivel de kernel siendo esta una descripcion hecha de forma muy vaga. Debian nunca los actualiza de por si, salvo una vez cada nueva versión lanzada.
En el caso de su 12 lanzamiento viene por defecto en la 22.3.6 la cual ya tiene un tiempo y es perfectamente funcional para jugar. Pero en el caso que desee aprovechar las mejoras de las nuevas versiones y el soporte para nuevo hardware. 
Anteriormente era necesario agregar un repositorio extra del tipo [PPA](https://salmorejogeek.com/2023/06/23/como-tener-la-ultima-version-de-mesa-en-debian-12-bookworm-rama-estable/) (que es exclusivo de Ubuntu) a Debian. Sin embargo, desde el mes de septiembre de 2024 tenemos ya disponible en los repos de backports una version actualizada de MESA. En el apartado de arriba podra encontrar como instalarlo. 

Puede confirmar la versión de MESA con el siguiente comando:
```
inxi -Gx
```

## Gaming
Para gaming es necesario activar el soporte de 32bits para algunos paquetes esenciales tanto de Steam como de otros programas y juegos. Adicionalmente instalar los paquetes de vídeo de 32bits que por defecto no vienen
instalados. 

```
sudo dpkg --add-architecture i386 && sudo apt update && sudo apt upgrade && sudo apt install libgl1-mesa-dri:i386 mesa-vulkan-drivers mesa-vulkan-drivers:i386
```

Ahora instalaremos otras herramientas como el gamemode, goverlay y mangohud. En ese orden, el primero es un modo especial para el procesador que se activa al momento de jugar. Goverlay es el software de control 
de mangohud y otras herramientas como VKBasalt (un efecto de nitidez extra para los juegos),Mesa-utils (demostraciones graficas en opengl) y las Vulkan-tools (demostraciones grafica con la api vulkan).
Mangohud por su parte es el programa que te mostrara los FPS, temperatura del hardware, uso de recursos, etc. Dentro de tus juegos. Lo mejor del caso pese a que vienen algo desactualizados, es que es muy fácil obtener todo con un simple:
```
sudo apt install goverlay mangohud gamemode
```
Recuerda entonces abrir el programa **Goverlay** y activar antes que nada el "Global Enable". Luego configura de acuerdo a los parámetros que necesites monitorizar. 

Como breve extra y solo disponible para aquellos con GPU Intel ya sea integrada o dedicada. Existe un programa para monitorizar desde la terminal la GPU de este fabricante con: 
```
sudo apt install intel-gpu-tools
```
Y luego proceder con el comando:

```
sudo intel_gpu_top
```
Para desplegar toda la información del motor de vídeo o de renderizado 3D por ejemplo.

Ahora procederemos con las instalación de Lutris. Un programa que nos ayudara a administrar nuestros juegos de múltiples plataformas. Para eso es necesario dirigirse al sitio web de las [descargas](https://lutris.net/downloads) e ir al apartado Debian. Una vez allí, proceder con los pasos de instalación indicados. Personalmente prefiero seleccionar el repo de openSUSE Build Service y hacerlo  manualmente. Luego abrir Lutris, esperar a que se instalen los recursos necesarios y con eso ya estará listo para su uso. 

Importante y de vital importancia es instalar Steam. La plataforma predilecta para jugar y que tambien esta muy comprometido con el desarrollo del gaming en linux. 
Su instalacion es muy simple, ir a su [sitio web](https://store.steampowered.com/about/) y descargar ese archivo. Instalarlo de manera gráfica o con un simple:
```
sudo dpkg -i steam_latest.deb
```
Después procederá con la instalación de todos los componentes necesarios para la plataforma de Valve. Recuerde activar **SteamPlay** para todos los titulos y bajar el Proton mas reciente. Despues de eso ya estara listo para jugar.


## Referencias: 

[https://linuxete.duckdns.org/repositorios-para-debian-12/](https://linuxete.duckdns.org/repositorios-para-debian-12/)

[https://wiki.debian.org/SourcesList](https://wiki.debian.org/SourcesList)

[https://salmorejogeek.com/2023/06/23/como-tener-la-ultima-version-de-mesa-en-debian-12-bookworm-rama-estable/](https://salmorejogeek.com/2023/06/23/como-tener-la-ultima-version-de-mesa-en-debian-12-bookworm-rama-estable/)

[https://github.com/lutris/docs/blob/master/InstallingDrivers.md](https://github.com/lutris/docs/blob/master/InstallingDrivers.md)

[https://github.com/fkortsagin/Simple-Debian-Setup](https://github.com/fkortsagin/Simple-Debian-Setup)

[https://wiki.debian.org/GraphicsCard](https://wiki.debian.org/GraphicsCard)

[https://wiki.debian.org/NvidiaGraphicsDrivers](https://wiki.debian.org/NvidiaGraphicsDrivers)

[https://wiki.debian.org/AtiHowTo](https://wiki.debian.org/AtiHowTo)

[https://wiki.debian.org/Steam](https://wiki.debian.org/Steam)

[https://www.youtube.com/watch?v=LGPO6tTHbNw](https://www.youtube.com/watch?v=LGPO6tTHbNw)
