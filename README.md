TIENDA DE ROPA ONLINE - REACT NATIVE
=====================================

Descripción:
------------
Proyecto de tienda de ropa online desarrollado en React Native con Expo.
Aplicación móvil para compra de ropa con catálogo, carrito y sistema de usuarios.

Estado: En desarrollo

Instalación:
------------
1. Clonar repositorio
2. npm install
3. npx expo start

ADVERTENCIAS IMPORTANTES:
-------------------------

1. CONFIGURACIÓN DE IP:
   - DEBES CAMBIAR la IP en estos archivos:
     * LoginScreen.js
     * HomeScreen.js
     * ClClothes.js
     * ManScreen.js
     * WomenScreen.js
     * ShCartScreen.js

   - Buscar y reemplazar esta línea:
     const response = await fetch('http://10.90.3.94:3000/users');

   - Por tu IP local (ver con ipconfig en cmd):
     const response = await fetch('http://TU_IP_LOCAL:3000/users');

2. REQUISITOS DE RED:
   - El dispositivo móvil y la PC deben estar en la misma red WiFi
   - La IP debe ser la de la PC, no localhost

3. PROBLEMAS COMUNES EXPO:
   - Si falla una versión de Expo, probar otras:
     npx expo start
     npx expo start --android
     npx expo start --ios
     npx expo start --tunnel

Estructura:
-----------
/src
  /components
  /screens
  /data
    db.json

Pantallas:
----------
- Login
- Home
- Catálogo Hombres
- Catálogo Mujeres
- Carrito
- Perfil

Tecnologías:
------------
- React Native
- Expo
- JavaScript
- JSON Server (base de datos local)

Desarrolladores:
----------------
[Tu nombre/información de contacto]

Notas:
------
Proyecto en fase de desarrollo. La navegación funciona con botones, próximamente se implementará React Navigation.
