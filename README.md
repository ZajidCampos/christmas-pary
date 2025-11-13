# 🎄 Techno Posada 2025

Landing page para la posada navideña más electrónica de Zapopan, Jalisco.

## 🚀 Características

- ✨ **Landing page moderna** con diseño techno navideño
- 🎫 **Sistema RSVP gratuito** con Firebase Firestore
- 🏠 **Gestión de hospedaje** para personas de otra ciudad (máx. 12)
- 🚌 **Tour a Tequila** opcional el 21 de diciembre
- 📊 **Estadísticas en tiempo real** de confirmaciones
- 🎨 **Diseño responsive** optimizado para mobile
- 🔒 **Validación de emails** para evitar duplicados

## 🛠 Tecnologías

- **Next.js 16** con App Router y Turbopack
- **TypeScript** con modo strict
- **Tailwind CSS** para estilos
- **Firebase** (Firestore + Analytics)
- **Clean Architecture** (Domain/Data/Controllers/UI)

## 📁 Estructura del proyecto

```
src/
├── domain/          # Entidades del negocio
│   └── entities/
├── data/           # Repositorios y servicios
│   ├── repositories/
│   └── services/
├── controllers/    # Lógica de negocio
├── ui/            # Componentes React
│   └── components/
└── lib/           # Utilidades y configuración
    ├── firebase.ts
    └── hooks.ts
```

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ZajidCampos/christmas-pary.git

# Instalar dependencias
cd christmas-pary
npm install

# Configurar variables de entorno
# Copia .env.example a .env.local y agrega tus credenciales de Firebase
cp .env.example .env.local
# Edita .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔥 Configuración de Firebase

Ver [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) para instrucciones detalladas.
Ver [ENV_SETUP.md](./ENV_SETUP.md) para configuración de variables de entorno.

1. El proyecto usa variables de entorno para Firebase (`.env.local`)
2. Verifica tu configuración: `npm run verify-env`
3. Asegúrate de configurar las reglas de Firestore
4. Las estadísticas se actualizan en tiempo real

## 📦 Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run verify-env   # Verificar variables de entorno
```

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 🎨 Componentes principales

- **Hero**: Banner principal con CTA
- **Features**: Experiencias del evento (ponche, piñata, DJ, hospedaje)
- **Schedule**: Timeline del evento
- **TequilaTour**: Info del tour a Tequila Jalisco
- **Location**: Mapa y ubicación del venue
- **RSVPSection**: Formulario y estadísticas
- **RSVPForm**: Formulario de confirmación con Firebase

## 📊 Datos almacenados

Cada RSVP guarda:
- Nombre y email
- Ciudad de origen
- Número de invitados
- Necesidad de hospedaje
- Interés en tour a Tequila
- Restricciones alimentarias
- Mensaje opcional

## 🔐 Seguridad

Las credenciales de Firebase están en el código (esto es seguro y normal). La seguridad real está en las **Firestore Security Rules**.

## 📝 TODO

- [ ] Panel de administración
- [ ] Exportación de lista a CSV
- [ ] Notificaciones por email
- [ ] Implementar límite de capacidad
- [ ] Dashboard con gráficas

## 👨‍💻 Autor

**Zajid Campos**
- GitHub: [@ZajidCampos](https://github.com/ZajidCampos)

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

**Fecha del evento**: 19 de Diciembre, 2025  
**Capacidad**: 30 personas  
**Tour a Tequila**: 21 de Diciembre, 2025

🎵 ¡Nos vemos en la pista! 🎄
