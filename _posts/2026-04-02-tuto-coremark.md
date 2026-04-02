---
layout: post
title: "Breve guía sobre CoreMark"
author: "Luis"
tags: Ensayo
comments: true
---

En el mundo de la arquitectura de computadores, medir el rendimiento basándose únicamente en los gigahercios (GHz) es un error tan antiguo como inexacto. La frecuencia de reloj solo nos indica a qué velocidad "late" el procesador, pero no dice absolutamente nada sobre qué tan eficiente es cada uno de esos latidos. Para desentrañar la verdadera potencia bruta de una microarquitectura, debemos mirar directamente al IPC (Instrucciones por Ciclo).

Aquí es donde entra CoreMark. Lejos de ser un benchmark sintético aleatorio, CoreMark simula cargas de trabajo reales (procesamiento de listas enlazadas, manipulación de matrices y máquinas de estado). Al dividir su puntaje entre la frecuencia exacta a la que corre el chip, obtenemos la métrica de oro indiscutible: CoreMark/MHz. Esta cifra nos revela el IPC real, permitiéndonos comparar procesadores de diferentes generaciones, familias o fabricantes de forma justa, eliminando por completo la ventaja del reloj.

Pero el rendimiento en la era moderna no termina en un solo núcleo. El verdadero desafío de los ingenieros es hacer que múltiples núcleos trabajen en conjunto sin pisarse. Por ello, esta guía no se detiene en el Single-Thread, utilizaremos la misma herramienta y la misma metodología para calcular matemáticamente el factor de escalado de tu procesador, revelando si tu hardware está aprovechando realmente todos sus hilos o si está perdiendo eficiencia por cuellos de botella térmicos, de caché o de memoria.

A continuación, te presento un método de pruebas puro, libre de binarios precompilados de terceros, ejecutado y compilado desde cero directamente en Debian. Vamos a aislar tu CPU, forzar su frecuencia máxima y extraer datos reales y comparables sobre el verdadero rendimiento de tu silicio.

### 1. Preparar el terreno
Primero, asegúrate de tener las herramientas de compilación y `git` instalados. Abre tu terminal y ejecuta:

```bash
sudo apt update
sudo apt install build-essential git
```

> **Importante:** Para que las métricas sean exactas, cierra el navegador y cualquier proceso pesado. Pon tu CPU en modo alto rendimiento para que la frecuencia no baje durante las pruebas:
> ```bash
> echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
> ```

### 2. Clonar el repositorio
Vamos a descargar el código directamente desde el repositorio oficial:

```bash
git clone https://github.com/eembc/coremark.git
cd coremark
```

### 3. Compilar y ejecutar para 1 solo núcleo (Single-Thread)
Vamos a compilar optimizado para tu arquitectura, indicando que el binario resultante se llame `coremark_single` para evitarnos lios.

```bash
# Compilar específicamente para un solo hilo y renombrar el ejecutable
make PORT_LINUX=linux-gnu-gcc TARGET=coremark_single XCFLAGS="-DPERFORMANCE_RUN=1"
```

Una vez termine, lanza la prueba con estos parámetros (el `500000` asegura que correrá el tiempo suficiente sin importar lo rápida que sea tu CPU):

```bash
./coremark_single 0x3415 0x3415 0x66 500000 7 1 2000
```

### 3.1 Compilación Cruzada para ARM y RISC-V
CoreMark es un benchmark multiplataforma diseñado específicamente para ser portátil y ejecutarse en una gran variedad de arquitecturas de procesadores. El mismo repositorio oficial que usaste para x86 sirve como base para ARM y RISC-V, pero requiere un proceso de compilación cruzada (cross-compilation) cuando tu máquina Debian es x86 y quieres generar binarios para estas arquitecturas.

Antes de compilar, necesitas instalar los compiladores cruzados. En Debian, esto es sencillo con apt:

```bash
# Para ARM (ej: Raspberry Pi, placas Cortex-A)
sudo apt install gcc-arm-linux-gnueabihf

# Para ARM64 (ej: placas modernas de 64-bit)
sudo apt install gcc-aarch64-linux-gnu

# Para RISC-V (ej: placas SiFive, VisionFive)
sudo apt install gcc-riscv64-linux-gnu

# Para sistemas bare-metal (sin OS), instala los toolchains 'elf':
sudo apt install gcc-arm-none-eabi  # Para microcontroladores ARM Cortex-M
sudo apt install gcc-riscv64-unknown-elf  # Para RISC-V bare-metal
```
### 3.1.1 Compilación para ARM Linux (Cortex-A, etc.)
El repositorio CoreMark incluye un puerto para Linux genérico que funciona en ARM. La clave es especificar el compilador cruzado correcto. Para single-core:

```bash
# Compilar para ARM64 (Single-Thread)
make PORT_LINUX=linux \
     CC=aarch64-linux-gnu-gcc \
     AR=aarch64-linux-gnu-ar \
     RANLIB=aarch64-linux-gnu-ranlib \
     XCFLAGS="-O2 -DPERFORMANCE_RUN=1 -march=armv8-a"
```

Para multi-thread:
```bash
# Soporte multi-hilo de 4 núcleos
make PORT_LINUX=linux \
     CC=aarch64-linux-gnu-gcc \
     AR=aarch64-linux-gnu-ar \
     RANLIB=aarch64-linux-gnu-ranlib \
     XCFLAGS="-O2 -DMULTITHREAD=4 -DUSE_PTHREAD -pthread -march=armv8-a"
```
Si tu sistema es de 32 bits (Raspberry Pi antiguas o versiones de OS de 32 bits), cambia todos los prefijos `aarch64-` por `arm-linux-gnueabihf-`.


### 3.1.2 Compilación para RISC-V Linux
El proceso es análogo al de ARM. Solo necesitas usar el toolchain de RISC-V:
```bash
# Compilar para RISC-V 64-bit (Single-Thread)
make PORT_LINUX=linux \
     CC=riscv64-linux-gnu-gcc \
     AR=riscv64-linux-gnu-ar \
     RANLIB=riscv64-linux-gnu-ranlib \
     XCFLAGS="-O2 -DPERFORMANCE_RUN=1 -march=rv64gc"
```

```bash
# Compilar para RISC-V 64-bit (Multi-Thread 4 núcleos)
make PORT_LINUX=linux \
     CC=riscv64-linux-gnu-gcc \
     AR=riscv64-linux-gnu-ar \
     RANLIB=riscv64-linux-gnu-ranlib \
     XCFLAGS="-O2 -DMULTITHREAD=4 -DUSE_PTHREAD -pthread -march=rv64gc"
```
Si tu sistema es de 32 bits, cambia todos los prefijos `riscv64-` por `riscv32-`.


Como pequeño tip por si se pierde:


| Arquitectura | Prefijo del Toolchain | Flag de Arquitectura `(-march)`|
| ------------- | ------------- |------------- |
| ARM 64-bit | `aarch64-linux-gnu-` | `armv8-a` |
| ARM 32-bit | `arm-linux-gnueabihf-` | `armv7-a` (o `armv6` para RPi 1) |
| RISC-V 64-bit | `riscv64-linux-gnu-` | `rv64gc` |
| RISC-V 32-bit | `riscv32-linux-gnu-` | `rv32gc` |


Eso si, recordar que existen muchas variantes de RISC-V (RV32, RV64, con diferentes extensiones). Asegúrate de que tu toolchain coincida con la arquitectura exacta de tu placa. Si tu placa usa un perfil bare-metal (sin Linux), necesitarás un porting diferente.


### 4. Calcular el IPC (Eficiencia por núcleo)
Busca en la terminal la línea que dice: **`Iterations/Sec : XXXXXX.XXXXXX`**. Este es tu puntaje Single-Core.

1. **Frecuencia Real:** Abre otra terminal y ejecuta `watch grep "cpu MHz" /proc/cpuinfo` para ver a qué velocidad exacta corrió tu CPU, tambien podrias ejecutar el clasico `htop` o `btop`. Supongamos que es **4200 MHz**. Nos interesa que esta frecuencia media sea sostenida durante el mayor tiempo posible debido a que a veces el CPU hace un "turbo" los primeros 2 segundos y luego baja.

3. **La Fórmula del IPC:**
```
   La Fórmula del IPC:

          Iterations/Sec (Single)
  IPC = -------------------------
            Frecuencia en MHz
```
**A modo de ejemplo con un núcleo Zen2:**
Si obtienes **18,900 Iterations/Sec** y tu frecuencia es **4,200 MHz**:
```
18,900 Iterations/Sec
    --------------------- = 4.5 CoreMark/MHz
          4,200 MHz
```
*(Esto dice que, en promedio, el procesador está terminando 4.5 instrucciones por cada ciclo de reloj en un solo núcleo).*

---

### 5. Compilar y ejecutar para varios núcleos (Multi-Thread)
Ahora vamos a borrar la compilación anterior y a preparar la prueba multihilo para ver el poder total de tu procesador.

```bash
# Limpiamos la compilación anterior
make clean

# Compilamos activando MULTITHREAD con X numero de hilos del sistema detectados:
make XCFLAGS="-DMULTITHREAD=$(nproc) -DUSE_PTHREAD -pthread"
```

Ejecutamos la prueba multihilo con los mismos parámetros, revisa la carpeta donde tienes el binario, en mi caso de compilacion termina con un .exe, esto no es un archivo de windows por si las dudas, es un binario ELF (Linux Executable) que se acaba de compilar específicamente para tu procesador y tu sistema, en mi caso Debian.

```bash
./coremark.exe 0x3415 0x3415 0x66 500000 7 1 2000
```

### 6. Calcular el escalado de núcleos
Vuelve a buscar la línea **`Iterations/Sec : XXXXXX.XXXXXX`** en el resultado de esta última prueba. Ahora vamos a cruzar ambos datos para ver qué tan bien escalan tus núcleos al trabajar en conjunto.

**La Fórmula:**
```
Factor de Escalado = Iterations/Sec (Multi) / Iterations/Sec (Single)
```

**Ejemplo con datos reales:**
*   **Single Core:** 29,455.08 Iterations/Sec.
*   **Multi Core (8 hilos):** 172,659.38 Iterations/Sec.

Si dividimos el resultado Multi entre el Single:
$$\frac{172,659}{29,455} \approx 5.86$$

Tendriamos un escalado de **5.86x**. *(Nota: Es completamente normal que en 8 núcleos el escalado no sea 8x perfecto debido a la sobrecarga del sistema y la compartición de caché/L3, por lo que un 5.86x es un resultado excelente y asi tambien podemos decirlo de configuraciones con mas nucleos, no es directamente proporcional al numero de hilos).*

### 7. Escalabilidad:
Sobre el tema de la escala podria decirse que si tu factor de escalado es:

- Cercano al número de núcleos FÍSICOS: Tu CPU está escalando de forma casi perfecta.
- Mayor al número de núcleos FÍSICOS (pero menor a los hilos): Estás viendo el beneficio real del SMT/Hyper-Threading (como el 5.86x en un 4 núcleos/8 hilos).
- Muy por debajo de los núcleos físicos: Probablemente tienes un cuello de botella en la temperatura (Thermal Throttling) o en el ancho de banda de la memoria RAM.

A continuacion presento mi tabla de procesadores donde he ejecutado tal cual estas pruebas:


| Procesador | Arquitectura | Núcleos/Hilos | Frecuencia Sostenida (MHz)| Versión GCC | Kernel Linux | Single-Core (It/s) | Multi-Core (It/s) | CoreMark/MHz (IPC)| Factor Escalado|
| ------------- | ------------- |------------- |------------- |------------- |------------- |------------- |------------- |------------- |
|Ryzen 3 4100|x86_64|4/8|~4090|14.2|6.19.8+deb13-amd64|29.455,08|172.659,38|7.20|5.86x|


Si quieres obtener datos rapidos:

- Procesador y Núcleos: `lscpu | grep -E "Model name|CPU\(s\):|Thread\(s\) per core"`

- Kernel: `uname -a`

- Versión de GCC: `gcc --version | head -n 1`

- Frecuencia exacta durante el test: `watch -n 1 "grep 'cpu MHz' /proc/cpuinfo"` (mira la terminal mientras corre el benchmark).


