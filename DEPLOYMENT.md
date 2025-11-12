# 🚀 Guía de Despliegue

## Despliegue en Vercel (Recomendado)

Vercel es la plataforma oficial de Next.js y la más fácil para desplegar.

### Opción 1: Despliegue desde GitHub

1. **Conecta tu repositorio a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js

2. **Configura las variables de entorno:**
   - En el dashboard de Vercel, ve a "Settings" → "Environment Variables"
   - Agrega cada variable de `.env.local`:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
     NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu-measurement-id
     ```

3. **Deploy:**
   - Click en "Deploy"
   - Espera a que termine el build (~2-3 minutos)
   - Tu sitio estará en: `https://tu-proyecto.vercel.app`

### Opción 2: Despliegue desde CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# Login
vercel login

# Desplegar
vercel

# Agregar variables de entorno
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Repite para cada variable

# Desplegar a producción
vercel --prod
```

## Despliegue en Netlify

1. **Conecta tu repositorio:**
   - Ve a [netlify.com](https://netlify.com)
   - Click en "Add new site" → "Import an existing project"
   - Conecta con GitHub y selecciona tu repo

2. **Configura el build:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Netlify detectará Next.js automáticamente

3. **Variables de entorno:**
   - Ve a "Site settings" → "Environment variables"
   - Agrega todas las variables de `.env.local`

4. **Deploy:**
   - Click en "Deploy site"
   - Tu sitio estará disponible en minutos

## Despliegue en Railway

1. **Conecta tu repositorio:**
   - Ve a [railway.app](https://railway.app)
   - Click en "New Project" → "Deploy from GitHub repo"

2. **Configura variables:**
   - En el dashboard, ve a "Variables"
   - Agrega cada variable de `.env.local`

3. **Deploy:**
   - Railway desplegará automáticamente
   - Obtendrás una URL: `https://tu-proyecto.up.railway.app`

## Configuración Post-Deploy

### 1. Firestore Security Rules

Actualiza las reglas de Firestore para permitir acceso desde tu dominio de producción:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{document=**} {
      allow read: if true;
      allow create: if request.auth == null && 
                    request.resource.data.keys().hasAll(['name', 'email', 'city', 'guests']);
      allow update, delete: if false;
    }
  }
}
```

### 2. Firebase App Check (Opcional pero recomendado)

Para mayor seguridad en producción:

1. Ve a Firebase Console → Build → App Check
2. Registra tu dominio de producción
3. Obtén el site key
4. Agrega a tu código (ver docs de Firebase)

### 3. Analytics

Si usas Firebase Analytics, agrega tu dominio de producción a la lista permitida:

1. Firebase Console → Analytics
2. Settings → Data Streams
3. Agrega tu dominio de producción

## Dominios Personalizados

### Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio
4. Configura los DNS según las instrucciones

### Netlify

1. Site settings → Domain management
2. Add custom domain
3. Sigue las instrucciones de DNS

## Variables de Entorno por Ambiente

Puedes tener diferentes valores para development, preview y production:

**Vercel:**
- Development: Variables usadas en `vercel dev`
- Preview: Variables para branches que no son main
- Production: Variables para main/master branch

## Troubleshooting

### Build falla con error de variables de entorno
- ✅ Verifica que todas las variables estén en el dashboard
- ✅ Los nombres deben coincidir exactamente (case-sensitive)
- ✅ Re-deploy después de agregar variables

### Firebase no conecta en producción
- ✅ Verifica las Firestore Security Rules
- ✅ Agrega tu dominio a Firebase Console
- ✅ Revisa los logs en la consola del navegador

### Sitio carga pero no guarda RSVPs
- ✅ Verifica las reglas de Firestore
- ✅ Revisa Firebase Console → Firestore → Data
- ✅ Checa los logs del navegador (F12)

## Monitoreo

- **Vercel Analytics**: Incluido gratis con Vercel
- **Firebase Analytics**: Ve Firebase Console → Analytics
- **Uptime Monitoring**: Usa [UptimeRobot](https://uptimerobot.com) (gratis)

## Costos

- ✅ **Vercel Free Tier**: 100GB bandwidth/mes
- ✅ **Firebase Spark Plan**: 1GB storage, 10GB transfer/mes
- ✅ **Netlify Free**: 100GB bandwidth/mes

Para este proyecto, el tier gratuito es más que suficiente.

## Actualizaciones

Cada vez que hagas push a `main`, se desplegará automáticamente:

```bash
git add .
git commit -m "feat: nueva feature"
git push origin main
# 🚀 Vercel/Netlify desplegará automáticamente
```

## Rollback

Si algo sale mal:

**Vercel:**
1. Ve a tu proyecto → Deployments
2. Encuentra un deployment anterior que funcione
3. Click en "..." → "Promote to Production"

**Netlify:**
1. Ve a Deploys
2. Encuentra el deploy que funciona
3. Click en "Publish deploy"

---

¡Tu proyecto está listo para el mundo! 🎉

Para más ayuda: [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
