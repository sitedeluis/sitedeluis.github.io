---
layout: post
title: "Usar Proton con Total War: EMPIRE en Steam"
author: "Luis"
tags: Ensayo
comments: true
---
Total War: EMPIRE es mi juego favorito, lo llevo jugando mucho tiempo y seguramente, por mucho años más. Es curioso pues es un juego ya algo viejo en terminos tecnicos, DX9 como API para Windows y una version nativa OpenGL para linux de la mano de Feral Interactive que no esta mal, pero claramente esta por detras de la version de Windows. Asi que aqui va un breve tutorial de como hacer que funcione con Proton la version de Windows en Linux.
Originalmente cuando dejas todo por defecto, es decir, solo activas la herramienta de compatibilidad de Steam con el juego, este no abrira. Alli ocurre el error de la librería d3dx9_40.dll faltante, un componente necesario para poder jugar. En mi caso estoy en Debian 13 junto a Flatpak que es mi sistema principal.

Como tal necesitaremos:
- Protontricks (versión Flatpak, que usamos en esta guía). Instalalo antes de tener Flatseal.
- Flatseal.
- El juego Total War: Empire - Definitive Edition (AppID 10500) instalado en Steam y configurado para usar una versión de Proton (ej. Proton10 en la fecha de redaccion de esta guia).

Si tu biblioteca de Steam está en un disco externo o una ubicación no estándar (como en mi caso: /mnt/disco1tb), la versión Flatpak de Protontricks no puede acceder a ella por defecto. Si no tienes este caso puede saltarte esto e ir directamente por el paso de protontricks. Para cambiar esto debemos usar Flatseal, lo instalamos de la siguiente forma:
```
flatpak install flathub com.github.tchx84.Flatseal
```

Luego, abre la aplicación Flatseal (herramienta gráfica para gestionar permisos de Flatpak). Ahora debemos darle los permisos del disco de la siguiente forma: En la lista izquierda de Flatseal, selecciona Protontricks. Luego, baja hasta la sección Filesystem (Sistema de Archivos) y busca la opción "Other files" (Otros archivos) o "Other filesystems" y añade la ruta de tu disco donde se encuentra la librería de Steam. Allí debes añadir /mnt/disco1tb (o la ruta específica de tu disco). Por ultimo, cierra Flatseal. Los permisos se aplican automáticamente.


Ahora, utilizaremos Protontricks para instalar el paquete completo de DirectX 9 directamente en el entorno de Proton de Empire Total War. Tecnicamente via grafica puedes seleccionar el componente faltante, pero yo prefiero via terminal para evitar los problemas con la lista de juegos de Protontricks y para instalar el componente específico (d3dx9):
```
flatpak run com.github.Matoking.protontricks 10500 d3dx9
```
El comando anterior ejecutará lo siguiente automáticamente:

- Localizará el *Wineprefix* (entorno virtual de Windows) del juego en tu disco.
- Llamará a Winetricks e iniciará el proceso de instalación del verbo d3dx9.
- Descargará el paquete redistribuible de DirectX de Microsoft.
- Extraerá (`cabextract`) todos los archivos DLL de DirectX 9 (incluyendo el `d3dx9_40.dll` y otros, del `d3dx9_24` al `d3dx9_43`).
- Copiará los DLLs a la carpeta `syswow64` del *Wineprefix* (que en mi caso es `/mnt/disco1tb/SteamLibrary/steamapps/compatdata/10500/pfx/dosdevices/c:/windows/syswow64`).
- Configurará el registro de Wine/Proton para que utilice estas librerías recién instaladas.

Cuando la terminal deje de mostrar mensajes y te devuelva la línea de comandos lista para escribir, la instalación habrá finalizado.

Ya para el final, abre Steam, asegúrate de que *Total War: Empire - Definitive Edition* está usando una versión estable de Proton (clic derecho \> Propiedades \> Compatibilidad) y simplemente inicia el juego. El juego ya no debería fallar con el error `d3dx9_40.dll` y debería cargar normalmente.

## Bibliografía:

- [Issue Oficial en GitHub](https://github.com/ValveSoftware/Proton/issues/7074) - Seguimiento de compatibilidad
- [ProtonDB para Empire Total War](https://www.protondb.com/app/10500?device=pc) - Reportes de compatibilidad actualizados
