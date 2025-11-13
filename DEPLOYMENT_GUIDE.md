# 🚀 Guía de Despliegue a Firebase

## ✅ Sitio Desplegado

**URL del sitio:** https://posada-32e4e.web.app

**Consola de Firebase:** https://console.firebase.google.com/project/posada-32e4e/overview

---

## 📦 Comandos para Futuros Despliegues

### 1. Construir el Proyecto
```bash
npm run build
```

### 2. Desplegar a Firebase Hosting
```bash
firebase deploy --only hosting
```

### 3. Desplegar Reglas de Firestore (si las modificaste)
```bash
firebase deploy --only firestore:rules
```

### 4. Desplegar Todo
```bash
firebase deploy
```

---

## 🔄 Workflow Completo de Actualización

Cuando hagas cambios al proyecto:

```bash
# 1. Asegúrate de que todo funciona localmente
npm run dev

# 2. Construye el proyecto
npm run build

# 3. Despliega a Firebase
firebase deploy --only hosting

# 4. Verifica el sitio
# Abre: https://posada-32e4e.web.app
```

---

## ⚙️ Configuración Aplicada

### Next.js (`next.config.ts`)
```typescript
{
  output: 'export',  // Exportación estática
  images: {
    unoptimized: true,  // Imágenes sin optimización (necesario para export)
  }
}
```

### Firebase (`firebase.json`)
```json
{
  "hosting": {
    "public": "out",  // Carpeta de build de Next.js
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"  // SPA routing
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

---

## 🗂️ Estructura de Archivos de Deployment

```
.
├── .firebaserc          # Configuración del proyecto Firebase
├── firebase.json        # Configuración de hosting y firestore
├── firestore.rules      # Reglas de seguridad de Firestore
├── firestore.indexes.json  # Índices de Firestore
├── next.config.ts       # Configuración de Next.js
└── out/                 # Carpeta de build (generada automáticamente)
```

---

## 🔥 Variables de Entorno en Producción

Asegúrate de que tu archivo `.env.local` tenga las credenciales correctas:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=posada-32e4e.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=posada-32e4e
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=posada-32e4e.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
```

**Nota:** Las variables `NEXT_PUBLIC_*` se embeben en el build, por lo que cualquier cambio requiere un nuevo build y deploy.

---

## 🎯 Comandos Útiles

### Ver logs de Firebase
```bash
firebase hosting:logs
```

### Ver dominios configurados
```bash
firebase hosting:sites:list
```

### Conectar dominio personalizado
1. Ve a la consola: https://console.firebase.google.com/project/posada-32e4e/hosting
2. Click en "Agregar dominio personalizado"
3. Sigue las instrucciones para configurar DNS

### Rollback a versión anterior
```bash
firebase hosting:clone SOURCE_SITE_ID:SOURCE_VERSION_ID TARGET_SITE_ID
```

---

## ⚡ Optimizaciones Aplicadas

✅ Exportación estática (más rápido)
✅ Imágenes optimizadas
✅ CSS/JS minificado automáticamente
✅ CDN global de Firebase
✅ HTTPS automático
✅ Reglas de Firestore configuradas

---

## 🐛 Troubleshooting

### Error: "The element has no supported sources"
- Asegúrate de agregar URLs válidas de audio en `BackgroundMusic.tsx`

### Error: Build failed
- Revisa errores de TypeScript con `npm run build`

### Firestore no funciona
- Verifica que las reglas estén desplegadas: `firebase deploy --only firestore:rules`
- Revisa la consola de Firebase para errores

### Cambios no se reflejan
- Haz hard refresh: `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Windows)
- Limpia caché: `firebase hosting:disable` → `firebase hosting:enable`

---

## 📱 URLs del Proyecto

- **Sitio Web:** https://posada-32e4e.web.app
- **Consola Firebase:** https://console.firebase.google.com/project/posada-32e4e
- **Firestore Database:** https://console.firebase.google.com/project/posada-32e4e/firestore

---

## 🎉 ¡Listo!

Tu sitio está en vivo y funcionando. Cada vez que hagas cambios:

1. `npm run build`
2. `firebase deploy --only hosting`
3. Espera ~30 segundos
4. Refresca la página

**Tip:** Firebase mantiene historial de versiones, puedes hacer rollback en cualquier momento desde la consola.
