# 🔐 Variables de Entorno

Este proyecto utiliza variables de entorno para mantener las credenciales de Firebase seguras.

## 📁 Archivos

- **`.env.local`** - Contiene las credenciales reales (NO se sube a Git)
- **`.env.example`** - Template con nombres de variables (SÍ se sube a Git)
- **`verify-env.js`** - Script de verificación

## ✅ Verificar configuración

```bash
npm run verify-env
```

Este comando verifica que todas las variables de Firebase estén configuradas.

## 🔧 Configuración inicial

Si clonas el proyecto por primera vez:

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env.local
```

2. Edita `.env.local` con tus credenciales de Firebase:
```bash
nano .env.local  # o usa tu editor favorito
```

3. Verifica que todo esté bien:
```bash
npm run verify-env
```

4. Inicia el servidor:
```bash
npm run dev
```

## 🔥 Obtener credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto
3. Ve a **Project Settings** (⚙️ icono de engranaje)
4. En la sección **Your apps**, selecciona tu app web
5. Copia las credenciales del `firebaseConfig`
6. Pégalas en `.env.local`

## 🚨 Importante

- ✅ `.env.local` está en `.gitignore` - no se subirá a Git
- ✅ Las variables que empiezan con `NEXT_PUBLIC_` son accesibles en el frontend
- ✅ Esto es seguro porque Firebase usa Firestore Security Rules para proteger los datos
- ❌ Nunca subas `.env.local` a repositorios públicos
- ❌ Nunca compartas tus credenciales por mensajes/email

## 📋 Variables requeridas

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

## 🐛 Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"
- Revisa que `NEXT_PUBLIC_FIREBASE_API_KEY` esté correcta
- Asegúrate de que no tenga espacios extra

### Error: "Cannot find module 'firebase/app'"
- Ejecuta: `npm install firebase`

### Las variables no se cargan
- Next.js necesita reiniciarse después de cambiar `.env.local`
- Ejecuta `npm run dev` de nuevo

### Script verify-env falla
- Instala dotenv: `npm install --save-dev dotenv`
- Asegúrate de tener el archivo `.env.local` en la raíz

## 🔄 En producción (Vercel/Netlify)

Si despliegas en Vercel, Netlify u otro servicio:

1. Ve a la configuración de tu proyecto
2. Agrega las variables de entorno en el dashboard
3. Usa los mismos nombres que en `.env.local`
4. Redespliega tu aplicación

En Vercel:
```
Project Settings → Environment Variables → Add New
```

## 📚 Más información

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
