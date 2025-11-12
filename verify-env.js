/**
 * Script de verificación de variables de entorno
 * Ejecutar: node verify-env.js
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'
];

console.log('🔍 Verificando variables de entorno de Firebase...\n');

// Cargar .env.local
require('dotenv').config({ path: '.env.local' });

let allPresent = true;

requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: NO ENCONTRADA`);
    allPresent = false;
  }
});

console.log('\n---');

if (allPresent) {
  console.log('✅ Todas las variables de entorno están configuradas correctamente!');
  console.log('🚀 Puedes ejecutar: npm run dev');
} else {
  console.log('❌ Faltan algunas variables de entorno.');
  console.log('💡 Asegúrate de tener un archivo .env.local con todas las credenciales de Firebase.');
  process.exit(1);
}
