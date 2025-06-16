---
layout: post
title:  "Configuracion para Debian 12"
author: "Luis"
tags: Ensayo
comments: true
---

Estas son las configuraciones básicas que aplico al momento de instalar Debian en cualquier máquina. A nivel general se trata de los repositorios backports y los añadidos `non-free` y `non-free-firmware` para mayor soporte de hardware. Adicionalmente, algunas cosas para un mejor soporte de multimedia y juegos. En el primer apartado encontrara lo mas básico para una óptima experiencia dentro del sistema gracias a la añadidura de algunos extras. Posteriormente encontrara la respectiva configuración personalizada enfocada en el gaming.

## Añadir el usuario como root
Primero necesitamos acceder al archivo `sudoers`:
```
su
```
Luego ingresamos:
```
nano /etc/sudoers
```

Buscamos el apartado:
```
username ALL=(ALL:ALL) ALL
```
Y ahora añadiremos nuestro usuario:
```
username ALL=(ALL:ALL) ALL
#usuario ALL=(ALL:ALL) ALL
```

## Asteriscos en la terminal

Para cuando necesite escribir la contraseña en la terminal me gustaría que aparecieran los asteriscos, para eso es necesario dentro del mismo documento en el apartado de `Defaults      env_reset` poner una coma después de esa variable y añadir `pwfeedback` quedando así:
```
Defaults      env_reset,pwfeedback
```

## Modificar repositorios Debian 12
Primero, necesitamos configurar el archivo *sources.list* con el siguiente comando:
```
sudo nano /etc/apt/sources.list
```

Una vez allí procedemos a añadir:

```
#Repo oficial
deb https://deb.debian.org/debian bookworm main contrib non-free non-free-firmware
#deb-src https://deb.debian.org/debian bookworm main contrib non-free non-free-firmware

#Actualizaciones
deb https://deb.debian.org/debian bookworm-updates main contrib non-free non-free-firmware
#deb-src https://deb.debian.org/debian bookworm-updates main contrib non-free non-free-firmware

#Seguridad
deb https://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
#deb-src https://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware

#Backports
deb https://deb.debian.org/debian bookworm-backports main contrib non-free non-free-firmware
#deb-src https://deb.debian.org/debian bookworm-backports main contrib non-free non-free-firmware
```

Para añadir el repositorio multimedia crearemos un repo.list en la dirección `cd /etc/apt/sources.list.d`:
```
sudo touch multimedia.list
sudo nano multimedia.list
```
Una vez dentro añadir:

```
#Multimedia
deb https://www.deb-multimedia.org bookworm main non-free
```
Y continuamos a guardar los cambios. Podremos actualizar los repositorios, sin embargo, nos arrojará un error debido a la falta de la key para el repositorio multimedia.
Para instalarla es necesario ir al siguiente [link](https://deb-multimedia.org/dists/stable/main/binary-amd64/package/deb-multimedia-keyring) y descargar el archivo **.deb**. Por consola también podremos realizar la instalación mediante un:
```
sudo wget https://deb-multimedia.org/pool/main/d/deb-multimedia-keyring/deb-multimedia-keyring_2024.9.1_all.deb
sudo dpkg -i deb-multimedia-keyring_2024.9.1_all.deb
```
Una vez finalizado un simple:

```
sudo apt update && sudo apt upgrade
```
Aplicará los cambios en el sistema teniendo ya las mejoras. No está demás añadir que el repositorio *multimedia* complementa y mejora el soporte de audio y vídeo para Debian gracias a algunas licencias y al traer versiones más recientes de algunos programas.

## Habilitar paquetería 32 bits

Ya sea para jugar o para instalar ciertos drivers o incluso algunos programas, se necesita de paquetes en 32 bits. Para habilitarlos solo es necesario:
```
sudo dpkg --add-architecture i386
```

## Firmware-linux-nonfree

Es un paquete que contiene el firmware privativo para una buena cantidad de hardware. Altamente recomendado para su instalación:

```
sudo apt install firmware-linux-nonfree
```
## Drivers GPU RADEON

Como tal el paquete `mesa-va-drivers` en su version 22.3.6 ya tiene la aceleración gráfica para aplicaciones [3D](https://wiki.debian.org/Mesa) y juegos tanto para intel como para AMD, así como el soporte de la decodificación y codificación de [hardware](https://wiki.debian.org/HardwareVideoAcceleration) para el caso exclusivo de GPUs de AMD Radeon. Por eso no es necesario instalar en principio nada mas salvo que requiera de aplicaciones especificas como DavinciResolve o la necesidad de usar ROCm e incluso algún soporte de GPU nueva. Para ello instalar el siguiente paquete:
```
sudo apt install firmware-amd-graphics
```
Recuerde que también esta disponible dentro de backports por si en dado caso tiene problemas de compatibilidad con [hardware nuevo](https://www.reddit.com/r/linux_gaming/comments/889nwv/amd_driver_situation_overview/).

Como añadido puede instalar el paquete:
```
sudo apt install radeontop
```
Para hacer monitorizacion de su gpu radeon, soporta una gran cantidad de hardware, entre los detalles que encontrara la utilización de la tubería de gráficos, el motor de eventos, caché de vértice, dirección de textura y caché, las unidades shader y muchas cosas mas.

## Decodificacion y Codificacion GPU Intel
Si bien `mesa-va-drivers` ya le da soporte al renderizado 3D de su GPU Intel no ocurre lo mismo para el uso de [VA-API](https://es.wikipedia.org/wiki/Video_Acceleration_API) o Quick Sync. Se necesita de cierta paqueteria extra para hacer de su uso.
Si usted tiene una GPU **intel** primero debe identificar la generación de su igpu con el programa `intel_gpu_top`. Con este programa adicionalmente puede ver la información del motor de vídeo o de renderizado 3D por ejemplo. Para eso instale:
```
sudo apt install intel-gpu-tools
```
Y luego ejecute:
```
sudo intel_gpu_top
```
En la parte superior de su terminal encontrara la referencia exacta de que generación es su iGPU, en mi caso como puede ver se trata de una séptima generación:
![Texto alternativo]({{site.baseurl}}/assets/images/intel_igpu.png)

A modo de sintetizar si usted tiene una iGPU Gen7 o anterior debe instalar el paquete:
```
sudo apt install i965-va-driver-shaders
```
A partir de Gen8 o mas instale el paquete:
```
sudo apt install intel-media-va-driver-non-free
```
El soporte de i965 como tal ya finalizo y ahora Intel se centra en el `media-va-driver`. Por eso recomiendo esta ultima ante todo pese a que con i965 tiene soporte hasta las iGPUs de octava, novena y décima generación. En caso de no tener la codificación y la decodificación instalarlo, de lo contrario mantener el ultimo.

Lo que hace a grandes rasgos en ambos paquetes es que habilita la decodificación/codificación de vídeo acelerada por hardware en varios puntos de entrada. La recomiendo en tanto es una versión mas actualizada  de su contraparte llamada *intel-media-va-driver* y que según el [GitHub](https://github.com/intel/media-driver?tab=readme-ov-file#components-and-features) parece que esa no incluye componentes privativos mientras su variante non-free si.

Por ultimo para el soporte de [chromium](https://wiki.debian.org/Chromium#Video_acceleration) y la aceleración de hardware además de haber instalado alguno de los paquetes anteriores, instalar:
```
sudo apt install libva-drm2 libva-x11-2
```

## Drivers GPU NVIDIA

En el caso de tener una GPU de NVIDIA por favor revisar la [documentación](https://wiki.debian.org/NvidiaGraphicsDrivers) e instalar el driver empaquetado por Debian, recuerde leer sobre la [compatibilidad](https://us.download.nvidia.com/XFree86/Linux-x86_64/535.183.01/README/supportedchips.html) de su GPU. Adicional de tener toda la potencia de renderizado 3D con ese paquete debería tener también la posibilidad de usar el codificador y el decodificador en las aplicaciones que lo requieran como OBS. En principio dicha instalación se puede resumir en primero, instalar el detector de gpus de nvidia:
```
sudo apt install nvidia-detect
```
Y ahora ejecutar:
```
nvidia-detect
```
Donde nos debería aparecer una información como esta:
```
Detected NVIDIA GPUs:
01:00.0 3D controller [0302]: NVIDIA Corporation GM108M [GeForce 940MX] [10de:134d) (rev a2)

Checking card:
NVIDIA Corporation GM108M [GeForce 940MX) (rev a2)
Your card is supported by all driver versions.
Your card is also supported by the Tesla 470 drivers series.
It is recommended to install the
  nvidia-driver
package
```
Una vez detectada la gpu y viendo si tiene soporte para el `Driver Version 535.183.01` debemos ejecutar:
```
sudo apt install nvidia-driver firmware-misc-nonfree
```
Si todo sale bien, después de unos segundos debería aparecer el recuadro en la terminal informando sobre la configuración del servidor Xorg y el conflicto con el modulo del kernel, presione `ok`. Una vez terminado todo, reinicie el equipo, cargue su sesión en X11 (wayland es prácticamente imposible de usar con nvidia). Luego ejecute en la terminal para tener informacion de su grafica y el driver instalado:
```
nvidia-smi
```
Por otro lado, si desea tener monitorización de su gpu puede instalar:
```
sudo apt install nvtop
```
Y ejecutarlo con el comando `nvtop` para obtener información en tiempo real. También es compatible con gráficas Radeon.

Por ultimo para poder usar VA-API con GPU NVIDIA en [Firefox](https://wiki.debian.org/Firefox#Hardware_Video_Acceleration) necesita instalar el paquete:
```
sudo apt install nvidia-vaapi-driver
```
## Confirmar aceleracion por hardware VA-API
Debemos instalar VAINFO para obtener dicha informacion:
```
sudo apt install vainfo
```
Una vez instalado lo ejecutamos con un simple:
```
vainfo
```
Donde nos deberá devolver información sobre la decodificación y codificación acelerada por hardware de su equipo:
```
libva info: VA-API version 1.17.0
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/radeonsi_drv_video.so
libva info: Found init function __vaDriverInit_1_17
libva info: va_openDriver() returns 0
vainfo: VA-API version: 1.17 (libva 2.12.0)
vainfo: Driver version: Mesa Gallium driver 25.0.4-1~bpo12+1 for AMD Radeon RX 6600 (radeonsi, navi23, LLVM 15.0.6, DRM 3.61, 6.12.27+bpo-amd64)
vainfo: Supported profile and entrypoints
      VAProfileMPEG2Simple            : VAEntrypointVLD
      VAProfileMPEG2Main              : VAEntrypointVLD
      VAProfileVC1Simple              : VAEntrypointVLD
      VAProfileVC1Main                : VAEntrypointVLD
      VAProfileVC1Advanced            : VAEntrypointVLD
      VAProfileH264ConstrainedBaseline: VAEntrypointVLD
      VAProfileH264ConstrainedBaseline: VAEntrypointEncSlice
      VAProfileH264Main               : VAEntrypointVLD
      VAProfileH264Main               : VAEntrypointEncSlice
      VAProfileH264High               : VAEntrypointVLD
      VAProfileH264High               : VAEntrypointEncSlice
      VAProfileHEVCMain               : VAEntrypointVLD
      VAProfileHEVCMain               : VAEntrypointEncSlice
      VAProfileHEVCMain10             : VAEntrypointVLD
      VAProfileHEVCMain10             : VAEntrypointEncSlice
      VAProfileJPEGBaseline           : VAEntrypointVLD
      VAProfileVP9Profile0            : VAEntrypointVLD
      VAProfileVP9Profile2            : VAEntrypointVLD
      VAProfileAV1Profile0            : VAEntrypointVLD
      VAProfileNone                   : VAEntrypointVideoProc
```
Como puede ver en mi caso, esta Radeon RX 6600 ofrece codificación y codificación de MPEG2, H.264, H.265, VP9, VC-1 y el moderno AV1. Lo que es conforme a las especificaciones de hardware. Aquí puede encontrar una lista con todas las GPUs en general y su soporte de codecs:

- [Intel](https://en.wikipedia.org/wiki/Intel_Graphics_Technology#) donde tambien tendriamos [Quick Sync](https://en.wikipedia.org/wiki/Intel_Quick_Sync_Video).

- En Radeon tenemos como tal dos "eras". La primera consta del decodificador [Radeon UVD](https://en.wikipedia.org/wiki/Unified_Video_Decoder) y el codificador [Radeon VCE](https://en.wikipedia.org/wiki/Video_Coding_Engine). A partir de 2018 todo cambia al moderno [Radeon VCN](https://en.wikipedia.org/wiki/Video_Core_Next) que es como se le conoce a todo el procesamiento de vídeo.

- En NVIDIA la cosa no ha cambiado mucho, por un lado [Nvidia NVENC](https://en.wikipedia.org/wiki/Nvidia_NVENC) que se encarga de la codificación y [Nvidia NVDEC](https://en.wikipedia.org/wiki/Nvidia_NVDEC) para decodificar.


## Configuracion de Lightdm y Grub

Bastante sencilla su configuración, realmente por defecto esta bien pero en lo personal prefiero que aparezca de primeras al inicio mi usuario en vez de escribirlo manualmente. Para corregir esto:

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
Al momento de dar clic en aceptar, nos pedirá que presionemos una tecla para poder asignarla. Presione la tecla de inicio, Windows o Super.

## Funcionalidad extra Nautilus

Nautilus es el gestor de archivos por defecto en GNOME.En caso que en el menu de preferencias no le permita agregar el botón de "Abrir en terminal" y "Abrir como administrador". Puede añadirlo con:
```
sudo apt-get install nautilus-open-terminal
```
Y:
```
sudo apt install nautilus-admin
```

## Extensiones GNOME:

Para instalarlas recuerde añadir a Firefox la extensión [GNOME Shell integration](https://addons.mozilla.org/en-US/firefox/addon/gnome-shell-integration/). Las extensiones recomendadas para GNOME son las siguientes:

- [Dash to Dock](https://extensions.gnome.org/extension/307/dash-to-dock/)

- [OpenWeather](https://extensions.gnome.org/extension/750/openweather/)

- [Blur my Shell](https://extensions.gnome.org/extension/3193/blur-my-shell/)

- [Quick Settings Tweaks](https://extensions.gnome.org/extension/5446/quick-settings-tweaker/)

- [AppIndicator and KStatusNotifierItem Support ](https://extensions.gnome.org/extension/615/appindicator-support/)

- [Gtk4 Desktop Icons NG (DING)](https://extensions.gnome.org/extension/5263/gtk4-desktop-icons-ng-ding/)

- [Vitals](https://extensions.gnome.org/extension/1460/vitals/)

## Instalar programas extra
Mis programas recomendados de momento son los siguientes. No esta demás recomendar encarecidamente la instalación de [Firefox Stable](https://support.mozilla.org/en-US/kb/install-firefox-linux#w_install-firefox-deb-package-for-debian-based-distributions-recommended). Recuerde que si tiene de escritorio a KDE o GNOME ya están instalados algunos o sus correspondientes alternativas:

```
sudo apt install lshw inxi hardinfo neofetch cpufetch cpu-x btop htop

sudo apt install vlc mpv

sudo apt install chromium

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
Siguiendo esta lógica recomiendo los siguientes paquetes:
```
sudo apt install -t bookworm-backports libreoffice papirus-icon-theme telegram-desktop mesa-vulkan-drivers pipewire
```
Aquí se incluye la pila gráfica de MESA. Muy importante para equipos nuevos y poder aprovechar el hardware moderno así como de optimizaciones generales.

Recuerde que también `pipewire` también es una excelente opción para su instalación en todo el tema del sonido, por defecto se usa en GNOME.

## Configuración Kernel, MESA y gaming

Para esta parte, es necesario recalcar que Debian por si mismo no ofrece el mas actualizado soporte de hardware en su versión estable. En otras variantes si, pero no es el caso.
Nosotros manualmente podemos modificar esto. Para el caso del kernel se plantean dos caminos a seguir que explico a continuación.

## Kernel
En primer lugar y como la opción mas sencilla y fácil que existe, es actualizar el kernel para que este a la par de los Backports de Debian.
Esto se puede realizar desde el **gestor de paquetes synaptic** y buscando el siguiente termino: **linux-image**. Despues, dentro de la inmensa cantidad de resultados que apareceran
nosotros tenemos que escoger la versión mas actualizada. Para la fecha de escritura de este articulo me topo con la version **linux-image-6.7.12+bpo-amd64**. Recuerde que la versión a instalar
en su pc es la que tenga dentro de su descripción **Linux X.X for 64-bit PCs**. Después proceda a marcar para instalar, espere unos momentos y reinicie su PC. Después de eso ya tendrá su Kernel actualizado.

![kernel]({{site.baseurl}}/assets/images/kernel67.png)

Como segunda opción esta la de usar los Customs Kernels. Vienen mucho mas actualizados en comparación al del repositorio de Debian y obtienen configuraciones especiales para jugar.
Yo recomiendo tanto [XanMod](https://xanmod.org/) como [Liquorix](https://liquorix.net/).
Recuerde ver la guía de instalación de los respectivos kernels además como comparativas de acuerdo a su necesidad. Aquí solo son mencionados como alternativas.

## MESA

MESA es la pila gráfica de Linux. En otras palabras, son los drivers de vídeo para el sistema que vienen a nivel de kernel siendo esta una descripción hecha de forma muy vaga. Debian nunca los actualiza de por si, salvo una vez cada nueva versión lanzada.
En el caso de su 12 lanzamiento viene por defecto en la 22.3.6 la cual ya tiene un tiempo y es perfectamente funcional para jugar. Pero en el caso que desee aprovechar las mejoras de las nuevas versiones y el soporte para nuevo hardware puede ser algo limitante.
Anteriormente era necesario agregar un repositorio extra del tipo [PPA](https://salmorejogeek.com/2023/06/23/como-tener-la-ultima-version-de-mesa-en-debian-12-bookworm-rama-estable/) (que es exclusivo de Ubuntu) a Debian. Sin embargo, desde el mes de septiembre de 2024 tenemos ya disponible en los repos de backports una version actualizada de MESA. En el apartado de arriba podrá encontrar como instalarlo.

Puede confirmar la versión de MESA con el siguiente comando:
```
inxi -Gx
```

## Gaming
Para gaming es necesario activar el soporte de 32bits para algunos paquetes esenciales tanto de Steam como de otros programas y juegos. Adicionalmente instalar los paquetes de vídeo de 32bits que por defecto no vienen instalados.

```
sudo dpkg --add-architecture i386 && sudo apt update && sudo apt upgrade && sudo apt install libgl1-mesa-dri:i386 mesa-vulkan-drivers mesa-vulkan-drivers:i386
```

Ahora instalaremos otras herramientas como el gamemode, goverlay y mangohud. En ese orden, el primero es un modo especial para el procesador que se activa al momento de jugar. Goverlay es el software de control de mangohud y otras herramientas como VKBasalt (un efecto de nitidez extra para los juegos),Mesa-utils (demostraciones graficas en opengl) y las Vulkan-tools (demostraciones grafica con la api vulkan).
Mangohud por su parte es el programa que te mostrara los FPS, temperatura del hardware, uso de recursos, etc. Dentro de tus juegos. Lo mejor del caso pese a que vienen algo desactualizados, es que es muy fácil obtener todo con un simple:
```
sudo apt install goverlay mangohud gamemode
```
Recuerda entonces abrir el programa **Goverlay** y activar antes que nada el "Global Enable". Luego configura de acuerdo a los parámetros que necesites monitorizar.

Ahora procederemos con las instalación de Lutris. Un programa que nos ayudara a administrar nuestros juegos de múltiples plataformas. Para eso es necesario dirigirse al sitio web de las [descargas](https://lutris.net/downloads) e ir al apartado Debian. Una vez allí, proceder con los pasos de instalación indicados. Personalmente prefiero seleccionar el repo de openSUSE Build Service y hacerlo  manualmente de la siguiente forma:
```
echo "deb [signed-by=/etc/apt/keyrings/lutris.gpg] https://download.opensuse.org/repositories/home:/strycore/Debian_12/ ./" | sudo tee /etc/apt/sources.list.d/lutris.list > /dev/null
```
Luego:
```
wget -q -O- https://download.opensuse.org/repositories/home:/strycore/Debian_12/Release.key | gpg --dearmor | sudo tee /etc/apt/keyrings/lutris.gpg > /dev/null
```
Actualizamos paquetes:
```
sudo apt update
```
E instalamos manualmente:
```
sudo apt install lutris
```
Luego abrir Lutris, esperar a que se instalen los recursos necesarios y con eso ya estará listo para su uso. Esta versión es mas actual que la de los repos de Debian.

Importante y de vital importancia es instalar Steam. La plataforma predilecta para jugar y que también esta muy comprometido con el desarrollo del gaming en linux.
Su instalación es muy simple, ir a su [sitio web](https://store.steampowered.com/about/) y descargar ese archivo. Instalarlo de manera gráfica o con un simple:
```
sudo dpkg -i steam_latest.deb
```
Después procederá con la instalación de todos los componentes necesarios para la plataforma de Valve. Recuerde activar **SteamPlay** para todos los titulos y bajar el Proton mas reciente. Despues de eso ya estará listo para jugar.


## Referencias:

[https://linuxete.duckdns.org/repositorios-para-debian-12/](https://linuxete.duckdns.org/repositorios-para-debian-12/)

[https://wiki.debian.org/SourcesList](https://wiki.debian.org/SourcesList)

[https://salmorejogeek.com/2023/06/23/como-tener-la-ultima-version-de-mesa-en-debian-12-bookworm-rama-estable/](https://salmorejogeek.com/2023/06/23/como-tener-la-ultima-version-de-mesa-en-debian-12-bookworm-rama-estable/)

[https://github.com/lutris/docs/blob/master/InstallingDrivers.md](https://github.com/lutris/docs/blob/master/InstallingDrivers.md)

[https://github.com/fkortsagin/Simple-Debian-Setup](https://github.com/fkortsagin/Simple-Debian-Setup)

[https://wiki.debian.org/GraphicsCard](https://wiki.debian.org/GraphicsCard)

[https://wiki.debian.org/NvidiaGraphicsDrivers](https://wiki.debian.org/NvidiaGraphicsDrivers)

[https://wiki.debian.org/AtiHowTo](https://wiki.debian.org/AtiHowTo)

[https://www.x.org/wiki/RadeonFeature/](https://www.x.org/wiki/RadeonFeature/ )

[https://wiki.debian.org/HardwareVideoAcceleration](https://wiki.debian.org/HardwareVideoAcceleration)

[https://wiki.debian.org/Steam](https://wiki.debian.org/Steam)

[https://en.wikipedia.org/wiki/Direct_Rendering_Manager#Hardware_support](https://en.wikipedia.org/wiki/Direct_Rendering_Manager#Hardware_support)

[https://geekistheway.com/2022/12/23/setting-up-intel-gpu-passthrough-on-proxmox-lxc-containers/](https://geekistheway.com/2022/12/23/setting-up-intel-gpu-passthrough-on-proxmox-lxc-containers/)

[https://geekistheway.com/wp-content/uploads/2022/12/Intel_graphics#cite_note-2](https://geekistheway.com/wp-content/uploads/2022/12/Intel_graphics#cite_note-2)

[https://fostips.com/hardware-acceleration-firefox-ubuntu-debian/](https://fostips.com/hardware-acceleration-firefox-ubuntu-debian/)

[https://www.reddit.com/r/debian/comments/rl9nz4/hardware_acceleration_in_firefox/](https://www.reddit.com/r/debian/comments/rl9nz4/hardware_acceleration_in_firefox/)

[https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units)

[https://en.wikipedia.org/wiki/Intel_Graphics_Technology#Capabilities_(GPU_video_acceleration)](https://en.wikipedia.org/wiki/Intel_Graphics_Technology#Capabilities_(GPU_video_acceleration))

[https://www.antixforum.com/forums/topic/intel-discontinues-vaapi-driver-support-for-haswell-2013-and-older/](https://www.antixforum.com/forums/topic/intel-discontinues-vaapi-driver-support-for-haswell-2013-and-older/)

[https://www.reddit.com/r/debian/comments/t4qevg/name_of_nonfree_module_for_intel_gpus/](https://www.reddit.com/r/debian/comments/t4qevg/name_of_nonfree_module_for_intel_gpus/)

[https://www.reddit.com/r/linux_gaming/comments/889nwv/amd_driver_situation_overview/](https://www.reddit.com/r/linux_gaming/comments/889nwv/amd_driver_situation_overview/)

[https://www.reddit.com/r/linux_gaming/comments/97td3d/what_is_mesa/](https://www.reddit.com/r/linux_gaming/comments/97td3d/what_is_mesa/)

[https://www.kali.org/docs/general-use/install-nvidia-drivers-on-kali-linux/](https://www.kali.org/docs/general-use/install-nvidia-drivers-on-kali-linux/)

[https://www.youtube.com/watch?v=LGPO6tTHbNw](https://www.youtube.com/watch?v=LGPO6tTHbNw)

