# Firebase Setup - Techno Posada 2025

## Configuración de Firebase

Este proyecto utiliza Firebase para almacenar los datos de los RSVPs (confirmaciones de asistencia).

### Características implementadas

- ✅ **Firestore Database**: Almacenamiento de confirmaciones de asistencia
- ✅ **Analytics**: Seguimiento de eventos y usuarios
- ✅ **Validación de emails**: Prevención de registros duplicados
- ✅ **Estadísticas en tiempo real**: Contador de confirmados, espacios disponibles y hospedaje

### Estructura de datos

#### Colección: `rsvps`

Cada documento contiene:

```typescript
{
  name: string;              // Nombre completo del asistente
  email: string;             // Email (único)
  city: string;              // Ciudad de origen
  needsAccommodation: boolean;  // Si necesita hospedaje
  interestedInTequilaTour: boolean;  // Si está interesado en el tour
  guests: number;            // Número de invitados (1-5+)
  dietaryRestrictions?: string;  // Restricciones alimentarias
  message?: string;          // Mensaje o comentarios
  createdAt: Timestamp;      // Fecha de registro
  status: string;            // Estado del RSVP (confirmed)
}
```

### Configuración inicial

1. **Instalar Firebase** (ya instalado)
   ```bash
   npm install firebase
   ```

2. **Configurar Firestore Database**
   - Ve a la consola de Firebase: https://console.firebase.google.com
   - Selecciona tu proyecto: `posada-32e4e`
   - Ve a "Firestore Database"
   - Crea una base de datos en modo **producción**
   - Configura las reglas de seguridad

3. **Reglas de seguridad sugeridas para Firestore**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de RSVPs para las estadísticas
    match /rsvps/{document=**} {
      allow read: if true;
      allow create: if request.auth == null && 
                    request.resource.data.keys().hasAll(['name', 'email', 'city', 'guests']) &&
                    request.resource.data.email is string &&
                    request.resource.data.email.size() > 0;
      allow update, delete: if false; // Solo admin puede editar/borrar
    }
  }
}
```

### Servicios disponibles

El `FirebaseService` proporciona los siguientes métodos:

- `saveRSVP(data)`: Guardar una nueva confirmación
- `getAllRSVPs()`: Obtener todas las confirmaciones
- `getRSVPsNeedingAccommodation()`: Obtener RSVPs que necesitan hospedaje
- `getRSVPsInterestedInTour()`: Obtener RSVPs interesados en el tour a Tequila
- `getRSVPStats()`: Obtener estadísticas agregadas
- `checkEmailExists(email)`: Verificar si un email ya está registrado

### Componentes actualizados

- **RSVPForm**: Ahora guarda en Firebase en lugar de simular el envío
- **RSVPSection**: Obtiene estadísticas en tiempo real de Firebase
- Las estadísticas se actualizan automáticamente después de cada nuevo RSVP

### Panel de administración (futuro)

Para ver y gestionar los RSVPs, considera crear:

1. Una página de admin protegida (`/admin`)
2. Exportación a CSV/Excel
3. Dashboard con gráficas
4. Sistema de notificaciones por email

### Próximos pasos sugeridos

1. ✅ Configurar autenticación de admin (Firebase Auth)
2. ✅ Crear página de administración
3. ✅ Agregar notificaciones por email (Firebase Cloud Functions + SendGrid/Mailgun)
4. ✅ Implementar límite de capacidad real (rechazar si está lleno)
5. ✅ Agregar exportación de lista de asistentes

### Variables de entorno

✅ **El proyecto ya está configurado con variables de entorno**

Las credenciales de Firebase están en `.env.local` (no se suben a Git por seguridad).

**Para configurar en tu proyecto:**

1. Las variables ya están en `.env.local`
2. Si no existe, copia `.env.example` a `.env.local` y agrega tus credenciales
3. El archivo `src/lib/firebase.ts` usa automáticamente estas variables:

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
```

**Nota:** En Next.js, las variables que empiezan con `NEXT_PUBLIC_` son accesibles en el frontend.

### Seguridad

⚠️ **Importante**: Las credenciales de Firebase están expuestas en el código frontend (esto es normal y seguro siempre que configures correctamente las reglas de Firestore). Las API keys de Firebase se usan para identificar tu proyecto, no para autenticación.

La seguridad real viene de las **Firestore Security Rules**, no de ocultar las API keys.
