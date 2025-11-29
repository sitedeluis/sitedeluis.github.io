---
layout: post
title: "Tutoriales y usos recomendados para la Raspberry Pi"
author: "Luis"
tags: Ensayo
comments: true
---

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/meme_rapsberry.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

Lo que empezó como un intento de hacer una simple guía referencial de Raspberry se ha extendido, a razón de la cantidad de palabras, superior al límite que Discord puede enviar. Con vista a mantener cierta coherencia, me vi en la obligación de replantear todo de formas más organizadas y algo más centradas en el blog. Dicho esto, te presento esta colección: no es una guía como tal, sino una "guía de guías". Mi intención es recopilar y comentar una serie de tutoriales para Raspberry Pi que uso recurrentemente y que considero imprescindibles, para así guiarte hacia proyectos realmente interesantes. Antes de empezar, un par de consejos fundamentales: por favor, para flashear las imágenes en tu Raspberry Pi siempre descárguelas manualmente en un PC y luego flaséalas. Evita usar la opción "descargar de internet y flashear" y verifica por ti mismo la integridad de la descarga. Además, asegúrate de que tu SBC esté bien refrigerada y cuente con una fuente de alimentación de calidad. Igualmente, te recomiendo encarecidamente la EXCELENTE <a href="https://www.raspberrypi.com/documentation/computers/getting-started.html#setting-up-your-raspberry-pi" target="_blank">documentacion oficial de la Raspberry Pi</a> para consultar detalles específicos.
<br>
<br>

# Tabla de Contenido
- [Server de minecraft (Java Edition)](#server-de-minecraft-java-edition)
- [Consola Retro](#consola-retro)
- [Centro multimedia](#centro-multimedia)
- [Server multimedia para pelis](#server-multimedia-para-pelis)
- [Servidor NAS](#servidor-nas)
- [Pi-Hole](#pi-hole)
- [Servidor VPN](#servidor-vpn)
- [Home Assistant OS](#home-assistant-os)
- [Estación meteorológica](#estación-meteorológica)
- [Servidor Web](#servidor-web)
- [Servidor Torrent/Seedbox](#servidor-torrentseedbox)
- [Servidor de impresión](#servidor-de-impresión)
- [Servidor de Gitea](#servidor-de-gitea)
- [Juegos en repositorios](#juegos-en-repositorios)
- [Sistema de vigilancia](#sistema-de-vigilancia)
- [Bot de notificaciones](#bot-de-notificaciones)
- [Servidor de Mensajería Instantánea Matrix](#servidor-de-mensajería-instantánea-matrix)
- [Nodo IPFS](#nodo-ipfs)
- [Cluster de Computación Paralela (MPI y BOINC)](#cluster-de-computación-paralela-mpi-y-boinc)
- [Proyectos Raspberry Pi](#proyectos-raspberry-pi)
<br>
<br>
<br>


## Server de minecraft (Java Edition)

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/RaspberryPiMinecraft.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

Es posible transformar tu Raspberry Pi en un servidor de Minecraft: Java Edition, lo que te permite jugar con amigos en tu propia red o a través de Internet. No obstante, es crucial considerar las limitaciones de hardware, especialmente la RAM y la potencia del CPU, para garantizar una experiencia de juego aceptable. Es posible tirarlo relativamente bien segun este <a href="https://www.youtube.com/watch?v=0YAnvz6il68" target="_blank">video</a> (por favor, revise los comentarios, algunos dan sugerencias interesantes y actualizadas de como mejorar el trashgarbage de java y configs de papermc). En general podemos decir que de acuerdo a la cantidad de recursos es posible hacer un server solvente. Aqui van las principales recomendaciones:
- <a href="https://raspberrytips.es/minecraft-servidor-raspberry-pi/" target="_blank">Tutorial general:</a> Esta es la guía de texto más completa y es la base de las mejores prácticas. Es crucial porque recomienda usar PaperMC en lugar del servidor oficial. PaperMC está optimizado para funcionar mejor con los recursos limitados de la Raspberry Pi, lo que aborda directamente las preocupaciones sobre las limitaciones de hardware mencionadas en el video. El tutorial cubre todos los pasos: desde la instalación del sistema operativo (Raspberry Pi OS Lite) y la configuración de Java, hasta la personalización de los archivos (server.properties, paper.yml) y la gestión avanzada con plugins (como Essentials y LuckPerms), scripts de inicio, y el uso de screen para que el servidor siga corriendo. Es esencial seguir esta guía para lograr un servidor solvente y funcional.

- <a href="https://www.youtube.com/watch?v=w-tQVrt2ZJc" target="_blank">Config algo mas avanzada:</a> Este video tutorial es una excelente continuación de la guía general. Aunque se enfoca en Ubuntu (una distribución Linux similar a Raspberry Pi OS Lite), la metodología y los comandos son altamente aplicables a la Pi. Su principal valor reside en mostrar cómo configurar el servidor como un servicio de systemd, lo que garantiza que el servidor siempre se inicie automáticamente al encender la Pi y se reinicie solo en caso de fallos. También incluye la configuración del firewall (UFW) y la herramienta MCRCON para la administración remota de la consola, aspectos cruciales para un servidor estable y profesional.

- <a href="https://secretmustache.com/blog/2025/01/raspberry-pi-mincraft-server/" target="_blank">Configuracion simple con temurin:</a> El principal valor de esta guía es su enfoque en la instalación optimizada de Java. Muestra cómo descargar e instalar Temurin (Adoptium) OpenJDK 21 directamente, que a menudo es más eficiente que la versión predeterminada del sistema. Además, combina los puntos fuertes de los otros tutoriales al incluir: 1) La instalación de PaperMC. 2) El uso de *screen* para que el servidor siga corriendo en segundo plano. 3) La configuración como un servicio systemd para el auto-inicio, con un archivo de servicio que envía el comando stop de manera limpia. Úsala si buscas una instalación de Java de alto rendimiento o necesitas una referencia concisa que combine las técnicas de automatización con screen y systemd."

- <a href="https://www.reeceyang.xyz/setting-up-a-paper-minecraft-server-on-the-raspberry-pi-3" target="_blank">Recomendaciones para raspberry pi 3:</a> Este es el tutorial clave si tienes una Raspberry Pi 3 (o cualquier modelo con solo 1 GB de RAM). Su mayor aporte es la implementación de las 'Aikar’s Flags' (banderas de optimización de JVM) modificadas. Estas son una serie de parámetros avanzados de Java esenciales para exprimir el máximo rendimiento y estabilidad (15-20 TPS) en hardware muy limitado. Es la mejor guia o referencia en caso de que no dispones de una Pi 4 o 5.


- <a href="https://www.linuxnorth.org/minecraft/#Step%204%20-%20Configure%20your%20new%20PaperMC%20Minecraft%20Server" target="_blank">Mejoras en papermc:</a> Este tutorial es imprescindible para aprender a exprimir el rendimiento y la gestión del servidor. Aunque se enfoca en una versión de Minecraft/Java más antigua y tecnicamente la guia esta abandonada, su metodología sigue siendo la mejor práctica. Sobre todo destaco el lado de las Aikar’s Flags (Manejo de JVM) pues proporciona la configuración completa como una alternativa a los parámetros simples de RAM, esencial para reducir el lag en sistemas limitados. La pre-generación del mundo con Chunky pues detalla el proceso con el plugin de Chunky para generar los chunks del mundo con antelación, que es la mejora de rendimiento más significativa para cualquier Raspberry Pi. El endurecimiento (Hardening) y Whitelist, para cubrir la seguridad básica al exponer el servidor a Internet (habilitar whitelist) y por ultimo, un sistema de backups con cron con un script completo para crear un sistema de copias de seguridad automático con rotación de 7 días.


- <a href="https://docs.papermc.io/paper/reference/configuration/" target="_blank">Configuracion del mundo:</a> Este es el recurso de referencia fundamental y la fuente oficial de PaperMC. Es indispensable para la configuración avanzada y la optimización. Su principal valor es el detalle sobre la Configuración por Mundo (paper-world.yml) y la herencia de valores. Esto es vital si planeas usar el plugin Multiverse para múltiples mundos (Overworld, Nether, The End, mundo de recursos, etc.) y ajustar las tasas de spawn de mobs o el comportamiento del loot de forma diferente para cada mundo, lo que es clave para el rendimiento en una Raspberry Pi.

- <a href="https://pimylifeup.com/raspberry-pi-minecraft-server/" target="_blank">Guía Completa (Pi 4/5 y Actualizaciones):</a> Este tutorial es una excelente guía general y actualizada (Agosto 2024) que aborda el proceso completo de) principio a fin, ideal si usas una Raspberry Pi 4 o 5 ya que son las que mayor cantidad de memoria tienen. Aunque utiliza Spigot (que es una versión base de PaperMC), cubre puntos cruciales que resumen la mejor práctica de 1) Optimización Inicial pues recomienda arrancar en la CLI (sin escritorio) y configurar SSH usando raspi-config para maximizar los recursos. 2) Un proceso de automatización donde detalla la configuración como un servicio systemd. 3) Gestión de Versiones, logra proporcionar un método limpio para actualizar el servidor usando BuildTools.jar y jq para obtener automáticamente la última versión, un proceso clave para el mantenimiento a largo plazo. 4) Esta guia ofrece valores de asignación de RAM específicos para TODAS las generaciones de la Pi.
<br>
<br>

## Consola Retro
<div style="text-align: center;">
    <img
        src="{{ "/assets/images/gamer.jpg" | relative_url }}"
        alt="Personajes pixel art de un oso polar, pingüinos y un paisaje de hielo."
        title="Arte basado en 'Polar Bear Platformer' de ZomBCool (CC-BY 3.0). Obra derivada licenciada bajo CC BY-NC-SA 4.0."
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
>La imagen que muestra los sprites de pixel art es una obra derivada licenciada bajo CC BY-NC-SA 4.0. Está basada en el asset pack "<a href="https://opengameart.org/content/polar-bear-platformer" target="_blank">Polar Bear Platformer</a>" del autor ZomBCool, disponible en OpenGameArt.org bajo la licencia <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">Creative Commons Atribución 3.0 (CC-BY 3.0)</a>.
<br>

Es uno de los mayores usos que tiene la SBC británica en el mundo, así que no hay por dudarlo. De forma directa, Retropie es por excelencia la mejor opción.

Recomiendo esta <a href="https://www.raspberrypi.com/tutorials/retropie-raspberry-pi-tutorial/" target="_blank">guía oficial de la Raspberry Pi Foundation:</a> donde, en primer lugar, garantiza que la información es actualizada y autorizada para los modelos más recientes con soporte de Retropie (Pi 4 y Pi 400). Además, detalla el método más sencillo utilizando Raspberry Pi Imager para flashear el sistema operativo de emulación directamente. Lo mejor es que incluye el proceso simple para transferir juegos (ROMs) a través de una memoria USB, ideal para principiantes. Confirma que la mayor cantidad de RAM ofrece la mejor experiencia de juego.

Dos videos ilustrativos del proceso, ambos muy completos:
- <a href="https://www.youtube.com/watch?v=AaseHnf0k2o" target="_blank">Video #1</a>
- <a href="https://www.youtube.com/watch?v=VzL-155psJQ" target="_blank">Video #2</a>

Hay mas opciones cuya revisión puedo recomendar ampliamente en este <a href="https://youtu.be/wKx3-ts1Lbw?si=0YkRfNugXPEzmBpA" target="_blank">video</a>. A modo de resumen estan:
- <a href="https://www.lakka.tv/" target="_blank">Lakka</a>
- <a href="https://www.rgb-pi.com/" target="_blank">RGBPi</a>
- <a href="https://www.recalbox.com/" target="_blank">Recalbox</a>
- <a href="https://batocera.org/" target="_blank">Batocera</a>

Además de que es posible usar *Raspberry Pi Os* como base para instalar estos programas, seguramente a costa de las configuraciones default por lo que manualmente tendra que hacerlo antes de empezar a jugar. Así las cosas, puede descargar e instalar:

--- RetroPie:

- <a href="https://alansantos.dev/2020/07/iot/raspberry-pi/installing-retropie-on-raspberry-pi-os/" target="_blank">Guia de instalación</a>
- <a href="https://github.com/provecticus/retropie-rpi5-guide/blob/main/INSTALL_GUIDE.md" target="_blank">Guia de instalación en raspberry pi 5</a>
- <a href="https://itsfoss.com/retropie-setup/" target="_blank">Proceso de instalación en raspberry</a>
- <a href="https://raspberrytips.es/descarga-retropie-roms/" target="_blank">Configuraciones extra</a>


--- Retroarch

El paquete esta en los repositorios de debian para arm64 (y otras arquitecturas), lo podemos instalar con:
```
sudo apt install retroarch
```
Y ya tendríamos disponible el programa para su respectivo uso. Aunque tambien es posible compilarlo desde la fuente que se encuentra en esta <a href="https://docs.libretro.com/guides/rpi/#" target="_blank">guía</a>, tambien recomiendo esta otra de <a href="https://www.xda-developers.com/how-i-turned-my-raspberry-pi-into-an-emulation-beast/" target="_blank">xda-developers</a>.

### ROMS

Para el tema de bajar ROMS para los emuladores recomiendo:

- <a href="http://romhustler.net/" target="_blank">Rom Hustler</a>
- <a href="https://www.freeroms.com/" target="_blank">Free ROMs</a>
- <a href="http://coolrom.com/" target="_blank">Cool ROM</a>
- <a href="http://cvaddict.com/list.php" target="_blank">Coleco Vision Addict</a>

### Lista de Emuladores Famosos y Completos (Núcleos de RetroArch)
Al instalar RetroArch o RetroPie, accedes a cientos de emuladores. Los más importantes y compatibles para Raspberry Pi (especialmente Pi 3, 4 y 5) son:


|Sistema de Videojuegos|Núcleo de RetroArch (Emulador) Famoso|Nivel de Rendimiento General (en Pi 4/5)|
| ------------- | ------------- |------------- |
|Arcade (Máquinas recreativas)|MAME (varias versiones), FinalBurn Neo (FBNeo)|Alto (FBNeo es preferido para muchos juegos)|
|Nintendo Entertainment System (NES)|FCEUmm, Nestopia UE|Excelente|
|Super Nintendo Entertainment System (SNES)|Snes9x (varias versiones)|Excelente|
|Game Boy / Color / Advance (GBA)|Gambatte (GB/GBC), mGBA (GBA)|Excelente|
|Sega Genesis / Mega Drive|Picodrive|Excelente|
|PlayStation 1 (PSX)|PCSX ReARMed|Excelente|
|Nintendo 64 (N64)|mupen64plus-next|Bueno (el rendimiento puede variar)|
|Sega Dreamcast|Flycast|Bueno (requiere Raspberry Pi 4 o 5)|
|PlayStation Portable (PSP)|PPSSPP|Variable (funciona bien en Pi 4/5 para muchos juegos 2D/menos exigentes)|
|Nintendo DS (NDS)|DeSmuME|Variable (puede ser lento en algunos juegos, mejor en Pi 4/5)|

Consideraciones Clave

- La potencia: Los sistemas más antiguos (NES, SNES, Genesis, PS1) corren casi a la perfección en cualquier Raspberry Pi moderna.

- Las consolas de 128 bits y 3D: Para consolas como Dreamcast, PSP, Nintendo 64 o Nintendo DS, se recomienda encarecidamente la Raspberry Pi 4 o 5 para obtener un rendimiento aceptable. La Pi 5 mejora significativamente la emulación de estos sistemas.

- Los emuladores independientes: Aunque RetroArch es el estándar, también puedes instalar emuladores individuales específicos si lo deseas, pero son menos comunes para la mayoría de los sistemas. Por ejemplo, Dolphin para GameCube/Wii solo es viable en la Raspberry Pi 5 y con configuración avanzada.
<br>
<br>


## Centro multimedia

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/meme_rapsberry_3.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

Usar <a href="https://libreelec.tv/" target="_blank">LibreElec</a> es la mejor opción para esto más allá de las increibles ventajas de KODI, lo digo porque ya tiene totalmente operativo el driver HDMI-CEC configurado para su uso dia 1. Y eso me gusta:

Dos videos ilustrativos del proceso, ambos muy completos:
- <a href="https://www.youtube.com/watch?v=7x-DrUdziFw" target="_blank">Video #1</a>
- <a href="https://www.youtube.com/watch?v=3hFas54xFtg" target="_blank">Video #2</a>

Una vez ya terminada la configuracion inicial, es simplemente agregar los mejores plugins al sistema y disfrutar del contenido. Tambien existe la opcion de bajar Kodi directamente desde *Raspberry Pi Os* y asi usarlo desde el sistema, la cuestion es que por lo menos, en la version que esta basada en Debian 12, el driver del HDMI-CEC se tenia que compilar para que funcionara. De todas formas aqui hay un tutorial:

- <a href="https://www.youtube.com/watch?v=3hFas54xFtg" target="_blank">Tutorial instalación Kodi en Raspberry Pi Os</a>
<br>
<br>


## Server multimedia para pelis

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/meme_rapsberry_2.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>


Este es mi uso favorito y la función actual de mi Raspberry Pi 4: usarlo como server <a href="https://jellyfin.org/docs/general/post-install/transcoding/hardware-acceleration/#raspberry-pi-hardware-acceleration-support-deprecation" target="_blank">Jellyfin</a> para alojar peliculas gracias a que tiene tanto codificador como decodificador H.264 y H.265 para hacer todos los procesos de transcodificación necesarios para ver pelis.A nivel de consideraciones no hay que dejar pasar que la mejor para esta tarea es la Raspberry Pi 4 sobre la 5. La teoria dice que la potencia de sus cuatro nucleos Cortex A76 deberia ser suficiente para mover el contenido h264 con solvencia, pero no puedo confirmalo. De plano prefiero que la GPU se encargue de todo y no la CPU, pero bueno. De todas formas aqui estan los tutoriales:


- <a href="https://www.youtube.com/watch?v=_s9w3k5Lrxw" target="_blank">Tutorial #1</a>: Este es el método común, instalas jellyfin server desde paqueteria .deb para tu sistema y se ejecuta directamente allí.
- <a href="https://www.youtube.com/watch?v=2MDNGYP6H-8" target="_blank">Tutorial #2</a>: Este es un método mas avanzado, consiste en instalar OpenMediaVault (otros Sistema Operativo) y luego si, ejecutar directamente Jellyfin.
- <a href="https://www.youtube.com/watch?v=7a9TlQsmlP4" target="_blank">Tutorial #3</a>: Este es un método, igual de avanzado, consiste en instalar Docker (otros Sistema Operativo) y luego si, ejecutar Jellyfin.
- Breve <a href="https://itsfoss.com/jellyfin-raspberry-pi/" target="_blank">guía</a> escrita para instalar jellyfin del primer modo.
<br>
<br>


## Servidor NAS

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/meme_rapsberry_4.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

Transforma tu Raspberry Pi en un centro de almacenamiento en red seguro, accesible para todos los dispositivos de tu hogar. No se limita solo a guardar archivos: un NAS puede actuar como servidor multimedia (música, películas, fotos), servidor de backups centralizado y ejecutar otros servicios (como servidores web). El límite real está en la capacidad y potencia del hardware. Como plataformas recomiendo personalmente OpenMediaVault (OMV) ya que es una de las soluciones más populares y robustas para NAS en la Pi con un buen tiempo de experiencia. Y la de NextCloud / ownCloud siendo ideales para crear tu propia "nube privada" con funciones de sincronización y compartición.

### Instalación de NextCloud en tu Raspberry Pi (3 Métodos)
El <a href="https://raspberrytips.es/instalar-nextcloud-raspberry-pi/" target="_blank">artículo</a>  proporcionado ofrece dos enfoques para la instalación.

*Método 1: NextCloudPi (Formato completo)*

Solo se recomienda para Raspberry Pi 4 y 5, ya que las imágenes más recientes están optimizadas para estas. Si tiene una Pi 3, omita este método y use la Instalación Manual (Método #2) para mejor estabilidad y soporte. Si decides flashear la tarjeta microSD para una instalación limpia y dedicada, diríjase al <a href="https://github.com/nextcloud/nextcloudpi/releases" target="_blank">GitHub de NextcloudPi</a> y descargue la última imagen .zip compatible con su modelo de Raspberry Pi.

No recomiendo seguir los videos más antiguos de esa página, ya que fueron creados cuando Raspberry Pi OS se llamaba Raspbian, por lo que algunos comandos o paquetes podrían haber cambiado.

*Método 2: En Raspberry Pi OS existente*

Si ya tienes el sistema operativo Raspberry Pi OS corriendo y no quiere formatear su microSD, siga el **"Método alternativo: instalar NextCloud en Raspberry Pi OS"** que encontrará en este tutorial de RaspberryTips. Este método le permite añadir NextCloud como un servicio adicional.

*Método 3: Instalación con Docker (Avanzado)*

Una tercera opción es instalar NextCloud mediante Docker. Esto requiere la instalación y activación del entorno de contenedores, y luego la descarga del contenedor de NextCloud. Aquí tiene un <a href="https://www.youtube.com/watch?v=5kK_cn3S4C8" target="_blank">video</a> ilustrativo.

La consideración crucial con Docker es la cantidad de RAM disponible. Ejecutar el sistema operativo base, el entorno de contenedores (Docker), la instancia de Nextcloud y las apps adicionales (calendarios, ofimática) suma una carga de recursos significativa. Es vital dimensionar la RAM para garantizar un rendimiento adecuado al ejecutar todos estos servicios simultáneamente.

A parte tambien recomiendo estas guias extra como alternativas:

- <a href="https://pimylifeup.com/raspberry-pi-openmediavault/" target="_blank">Guía #1</a> con OpenMediaVault
- <a href="https://pimylifeup.com/raspberry-pi-owncloud/" target="_blank">Guía #2</a> con ownCloud
- <a href="https://www.electromaker.io/tutorial/blog/create-your-own-spotify-with-a-raspberry-pi" target="_blank">Guía #3</a> siendo opciones para tener tu spotify privado
- <a href="https://www.youtube.com/watch?v=GYnQdKlnqIs" target="_blank">Guía #4</a> OpenMediaVault pero en español
- <a href="https://hagensieker.com/2021/11/11/raspberry-pi-nas-kind-of/" target="_blank">Guía #5</a> maximizar el almacenamiento
- <a href="https://raspberrytips.com/nas-guide-raspberry-pi/" target="_blank">Guía #6</a> para entender conceptodo de NAS.

<br>
<br>


## Pi-Hole
<div style="text-align: center;">
    <img
        src="{{ "/assets/images/meme_rapsberry_5.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
            width: 60%;
        "
    />
</div>
<br>

Un bloqueador de anuncios y rastreadores a nivel de red, que actúa como un servidor DNS centralizado. Al instalarlo en tu Raspberry Pi, puedes filtrar toda la publicidad e scripts de seguimiento para todos los dispositivos conectados a tu red doméstica (móviles, tabletas, smart TVs). Esto no solo mejora la velocidad de navegación, sino también la privacidad.
- <a href="https://lab.bricogeek.com/tutorial/como-instalar-pi-hole-en-raspberry-pi-para-bloquear-publicidad/instalacion-de-pi-hole" target="_blank">Guía #1</a> bastante sencilla.
- <a href="https://www.youtube.com/watch?v=mX-0WGlh7Tg" target="_blank">Guía #2</a> siendo un video tambien ilustrativo.
- <a href="https://docs.pi-hole.net/main/basic-install/" target="_blank">Guía #3</a> la documentacion oficial vale la pena.
<br>
<br>

## Servidor VPN

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/meme_rapsberry_6.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

Usando protocolos como OpenVPN o WireGuard, te permite acceder de forma segura a tu red doméstica desde cualquier lugar del mundo. Esto es útil para conectarte a tus dispositivos locales o navegar por Internet usando la IP de tu casa.
- <a href="https://www.youtube.com/watch?v=YdmTh2wXfj4" target="_blank">Guía #1</a> videooo.
- <a href="https://pimylifeup.com/raspberry-pi-vpn-server/" target="_blank">Guía #2</a> escrita, muy efectiva.
- <a href="https://www.pcmag.com/how-to/goodbye-monthly-fees-i-made-my-own-vpn-with-a-raspberry-pi-5#" target="_blank">Guía #3</a> buena alternativa.
- <a href="https://www.pivpn.io/" target="_blank">Guía #4</a> el proyecto PiVPN es una de las formas más fáciles de configurar todo.
<br>
<br>

## Home Assistant OS
<div style="text-align: center;">
    <img
        src="{{ "/assets/images/meme_rapsberry_7.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
            width: 60%;
        "
    />
</div>
<br>

Es un sistema operativo optimizado para ejecutar la plataforma de código abierto Home Assistant, transformando tu Raspberry Pi en el cerebro de tu hogar inteligente. Permite centralizar y automatizar el control de casi cualquier dispositivo inteligente (luces, termostatos, cámaras, sensores) sin depender de servicios en la nube, priorizando la privacidad y el control local.
- <a href="https://www.youtube.com/watch?v=Kfu-OgrH50c" target="_blank">Guía #1</a> videooo.
- <a href="https://www.youtube.com/watch?v=SBFZuwIhQ8o" target="_blank">Guía #2</a> videooo.
- <a href="https://www.home-assistant.io/installation/raspberrypi-other" target="_blank">Guía #3</a> documentación oficial.
<br>
<br>


## Estación meteorológica

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/estacion_meteologica.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

Conectar sensores externos (como DHT11/22 para temperatura y humedad, o barómetros) a tu Raspberry Pi para recoger datos ambientales en tiempo real. Puedes almacenar, visualizar y analizar esta información localmente, o incluso publicarla en línea para seguir las condiciones meteorológicas de tu ubicación.

- <a href="https://projects.raspberrypi.org/en/projects/build-your-own-weather-station" target="_blank">Guía #1</a> de la página oficial de proyectos de raspberrypi.
- <a href="https://www.youtube.com/watch?v=ChQpD2gsC20" target="_blank">Guía #2</a> videooooo.
- <a href="https://www.youtube.com/watch?v=BEbAvG5A238" target="_blank">Guía #3</a> videooooo.
<br>
<br>

## Servidor Web

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/meme_rapsberry_8.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

Instala una suite de servidor web (como LAMP o LEMP) para alojar tu propia página web, blog, o wiki directamente desde tu casa. Esto te permite tener un entorno de desarrollo o mantener servicios en línea personales con control total, siendo accesible a través de tu red local o de Internet.

- <a href="https://www.ionos.com/es-us/digitalguide/servidores/configuracion/como-configurar-un-servidor-web-raspberry-pi-con-lamp/" target="_blank">Guía #1</a> en español y relativamente sencilla
- <a href="https://pimylifeup.com/raspberry-pi-web-server/" target="_blank">Guía #2</a> bien escrita y completa.
- <a href="https://www.youtube.com/watch?v=2tknxiydR0s" target="_blank">Guía #3</a> video informativo.
<br>
<br>

## Servidor Torrent/Seedbox

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/meme_rapsberry_9.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

Convierte tu Raspberry Pi en una estación dedicada a la descarga y compartición de archivos (seeding) mediante el protocolo BitTorrent. Al funcionar 24/7, te permite gestionar torrents de forma remota (a través de una interfaz web) sin necesidad de mantener encendido tu ordenador principal, mejorando la eficiencia energética y manteniendo un buen ratio de subida en comunidades privadas.

Esta es la forma más sencilla de convertir tu Raspberry Pi en un Seedbox dedicado, permitiéndote gestionar descargas y subidas de torrents de forma remota.
El primer paso es asegurar la estabilidad y el espacio para tus archivos estableciendo una IP Estática en la Raspberry Pi, esto garantiza que la dirección web para acceder al cliente torrent nunca cambie. Luego configura y monta un disco duro externo o una partición dedicada dentro de Raspberry Pi OS. Este será el destino donde se guardarán todos los archivos descargados y donde se realizará la "siembra" (seeding).

Luego debemos eligir e instalar el software que gestionará tus torrents (como qBittorrent, Deluge o Transmission). Por ejemplo a mi personalmente me gusta `sudo apt install qbittorrent`. Solo debes asegúrarte de que la versión instalada sea la que incluye la interfaz web. Una vez instalado configura el puerto de acceso local, editando la configuración del cliente torrent (generalmente un archivo de configuración o a través de la interfaz headless) para definir el puerto de la interfaz web (por defecto, a menudo es 8081 para qBittorrent o 9091 para Transmission). Ya con eso puedes acceder y gestionar tu Seedbox desde cualquier navegador dentro de tu red local utilizando la siguiente dirección: *http://[IP-estática-de-tu-Raspberry]:[Puerto-configurado]*, ejemplo: *http://192.168.1.50:8081*. Con todo esto, solo es de empezar la siembra (Seeding), una vez iniciadas las descargas a través de la interfaz web, el cliente torrent se encargará automáticamente de la "siembra" (mantener la subida de los archivos) de forma continua, sin necesidad de supervisión constante. Le recuerdo que si deseas acceder a tu Seedbox fuera de tu red doméstica (desde Internet), deberás configurar el reenvío de puertos (port forwarding) en tu router doméstico.

Esa fue una forma pero existen otras:

- <a href="https://www.youtube.com/watch?v=X9Bbh4c_KCI" target="_blank">Guía #2</a> videooooo.
- <a href="https://www.youtube.com/watch?v=tDPLQByFETc" target="_blank">Guía #3</a> videooooo.
- <a href="https://pimylifeup.com/raspberry-pi-torrentbox/" target="_blank">Coleccion de guías</a> de varios torrents.
- <a href="https://pyyhttu.kapsi.fi/debian/openmediavault/omv.html" target="_blank">Guía #4</a> me parecio muy completa la verdad.
<br>
<br>

## Servidor de impresión

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/raspi_printer.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

Convierte impresoras USB antiguas o no compatibles con red en dispositivos compartidos a través de tu red doméstica. Al instalar el sistema CUPS (Common Unix Printing System), tu Raspberry Pi actuará como un bridge centralizado, permitiendo que cualquier dispositivo (PC, móvil, laptop) envíe trabajos de impresión de forma inalámbrica a la impresora conectada.

- <a href="https://www.youtube.com/watch?v=8CG1nrrsY2w" target="_blank">Guía #1</a> videooooo.
- <a href="https://tripad.medium.com/turning-my-old-printer-into-a-wireless-printer-with-a-raspberry-pi-1fb6d73e35a4" target="_blank">Guía #2</a> videooooo.
<br>
<br>

## Servidor de Gitea

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/gitea.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>


Convierte tu Raspberry Pi en tu propia plataforma de desarrollo y colaboración, alojando repositorios Git privados o públicos. Al autoalojar un servidor Git como Gitea, obtienes control total sobre tu código fuente, evitas las restricciones de las cuentas gratuitas de servicios públicos (como la limitación de repositorios privados) y aseguras la soberanía de tus datos sin depender de terceros.

Esta es la forma más sencilla, rápida y eficiente de tener una forja de código Git funcional en la Raspberry Pi, ideal para proyectos personales, equipos pequeños o para aprender sobre la gestión de control de versiones.
Aqui estan los tutoriales recomendados:
- <a href="https://docs.gitea.com/installation/install-from-binary" target="_blank">Documentacion oficial</a>.
- <a href="https://hackernoon.com/lang/es/una-guia-sobre-como-alojar-su-propio-servidor-git-con-raspberry-pi" target="_blank">Guía #1</a>.
- <a href="https://medium.com/@kevalpatel2106/create-your-own-git-server-using-raspberry-pi-and-gitlab-f64475901a66" target="_blank">Guía #2</a>.
- <a href="https://linuxize.com/post/how-to-install-git-on-raspberry-pi/" target="_blank">Guía #3</a>.
<br>
<br>

## Juegos en repositorios:

Mi recomendacion para esto (que es igual de valido en cualquier sistema debian) es usar este comando:
```
apt search game | less
```
con esto ya te mostrara en terminal todos los juegos, librerias y demas programas relacionados con los "games". Tambien puedes usar:
```
apt search game > juegos_completos.txt
```
para que todo lo que te salia en terminal ahora este en un archivo .txt mas leible. De aqui sacare mis recomendaciones (hasta la fecha con debian 12 bookworm) con su nombre de paquete para que lo instales:

|Genero|Juego|Descripcion|
| ------------- | ------------- |
|Estrategia/RTS|0ad|Juego de estrategia en tiempo real de guerra en la antigüedad.|
||7kaa|Seven Kingdoms Ancient Adversaries: juego de estrategia en tiempo real.|
||asc|Juego de estrategia por turnos (Advanced Strategic Command).|
||freeciv|Juego de estrategia por turnos basado en Civilization.|
||gigalomania|Juego estilo "god game" tipo Mega-Lo-Mania.|
||glob2|Juego de estrategia en tiempo real innovador.|
||iagno|Popular juego Othello (Reversi) para GNOME.|
||glob2|Juego de estrategia en tiempo real innovador.|
||jester|Juego de mesa similar a Othello.|
||kfourinline|Juego Conecta Cuatro (Connect Four) para KDE.|
||kigo|Juego Go (Igo, Baduk) para KDE.|
||ironseed|Juego de estrategia/aventura de exploración de ciencia ficción en el espacio.|
||lgeneral|Juego de estrategia por turnos al estilo Panzer General.|
||wesnoth|The Battle for Wesnoth: Juego de fantasía de estrategia por turnos, un proyecto open source masivo con varias campañas.|
||warzone2100|Juego de estrategia en tiempo real (RTS) en 3D. Los jugadores diseñan sus propias unidades.|
||widelands|Juego de estrategia en tiempo real de fantasía (inspirado en The Settlers).|
||warmux|Juego de artillería por turnos en 2D (similar a Worms).|
|RPG/Roguelike|cataclysm-dda-curses|Roguelike post-apocalíptico (interfaz ncurses).|
||crawl|Dungeon Crawl, un juego roguelike basado en texto.|
||angband|Juego de simulación de mazmorras basado en texto.|
||freedroidrpg|RPG isométrico influenciado por Paradroid.|
||adonthell|Juego de rol gráfico 2D.|
||hyperrogue|Juego roguelike gráfico no euclidiano único.|
||uqm|The Ur-Quan Masters (un juego de aventura intergaláctica).|
||tome|Roguelike de mazmorras basado en texto.|
||zangband|Juego Roguelike basado en texto de un solo jugador.|
|Shooters/FPS|alien-arena|Shooter 3D en primera persona online.|
||bzflag-client|Juego de batallas de tanques 3D en primera persona.|
||chocolate-doom|Motor de Doom compatible con Vanilla Doom.|
||crispy-doom|Doom engine de media resolución (basado en Chocolate Doom).|
||doomsday|Versión mejorada del juego Doom legendario.|
||armagetronad|Juego 3D de alta velocidad, tipo Tron.|
||geki2 / geki3|Juegos de disparos verticales y horizontales, respectivamente (tipo shoot 'em up).|
||gunroar|Juego de disparos en lancha cañonera de 360 grados.|
||kobodeluxe|Juego de batalla espacial.|
||openarena|Shooter en primera persona 3D de ritmo rápido (similar a Quake III Arena).|
||nexuiz|Shooter en primera persona 3D de ritmo rápido (versión clásica).|
||quake/quake2/quake3|Lanzadores y servidores para los clásicos Quake I, II y III.|
||yamagi-quake2|Versión mejorada del cliente del clásico Quake II.|
||wolf4sdl|Port basado en SDL de Wolfenstein 3-D y Spear of Destiny.|
||redeclipse|Shooter 3D en primera persona (casual arena shooter).|
||sauerbraten|Shooter 3D en primera persona (Cube 2 Engine).|
||ufoai|UFO: Alien Invasion (estrategia y táctica por turnos, tipo X-COM).|
|Carreras|supertuxkart|Carreras arcade en 3D con personajes y pistas variadas (estilo Mario Kart).|
||torcs|Simulador de coches de carreras 3D basado en OpenGL.|
||trigger-rally|Juego de carreras de rally 3D.|
|Arcade/Plataformas|chromium-bsu|Shooter espacial de desplazamiento rápido.|
||supertux|Clásico sidescroller 2D con Tux (estilo Mario).|
||caveexpress|Plataformero 2D con jugabilidad basada en física.|
||frogatto|Plataformero 2D protagonizado por una rana.|
||amphetamine|Juego de «correr y saltar» con efectos visuales.|
||gnujump|Juego de plataformas donde debes saltar hacia arriba para sobrevivir.|
||hannah|Juego parecido a Pac-Man, orientado a niños.|
||holotz-castle|Juego de plataformas con dosis de misterio.|
||hedgewars|Juego de artillería por turnos divertido, con erizos luchadores (similar a Worms).|
||kollision|Juego simple de esquivar bolas.|
||kspaceduel|Juego arcade SpaceWar! (duelo espacial).|
||ksirk|Juego de estrategia Risk.|
||lbreakout2 / lbreakouthd|Juego de bola y paleta (Breakout) con buenos gráficos.|
||kraptor|Juego clásico de disparos con desplazamiento (shoot 'em up).|
||lierolibre|Juego de acción de lombrices (earthworm action game).|
||liquidwar|Juego de guerra multijugador original.|
||maelstrom|Juego estilo arcade parecido a Asteroids.|
||mrboom|Clon de Bomberman para 8 jugadores.|
||open-invaders|Clon de Space Invaders.|
||pacman4console|Juego Pac-Man basado en ncurses (terminal).|
||penguin-command|Clon del juego Missile Command.|
||lugaru|Juego de lucha de conejos ninja en tercera persona (Lugaru HD).|
||naev|Juego espacial 2D de acción/RPG.|
||pekka-kana-2|Juego de plataformas 2D de la vieja escuela.|
||xblast-tnt|Clon multijugador de Dynablaster/Bomberman.|
||xmoto|Juego de plataformas de motocross en 2D basado en física.|
||xgalaga|Versión para X del famoso juego Galaga.|
||xscavenger|Juego de plataformas estilo Lode Runner para X.|
||xscorch|Clon del juego de tanques Scorched Earth.|
||vitetris|Clon de Tetris para terminal virtual.|
|Puzles/Mesa|2048 / 2048-qt|Juego de rompecabezas de deslizar y sumar.|
||blockattack|Juego de puzle inspirado en Tetris.|
||briquolo|Juego Breakout 3D de ritmo rápido.|
||chroma|Juego de puzle abstracto (versión gráfica).|
||four-in-a-row|Juego Cuatro en Línea para GNOME.|
||gnome-2048|Puzle de deslizar y sumar.|
||gnome-mines|Versión del popular Buscaminas para GNOME.|
||gnome-sudoku|Juego de Sudoku para GNOME.|
||gnome-mahjongg|Juego de fichas Mahjong.|
||hex-a-hop|Juego de puzle basado en fichas hexagonales.|
||gweled|Juego de puzle estilo "Diamond Mine" (estilo match-3).|
||gnubg|Programa de Backgammon (tablas o consola) con análisis.|
||kapman|Clon del juego Pac-Man para KDE.|
||kbreakout|Juego de bola y paleta (Breakout) para KDE.|
||kmahjongg|Juego de Mahjong solitario para KDE.|
||kmines|Juego Buscaminas (Minesweeper) para KDE.|
||kjumpingcube|Juego táctico simple (KDE).|
||klickety|Juego de puzle SameGame (KDE).|
||kgoldrunner|Juego arcade Lode Runner (KDE).|
||kolf|Juego de minigolf en miniatura.|
||kpat|Colección de juegos de solitario (cartas).|
||kreversi|Juego de mesa Reversi (Othello).|
||kshisen|Juego de solitario Shisen-Sho (similar al Mahjong).|
||ksudoku|Puzle de Sudoku y solucionador.|
||kubrick|Juego basado en el Cubo de Rubik.|
||xwelltris|Juego popular similar a Welltris (Tetris 3D).|
|Simulación/Emulación|dosbox|Emulador x86 con gráficos, sonido y DOS. (Útil para correr juegos antiguos de DOS).|
||atari800|Emulador de Atari de 8 bits para SDL.|
||dolphin-emu|Emulador de Gamecube y Wii.|
||fceux|Emulador NES/Famicom todo en uno.|
||hatari|Emulador para computadoras Atari ST, STE, TT y Falcon.|
||gnuboy-sdl|Binarios SDL para el emulador de Game Boy.|
||gbsplay|Reproductor de sonido de Gameboy.|
||lincity-ng|Juego de simulación de ciudades con gráficos avanzados (similar a SimCity).|
||lincity|Versión clásica de la simulación de ciudades.|
||micropolis|Simulador de gestión de ciudades en tiempo real (basado en el código fuente de SimCity Classic).|
||openttd|Reimplementación open source de Transport Tycoon Deluxe con mejoras.|
||opencity|Juego de simulación de ciudades en 3D.|
||mame|Multiple Arcade Machine Emulator (MAME).|
||mednafen|Emulador multiplataforma (incluye NES, GB/A, Lynx, PC Engine).|
||mgba-qt / mgba-sdl|Frontends (Qt y SDL) para el emulador de Game Boy Advance (mGBA).|
||nestopia|Emulador de Nintendo Entertainment System/Famicom.|
||openrct2|Reimplementación open source de RollerCoaster Tycoon 2.|
||osmose-emulator|Emulador de Sega Master System y Game Gear.|
||pcsxr|Emulador de Sony PlayStation.|
||stella|Emulador de Atari 2600.|
||yabause-gtk/yabause-qt|Emulador de la consola Sega Saturn.|
||virtualjaguar|Emulador cross-platform de la consola Atari Jaguar.|
||visualboyadvance|Emulador de Game Boy Advance con todas las funciones.|
||wit|De wii/gamecube, herramienta para manipular imágenes ISO y contenedores WBFS.|
|Juegos Sandbox/Construcción|gemrb|Motor open-source para ejecutar juegos como Baldur's Gate, Icewind Dale y Planescape: Torment (Necesitas los archivos originales del juego).|
|RPG/Motores|minetest|Motor de juego sandbox de bloques multijugador y mundo infinito (similar a Minecraft).|
||gearhead / gearhead-sdl|Juego RPG roguelike de mechas, en versión consola y SDL.|
||lambdahack|Motor de juego roguelike ASCII táctico de exploración de mazmorras.|
||ioquake3|Motor de juego para shooters en primera persona 3D (basado en Quake 3 Arena).|
||jzip|Intérprete para aventuras de texto Z-Code (formato clásico de Infocom).|
||instead|Motor para juegos de aventuras de texto simples y novelas visuales.|
||love|LÖVE: Framework de desarrollo de juegos 2D basado en Lua y OpenGL.|
||openmw|Motor open source del juego RPG de mundo abierto The Elder Scrolls III: Morrowind (necesitas los archivos del juego original).|
||lure-of-the-temptress|Aventura de fantasía clásica point and click (de los creadores de Broken Sword).|
||openjazz|Reimplementación del motor de Jazz Jackrabbit (shooter de plataformas DOS).|
||rtcw|Motor de juego para Return to Castle Wolfenstein.|
||scummvm|Motor para jugar varias aventuras gráficas (como las de LucasArts).|
||vcmi|Reescritura del motor de juego Heroes of Might and Magic 3.|
||renpy|framework estándar para crear novelas visuales.|


<br>
<br>

## Sistema de vigilancia
<div style="text-align: center;">
    <img
        src="{{ "/assets/images/vigilar.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 64%;
            height: auto;
        "
    />
</div>
<br>

No es que lea fuertemente a foucalt y tampoco cuestione las estructuras del poder de forma vehemente, auque tecnicamente este mintiendo, pero de todas formas, aqui hay un par de tutoriales con motioneyeos y PiCockpit, ademas de un trabajo muy interesante sobre la implementación de este sistema

- <a href="https://computerhoy.20minutos.es/tecnologia/como-crear-propio-sistema-vigilancia-hogar-raspberry-pi-1398086" target="_blank">sistema de vigilancia para el hogar</a>.
- <a href="https://picockpit.com/raspberry-pi/es/como-construir-una-camara-de-seguridad-con-una-raspberry-pi/" target="_blank">cámara de seguridad</a>.
- <a href="https://files.core.ac.uk/download/pdf/132092519.pdf" target="_blank">UNIVERSITAT AUTÒNOMA DE BARCELONA (UAB), Sistema de videovigilancia a través de una Raspberry Pi, Aitor Domene-Sánchez</a>.
<br>
<br>

## Bot de notificaciones
Usar la Raspberry Pi para enviar mensajes automáticos a Telegram o Discord (incluso más), te puede avisarte de casi cualquier cosa: cuando termine una descarga torrent, si hay un corte de energía y se activa la UPS, si un sensor de la estación meteorológica detecta algo, etc. Realmente es sencillo.

- <a href="https://www.flopy.es/crea-un-bot-de-telegram-para-tu-raspberry-ordenale-cosas-y-habla-con-ella-a-distancia/" target="_blank">guia</a>.
- <a href="https://www.atlantic.net/dedicated-server-hosting/how-to-create-a-chat-server-using-matrix-synapse-and-element-on-ubuntu-24-04/" target="_blank">guia #2</a>.
- <a href="https://www.instructables.com/Set-up-Telegram-Bot-on-Raspberry-Pi/" target="_blank">esta es con la Pico, pero es posible con la version normal</a>.
<br>
<br>


## Servidor de Mensajería Instantánea Matrix
Hostear tu propio servidor de chat privado y descentralizado, similar a Slack o Discord, pero con tu propio control de datos. Es un proyecto de "soberanía digital" muy popular. Es más complejo que los otros, pero muy gratificante.

- <a href="https://ugeek.github.io/blog/post/2021-01-28-servidor-de-mensajeria-matrix-synapse-en-raspberry-ubuntu-debian--con-docker.html" target="_blank">guia #1</a>.
- <a href="https://www.atlantic.net/dedicated-server-hosting/how-to-create-a-chat-server-using-matrix-synapse-and-element-on-ubuntu-24-04/" target="_blank">guia #2</a>.
- <a href="https://theselfhostingblog.com/posts/self-hosting-your-own-matrix-server-on-a-raspberry-pi/" target="_blank">guia #3</a>.
<br>
<br>


## Nodo IPFS
Hostear tu propio nodo IPFS te permite participar en la web descentralizada y persistente (Web3). En lugar de depender de servidores centralizados (como Google Drive o Amazon S3), IPFS utiliza una red peer-to-peer (P2P) para almacenar y compartir archivos. Al ejecutar un nodo, puedes anclar (almacenar de forma persistente) contenido valioso, asegurando que permanezca accesible en la red global y resistente a la censura. Es un proyecto clave para entender y construir el futuro de internet.

- <a href="https://pinata.cloud/blog/how-to-run-ipfs-on-a-raspberry-pi/" target="_blank">guia #1</a>.
- <a href="https://medium.com/@nem25/ipfs-node-on-raspberry-pi-3-7f5945f021c4" target="_blank">guia #2</a>.
- <a href="https://gist.github.com/NatoBoram/09d244ab02af16fecb62b917f7bee3c0" target="_blank">guia #3</a>.
- <a href="https://gonzalezmas.es/post/2021-01-20-ipfs-en-pi/" target="_blank">guia #4</a>.
- <a href="https://www.reddit.com/r/ipfs/comments/thpgt1/a_mostly_complete_guide_to_hosting_a_public_ipfs/?tl=es-es" target="_blank">guia #5</a>.
- <a href="https://forums.raspberrypi.com/viewtopic.php?t=327685" target="_blank">guia #6</a>.

<br>
<br>


## Cluster de Computación Paralela (MPI y BOINC)
<div style="text-align: center;">
    <img
        src="{{ "/assets/images/bionicraspy.jpg" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>
Este proyecto te permite utilizar la potencia de tu Raspberry Pi (o varias de ellas) para abordar problemas de cálculo intensivo, ya sea para tus propios experimentos o para la investigación global. Es mi favorita por si no tienes de momento ningun uso para tu raspberry pi, bueno, con esto podras ayudar un monton hasta que de decidas :D

**BOINC (Contribución Científica Global)**

BOINC te conecta a una vasta red de computación distribuida que apoya proyectos científicos de renombre (como la búsqueda de vida extraterrestre, el mapeo de proteínas para curas médicas o el modelado climático). Tu Pi se conecta a la red, descarga automáticamente pequeñas tareas de cálculo y las procesa utilizando los ciclos de CPU que no estás usando. Es una forma sencilla de donar potencia de cómputo a la ciencia, incluso con una sola Pi.

**MPI (Computación Distribuida Propia)**

MPI (Message Passing Interface) es un estándar para crear tus propios mini-supercomputadores. Si tienes varias Raspberry Pi conectadas en red (un cluster), MPI permite que todos los núcleos de todos tus dispositivos se comuniquen y trabajen en un único problema grande al mismo tiempo. En lugar de ejecutar cuatro tareas lentas, ejecutas una tarea cuatro veces más rápido. Es esencial para:

- Aprender Computación de Alto Rendimiento (HPC): Entender cómo se coordinan las supercomputadoras.
- Ejecutar Simulaciones: Dividir cálculos complejos (como simulaciones de física o grandes análisis de datos) en partes manejables para que tu cluster las resuelva en paralelo.


Tras esto, dejo algunos tutoriales:

- <a href="https://pimylifeup.com/raspberry-pi-boinc/" target="_blank">guia #1</a>.
- <a href="https://blackdevice.com/contribute-science-raspberry-pi-boinc/" target="_blank">guia #2</a>.
- <a href="https://www.youtube.com/watch?v=tNpLyUT8Tr4" target="_blank">guia #3</a>.
- <a href="https://www.youtube.com/watch?v=-0jBww1pPAI" target="_blank">guia #4</a>.
- <a href="https://www.reddit.com/r/BOINC/comments/1hythlx/running_boinc_on_a_raspberry_pi_cluster_my/" target="_blank">guia #5</a>.
- <a href="https://efmer.com/boinctasks/raspberry-pi/" target="_blank">guia #6</a>.
- <a href="https://stfn.pl/blog/17-rpi4-rpi5-boinc/" target="_blank">guia #6</a>.

<br>
<br>

## Proyectos Raspberry Pi

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/proyectosraspi.png" | relative_url }}"
        alt="Texto alternativo de la imagen"
        style="
            border-radius: 15px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        "
    />
</div>
<br>

La Raspberry Pi Foundation ofrece cientos de ideas para iniciar tu viaje en la programación y la informática. Desde proyectos sencillos de codificación por bloques (Scratch) hasta el desarrollo de servidores físicos, IA o web. Es la sección ideal para explorar por tema (Naturaleza, Juegos, Música) o por tecnología (Python, Web Development, Physical Computing) y empezar a crear cosas geniales mientras aprendes.

- <a href="https://projects.raspberrypi.org/es-ES/" target="_blank">Enlace a la pagina de proyectos de la Raspberry Pi Foundation</a>.
<br>
<br>

## A modo de conclusión..

Y así concluimos este viaje por algunos de los usos más fascinantes que le puedes dar a tu Raspberry Pi. Pero que quede claro: esto no es el final, sino apenas el comienzo. La verdadera magia de esta pequeña placa reside en su infinita versatilidad y en la comunidad que la impulsa, constantemente creando nuevos proyectos y empujando los límites de lo posible. Espero que esta "guía de guías" te haya servido de brújula para encontrar tu propio camino.






