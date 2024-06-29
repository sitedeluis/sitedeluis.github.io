---
layout: post
title:  "Configuracion para Debian 12"
author: "Luis"
tags: Ensayo
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
#Repo oficial no-free
deb https://ftp.debian.org/debian/ bookworm contrib main non-free non-free-firmware
#deb-src https://ftp.debian.org/debian/ bookworm contrib main non-free non-free-firmware

#Actualizaciones
deb https://ftp.debian.org/debian/ bookworm-updates contrib main non-free non-free-firmware
#deb-src https://ftp.debian.org/debian/ bookworm-updates contrib main non-free non-free-firmware
deb https://ftp.debian.org/debian/ bookworm-proposed-updates contrib main non-free non-free-firmware
#deb-src https://ftp.debian.org/debian/ bookworm-proposed-updates contrib main non-free non-free-firmware

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
Para instalarla es necesario ir al siguiente [link](https://deb-multimedia.org/dists/stable/main/binary-amd64/package/deb-multimedia-keyring) y descargar el archivo **.deb** luego procederemos
a la instalación con un:
```
sudo dpkg -i deb-multimedia-keyring_2016.8.1_all.deb
```
Una vez finalizado un simple: 

```
sudo apt update && sudo apt upgrade
```
Aplicará los cambios en el sistema teniendo ya las mejoras. No está demás añadir que el repo *multimedia* complementa y mejora el soporte de audio y video para Debian gracias a algunas licencias y 
al traer versiones más recientes de algunos programas. 

## IntelGPU

Si usted tiene una GPU **intel** le recomiendo adcionalmente que instale el siguiente paquete:

```
sudo apt install intel-media-va-driver-non-free
```
A grandes rasgos es una mejora en la decodificación/codificación de vídeo acelerada por hardware en varios puntos de entrada. La recomiendo en tanto es una version mas actualizada 
de su contraparte llamada *intel-media-va-driver* y que segun el [GitHub](https://github.com/intel/media-driver?tab=readme-ov-file#components-and-features) parece que esa no incluye componenetes privativos mientras su variante non-free si.

Hasta aquí son las configuraciones más básicas para una mejor experiencia en Debian. A continuación explicare los pasos para actualizar el kernel y la configuración para gaming.

# Configuracion Kernel, MESA y gaming
 
Para esta parte, es necesario recalcar que Debian por si mismo no ofrece el mas actualizado soporte de hardware en su version estable. En otras variantes si, pero no es el caso. 
Nosotros manualmente podemos modificar esto. Para el caso del kernel se plantean dos caminos a seguir que explico a continuacion.

## Kernel
En primer lugar y como la opcion mas sencilla y facil que existe, es actualizar el kernel para que este a la par de los Backports de Debian.
Esto se puede realizar desde el **gestor de paquetes synaptic** y buscando el siguiente termino: **linux-image**. Despues, dentro de la inmensa cantidad de resultados que apareceran
nosotros tenemos que escoger la version mas actualizada. Para la fecha de escritura de este articulo me topo con la version **linux-image-6.7.12+bpo-amd64**. Recuerde que la version a instalar
en su pc es la que tenga dentro de su descripcion **Linux X.X for 64-bit PCs**. Despues proceda a marcar para instalar, espere unos momentos y reinice su PC. Despues de eso ya tendra su Kernel actualizado.
 
![kernel]({{site.baseurl}}/assets/images/kernel67.png)

Como segunda opcion esta la de usar los Customs Kernels. Vienen mucho mas actualizados en comparacion al del repositorio de Debian y obtienen configuraciones especiales para jugar. 
Yo recomiendo tanto [XanMod](https://xanmod.org/) como [Liquorix](https://liquorix.net/).
Recuerde ver la guia de instalacion de los respectivos kernels ademas como comparativas de acuerdo a su necesidad. Aqui solo son mencionados como alternativas.

## MESA

MESA es la pila grafica de linux. En otras palabras, son los drivers de video para el sistema que vienen a nivel de kernel siendo esta una descripcion hecha de forma muy vaga. Debian nunca los actualiza de por si, salvo una vez cada nueva version lanzada.
En el caso de su 12 lanzamiento viene por defecto en la 22.3.6 la cual ya tiene un tiempo y es perfectamente funcional para jugar. Pero en el caso que desee aprovechar las mejoras de las nuevas versiones y el soporte para nuevo hardware. 
Es necesario agregar un repositorio extra del tipo PPA (que es exclusivo de ubuntu) a Debian. Para eso haremos lo siguiente:
```
sudo nano /etc/apt/sources.list.d/kisak-mesa.list
```
Dentro de ese archivo debemos agregar esta linea:
```
deb https://ppa.launchpadcontent.net/kisak/kisak-mesa/ubuntu jammy main
```
Añadiremos la key del repo:
```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys F63F0F2B90935439
```
Ahora reubicaremos la key:
```
sudo cp /etc/apt/trusted.gpg /etc/apt/trusted.gpg.d
```
Actualizamos el sistema:
```
sudo apt update && sudo apt upgrade
```
Puede confirmar la version de MESA con el siguiente comando:
```
inxi -Gx
```

## Gaming
Para gaming es necesario activar el soporte de 32bits para algunos paquetes escenciales tanto de steam como de otros programas y juegos. Adicionalmente instalar los paquetes de video de 32bits que por defecto no vienen
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
Para desplegar toda la info del motor de vídeo o de renderizado 3D por ejemplo.


Ahora procederemos con las instalación de Lutris. Un programa que nos ayudara a administrar nuestros juegos de múltiples plataformas. Para eso es necesario dirigirse al sitio web de las [descargas](https://lutris.net/downloads) e ir al apartado Debian. Una vez allí, proceder con los pasos de instalación indicados. Personalmente prefiero seleccionar el repo de openSUSE Build Service y hacerlo  manualmente. Luego abrir Lutris, esperar a que se instalen los recursos necesarios y con eso ya estará listo para su uso. 

Importante y de vital importancia es instalar Steam. La plataforma predilecta para jugar y que tambien esta muy comprometido con el desarrollo del gaming en linux. 
Su instalacion es muy simple, ir a su [sitio web](https://store.steampowered.com/about/) y descargar ese archivo. Instalarlo de manera gráfica o con un simple:
```
sudo dpkg -i steam_latest.deb
```
Después procederá con la instalación de todos los componentes necesarios para la plataforma de Valve. Recuerde activar **SteamPlay** para todos los titulos y bajar el Proton mas reciente. Despues de eso ya estara listo para jugar.


## Referencias: 

https://linuxete.duckdns.org/repositorios-para-debian-12/

https://wiki.debian.org/SourcesList

https://salmorejogeek.com/2023/06/23/como-tener-la-ultima-version-de-mesa-en-debian-12-bookworm-rama-estable/

https://github.com/lutris/docs/blob/master/InstallingDrivers.md

https://github.com/fkortsagin/Simple-Debian-Setup

https://wiki.debian.org/GraphicsCard

https://wiki.debian.org/NvidiaGraphicsDrivers

https://wiki.debian.org/AtiHowTo

https://wiki.debian.org/Steam

https://www.youtube.com/watch?v=LGPO6tTHbNw
