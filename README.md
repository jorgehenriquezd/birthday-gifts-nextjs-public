Desarrollado por [Yorch Dev](https://yorch-dev.com)

## Como usar
1) instala las dependencias:
```bash
npm i
```

2) Crea un archivo .env y coloca las credenciales de Paypal:
https://developer.paypal.com/
```bash
PAYPAL_CLIENT_ID=AGREGA_TU_LLAVE
PAYPAL_CLIENT_SECRET=AGREGA_TU_LLAVE
PAYPAL_BASEURL=https://api.paypal.com
```
3) Agrega el PAYPAL_CLIENT_ID en el componente app/components/PaymentButton.tsx
```bash
const PAYPAL_CLIENT_ID="COLOCA_TU_CLIENT_ID_AQUI"
```
4) Ejecuta el comando para levantar el servidor de desarrollo:
```bash
npm run dev
```

## Despliega en Vercel

Puedes desplegar tu aplicación de Nextjs en [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Chequea la [Documentación](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
