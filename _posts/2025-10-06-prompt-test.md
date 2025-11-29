---
layout: post
title: "Prompts de testing para evaluar el razonamiento de SLM"
author: "Luis"
tags: Ensayo
comments: true
---

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/llm-local-meme.jpg" | relative_url }}"
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

El objetivo de este post es empezar a anotar algunas ideas referente al testing de SLM ejecutados de forma local. La finalidad como tal es tener una lista prompt con un metodo que me permita evaluar las respuestas a el caso planteado en diversas areas. De momento el matiz es simplemente dividir por areas, aunque no descarto hacer combinaciones generales por niveles de “madurez en inteligencia” hasta simplemente un repaso general de habilidades. El tema de la puntuacion esta todavia dando vueltas en mi cabeza debido a que el cerebro humano puede caer en cierta subjetividad, empero, en el apartado de literatura y creatividad puede ser directamente la mayor ventaja frente al analisis asistido por computadora.

Teniendo en cuenta eso, de momento el primer punto lo dedicare a cuestiones que he titulado:
<br>
<br>

# Tabla de Contenido
- [1. Prueba de escritura, diseño y creatividad](#p1)
  - [1.1 Escritura Creativa](#p1.1)
  - [1.2 Poesía](#p1.2)
  - [1.3 Diálogo](#p1.3)
  - [1.4 Generación de Ideas](#p1.4)
  - [1.5 Adaptación de Género](#p1.5)
  - [1.6 Metáfora Técnica](#p1.6)
  - [1.7 Parodia/Estilo Satírico](#p1.7)
  - [1.8 Documentación Técnica](#p1.8)
- [2. Razonamiento Lógico y Solución de Problemas](#p2)
  - [2.1 Lógica y Deducción](#p2.1)
  - [2.2 Lógica y Deducción](#p2.2)
<br>
<br>
<br>



## <a id="p1"></a>1. Prueba de escritura, diseño y creatividad

<div style="text-align: center;">
    <img
        src="{{ "/assets/images/llm-local-meme_2.jpg" | relative_url }}"
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

En este apartado la finalidad es poner aprueba la capacidad creativa del SLM, su capacidad de diseño frente textos y la comprensión de restricciones específicas. Todo gira alrededor de principalmente la coherencia y la calidad linguistica que logra ejercer a la hora de las respuestas.

### <a id="p1.1"></a>1.1 Escritura Creativa
Para este primer punto nuestro objetivo es evaluar la concisión narrativa, la construcción de una atmósfera y la capacidad de generar impactos literarios.
```
Escribe un microrrelato de máximo 150 palabras donde un bibliotecario encuentra un libro del cual no sabia de su existencia y no tiene autor, pero que contiene la historia de su vida futura. El tono debe ser de misterio y debe incluir un giro inesperado en la última frase.
```

### <a id="p1.2"></a>1.2 Poesía
De plano niego que un LLM pueda generar algo que conecte con la experiencia humana en forma de poesía, pero ponerlo a prueba en el mundo del lenguje para llevarlo a su limite no es mala idea, como tal la interpretacion semantica es aquí fundamental para llevar a cabo la tarea. Luego esta el tema de los conceptos abstractos: ¿Entiende realmente qué es una “elegía” y puede aplicarla a un concepto no-físico como una "versión de uno mismo"? O tambien puede ser que sigua el tono de "lamento" y se centra en la "carga de los caminos no tomados", como tambien se puede desvíar a una simple lista de "qué hubiera pasado si…". Este prompt va para esa coyuntura en especifico, una especie de medidor frente a conceptos que de plano ni siquiera son claros en los tiempos actuales. Aqui lo mas importante es evaluar la sensibilidad para abordar conceptos de identidad, arrepentimiento y la naturaleza multifacética del “yo”.
```
Escribe una elegía no por una persona muerta, sino por una versión de uno mismo que nunca llegó a existir: el “yo” que tomó otras decisiones, el “yo” que vivió en otra ciudad. El poema debe reflejar sobre la carga de los caminos no tomados y la identidad como una construcción de posibilidades perdidas.
```

### <a id="p1.3"></a>1.3 Diálogo
Para este punto se va a evaluar la creatividad para personificar ideas, el uso del diálogo como una batalla ideológica y la habilidad de hacer que conceptos abstractos parezcan reales y creíbles.
```
Escribe un diálogo entre dos conceptos abstractos personificados: 'La Procrastinación' (un personaje carismático, relajado y convincente) y 'La Disciplina' (un personaje rígido, predecible y un poco aburrido). El tema de su discusión es el alma de un estudiante que tiene una entrega importante para el día siguiente.
```

### <a id="p1.4"></a>1.4 Generación de Ideas
Evaluar originalidad, fusión de dominios dispares y viabilidad conceptual.
```
Diseña 4 conceptos para “aulas del futuro” que no usen tecnología tradicional (pantallas, tablets). Enfócate en el diseño del espacio, la interacción humana y la naturaleza para mejorar el aprendizaje y la colaboración.
```

### <a id="p1.5"></a>1.5 Adaptación de Género
Es una de las pruebas más divertidas y reveladoras para un SLM. Mide su comprensión profunda de los clichés, tonos y estructuras narrativas de dos géneros dispares y su capacidad para fusionarlos de forma coherente y creativa.
```
Toma el cuento de Caperucita Roja y reescribe la escena del bosque desde la perspectiva del lobo, pero como un empresario de startups que ve a Caperucita como una oportunidad de negocio. Mantén el tono satírico.
```


### <a id="p1.6"></a>1.6 Metáfora Técnica
Evaluar creatividad explicativa, analogía funcional y claridad conceptual disfrazada de narrativa.
```
Explica el funcionamiento de un contenedor Docker usando una metáfora basada en la cocina de un restaurante caótico.
```

### <a id="p1.7"></a>1.7 Parodia/Estilo Satírico
Evaluar tono irónico, crítica social implícita y coherencia en el género paródico.
```
Escribe un correo electrónico de RRHH anunciando el nuevo retiro de “Sinergia y Reinvención Radical”. Las actividades incluyen: una “caverna del silencio” donde los empleados meditan sobre sus KPIs, un taller de “desempaquetado de paradigmas” usando bloques de LEGO, y una “fogata de quiebre cognitivo” para quemar informes trimestrales antiguos. El tono debe ser de entusiasmo corporativo forzado y excesivo uso de neologismos de gestión.
```

### <a id="p1.8"></a>1.8 Documentación Técnica
Evaluar claridad técnica, precisión y capacidad de anticipar problemas con soluciones ingeniosas.
```
Elabora una guía de configuración inicial post-instalación para un servidor Debian 12. La guía debe cubrir estos tres puntos esenciales:
    1. Actualización del sistema: Realizar una actualización completa de todos los paquetes.
    2. Creación de un usuario administrador: Crear un nuevo usuario y otorgarle privilegios de sudo de forma segura, utilizando un archivo de configuración en /etc/sudoers.d/.
    3. Configuración del firewall: Instalar y activar ufw para permitir únicamente las conexiones SSH y denegar el resto por defecto
```
<br>
<br>

## <a id="p2"></a>2. Razonamiento Lógico y Solución de Problemas
<div style="text-align: center;">
    <img
        src="{{ "/assets/images/llm-local-meme_3.jpg" | relative_url }}"
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

En este apartado, el objetivo es evaluar la capacidad del modelo para comprender y manipular información abstracta, realizar cálculos numéricos, seguir cadenas de deducción y resolver problemas estructurados. Se busca no solo la exactitud del resultado final, sino también la claridad y validez del razonamiento que lleva a él. La evaluación se centra en la precisión, la coherencia lógica y la habilidad para aplicar reglas y principios de manera correcta.

### <a id="p2.1"></a>2.1 Lógica y Deducción

- Un breve prompt que juega con la idea de las densidades:
```
¿Qué pesa más, un kilo de plumas o un kilo de plomo?
```
- Cuestiones de lógica basica de acuerdo a la causa general de la afirmación:
```
Si todos los perros ladran y Fido es un perro, ¿qué hace Fido?
```
- Aqui debe identificar la falacia de la afirmación del consecuente. La premisa "Si A, entonces B" no implica "Si B, entonces A". La IA debe considerar otras causas posibles para el efecto (el suelo mojado), como un aspersor, un lavado de coches, etc. Demuestra que no asume la causa más obvia sin explorar alternativas:
```
Si llueve, entonces el suelo está mojado. Ahora, mira por la ventana y ves que el suelo está mojado. ¿Puedes concluir con certeza que está lloviendo? Explica tu razonamiento.
```
- La solución no está en la lógica pura del enunciado, sino en inferir una condición oculta. La respuesta es que el hombre es demasiado bajo para alcanzar el botón del piso 20, pero puede usar un paraguas para pulsarlo los días de lluvia. La IA debe conectar los dos hechos aparentemente inconexos (subir hasta el 10 y los días de lluvia) en una única explicación coherente:
```
Un hombre vive en el piso 20 de un edificio. Cada mañana, toma el ascensor para bajar. Al volver, sube en el ascensor hasta el piso 10 y luego sube los otros 10 pisos por las escaleras. La única excepción es los días que llueve, que sube directamente hasta el piso 20. ¿Por qué hace esto?
```
- La IA debe aplicar correctamente el principio de desplazamiento de fluidos. El hielo desplaza un volumen de agua cuyo peso es igual al suyo propio. Al derretirse, su volumen se reduce para ocupar exactamente ese espacio.La respuesta correcta es que el nivel se mantiene igual. Evalúa si la IA puede explicar el "porqué" de forma clara y correcta, no solo dar la respuesta por azar.
```
Tienes un vaso lleno de agua hasta el borde. Dentro del vaso flota un cubo de hielo. Cuando el hielo se derrita por completo, ¿el nivel del agua subirá y se derramará, bajará, o se mantendrá exactamente igual? Explica el porqué basándote en el principio de Arquímedes
```

### <a id="p2.2"></a>2.2 Problemas matemáticos

- Modelado de problemas de Distancia, Velocidad y Tiempo (D=VT) y resolución de ecuaciones lineales. Evalua la capacidad para establecer un sistema de coordenadas (por ejemplo, tomar la estación A como origen), calcular la distancia recorrida por el primer tren antes de que el segundo comience a moverse (la ventaja de tiempo), y luego aplicar el concepto de velocidad relativa para determinar el tiempo restante para el encuentro. La respuesta es que el tiempo de encuentro es 1.71 horas después de las 9:00 AM, es decir, a las 10:43 AM (aproximadamente).

```
Analiza el siguiente problema: Un tren sale de la estación A a las 8:00 AM y viaja a 60 km/h. Otro tren sale de la estación B, a 300 km de la estación A, a las 9:00 AM y viaja a 80 km/h en dirección a la estación A. ¿A qué hora se encontrarán? Piensa en voz alta y explica tu razonamiento.
```

- Problema de Tasa de Trabajo (Algebra), evalua la capacidad para traducir "tiempo para completar una tarea" a "tarea completada por hora" y luego combinar esas tasas. El "pensar en voz alta" revela si el modelo entiende este concepto clave o si simplemente aplica una fórmula memorizada.
La respuesta es 4 horas

```
Analiza el siguiente problema: Una grúa puede vaciar un contenedor de agua en 6 horas. Una segunda grúa, más pequeña, puede vaciar el mismo contenedor en 12 horas. Si ambas grúas trabajan juntas, ¿cuánto tiempo tardarán en vaciar el contenedor? Piensa en voz alta y explica tu razonamiento, definiendo cómo representas la 'tasa de trabajo' de cada grúa.
```
- Problema de Optimización (Geometría), hace uso de ecuaciones cuadráticas, conceptos de perímetro y área, y cálculo de vértices de una parábola (o completar el cuadrado). Para evaluar la capacidad para construir un modelo matemático a partir de una descripción física, identificar la relación entre las variables (largo y ancho) y formular una función de área que debe ser optimizada.
La respuesta es que las dimensiones que maximizan el área del jardín son 25 metros de largo y 12.5 metros de ancho, lo que da un área de 312.5 m².

```
Analiza el siguiente problema: Tienes 50 metros de valla para crear un jardín rectangular. Uno de los lados del jardín será una pared existente, por lo que solo necesitas vallar los otros tres lados. ¿Cuáles deben ser las dimensiones del jardín para maximizar su área? Explica tu proceso paso a paso, desde cómo planteas las ecuaciones hasta cómo encuentras el valor máximo.
```

- Problema de Probabilidad Condicional, hace uso de cálculos de probabilidades condicionales y comprensión del concepto de muestreo sin reemplazo. Sirve para ver la capacidad para descomponer el problema en casos mutuamente excluyentes (la primera fue roja O la primera fue azul) y calcular la probabilidad de cada camino. Demuestra si el modelo entiende que los eventos no son independientes.
La respuesta es que la probabilidad de que la segunda canica sea roja es de 5/8 (o 62.5%).
```
Analiza el siguiente problema: En una bolsa hay 5 canicas rojas y 3 canicas azules. Sacas una canica de la bolsa, anotas su color y no la devuelves. Luego, sacas una segunda canica. ¿Cuál es la probabilidad de que la segunda canica sea roja? Detalla tu razonamiento, explicando cómo cambia el universo de posibilidades después de la primera extracción.
```

- Problema Problema Lógico-Aritmético, mira la resolución de un sistema simple de ecuaciones lineales, nos permite ver la capacidad para traducir frases del lenguaje natural ("4 veces mayor") a una expresión matemática (y = 4x) y usar el proceso de eliminación lógica. Es una prueba excelente para ver si el modelo puede construir un argumento deductivo paso a paso.
La respuesta es el numero 28.
```
Analiza el siguiente problema: Estoy pensando en un número de dos dígitos. La suma de sus dígitos es 10. El dígito de las unidades es 4 veces mayor que el dígito de las decenas. ¿Qué número estoy pensando? Explica tu razonamiento en voz alta, mostrando cómo usas cada una de las pistas para acotar las posibilidades hasta llegar a la respuesta.
```
- Problema de Series Infinitas y Geometría Iterativa (Cálculo del Área de una Construcción Fractal). La resolución de este problema evalúa la capacidad para modelar un proceso geométrico iterativo (basado en la autosimilitud y la reducción de escala) como una serie matemática infinita. Para este caso, el modelo requiere identificar el patrón de la contribución del área en cada iteración. Luego necesita formular el área total como una serie infinita. Y ya por ultimo, aplicar el Criterio de la Divergencia (o las reglas de convergencia de series) para determinar si la suma de esa serie es un valor finito o infinito. Es una prueba excelente para ver si el modelo puede analizar el equilibrio entre el crecimiento exponencial (del número de cuadrados) y el decrecimiento exponencial (del área individual) en el límite infinito. Respuesta Esperada: Infinito (∞).

```
Analiza el siguiente problema con todo detalle:
Comienza con un único cuadrado que tiene un lado de 2 metros.
Iteración 1: Al centro de cada uno de sus 4 lados, le adosas un nuevo cuadrado. El lado de cada nuevo cuadrado es exactamente la mitad del largo del lado al que está adosado.
Iteración 2: Repites el proceso. Al centro de cada uno de los 4 lados de cada uno de los cuadrados que creaste en la iteración anterior, le adosas un nuevo cuadrado cuyo lado es, de nuevo, la mitad de su "padre".
Este proceso continúa infinitamente.
La pregunta es: ¿Cuál es el área total de la superficie de todos los cuadrados nuevos que se han añadido (sin contar el cuadrado original)?
Piensa en voz alta y explica tu razonamiento. Debes:
    1. Calcular el área total añadida en las primeras dos o tres iteraciones.
    2. Identificar el patrón y describirlo como una serie matemática.
    3. Analizar el comportamiento de esa serie para llegar a una conclusión final sobre si el área total es un número finito o infinito. Justifica tu conclusión.
```

- Problema de Lógica Deductiva Pura (Tipo Grid Puzzle o Zebra Puzzle). La resolución de este problema evalúa la capacidad para manejar y correlacionar múltiples conjuntos de variables (amigos, casas, colores, cócteles) mediante la aplicación rigurosa de restricciones posicionales y asociativas. Requiere: 1) Tabulación y Representación Mental/Explícita de las variables para seguir el estado de la solución. 2) La deducción lógica secuencial, pues debe usar una pista (un dato) para eliminar posibilidades y establecer nuevas asociaciones firmes, que a su vez se convierten en datos para la siguiente deducción. Ya por ultimo, debo hacer manejo de restricciones Negativas y Posicionales (por ejemplo, "no vive en", "inmediatamente a la derecha de", "al lado de"). Es una prueba excelente para la coherencia del razonamiento paso a paso y la gestión de la sobrecarga informativa. La respuesta esperada es: Benito (Persona) y Mojito (Cóctel). La solución requiere construir una tabla 5×4 (Posición, Nombre, Color, Cóctel) y llenarla progresivamente. El proceso comienza con las pistas más restrictivas (Benito en casa 4, Pisco Sour en casa 3) y luego se usa el par Ana-Casa Gris y el par Negroni-Margarita para encajar a los vecinos restantes.

| Posición (Casa) | 1 | 2 | 3 | 4 | 5 |
| :---: | :---: | :---: |:---: |:---: |:---: |
| Nombre | Darío | Ana | Carla | Benito | Elena |
| Color | Blanco | Azul | Gris | Verde | Rojo |
| Cóctel | Old Fashioned | Negroni | Pisco Sur | Mojito | Margarita |

```
Cinco amigos (Ana, Benito, Carla, Darío, y Elena) viven en una hilera de casas contiguas, numeradas del 1 al 5 de izquierda a derecha. Cada uno tiene un color de casa diferente (Azul, Blanco, Gris, Rojo, Verde) y prepara un tipo de cóctel secreto distinto (Margarita, Mojito, Negroni, Old Fashioned, Pisco Sour).
Tu objetivo es determinar quién vive en la casa con el color Verde y qué cóctel secreto prepara. Debes mostrar tu proceso de deducción paso a paso.
Pistas (Restricciones):
    1. Benito vive en la casa número 4.
    2. La casa de color Gris está inmediatamente a la derecha de la casa de Ana.
    3. La persona que prepara el Pisco Sour vive en la casa del medio (casa 3).
    4. La casa de Elena tiene el color Rojo.
    5. El que prepara el Old Fashioned vive en la casa número 1.
    6. La casa de color Blanco está al lado de la casa donde se prepara el Mojito.
    7. Darío no vive en la casa número 5 ni en la casa de color Azul.
    8. La persona que hace el Negroni vive en la casa inmediatamente a la izquierda del que prepara la Margarita.
    9. La persona que vive en la casa 2 tiene una casa de color Azul.
    10. Ana no prepara el Mojito.
```



## Cambios al articulo:

- 29/11/25: Hoy he cambiado el titulo del articulo, deje el viejo "Prompts para aproximarse a la capacidad de razonamiento de un SLM" por el nuevo, creo que ahora es mas precisio para mencionar lo que busco. Ademas añadi mas prompt para seguir explorando sus propias capacidades.
