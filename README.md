This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Como usar

Primero, instala las dependencias:

```bash
npm i
```

Crea un archivo .env y coloca las credenciales de Paypal:
https://developer.paypal.com/
```bash
PAYPAL_CLIENT_SECRET=AGREGA_TU_LLAVE
PAYPAL_BASEURL=https://api.paypal.com
```
Crea un archivo .env y coloca las credenciales de Paypal:
https://developer.paypal.com/
```bash
PAYPAL_CLIENT_ID=AGREGA_TU_LLAVE
PAYPAL_CLIENT_SECRET=AGREGA_TU_LLAVE
PAYPAL_BASEURL=https://api.paypal.com
```
Agrega el PAYPAL_CLIENT_ID en el componente app/components/PaymentButton.tsx
```bash
const PAYPAL_CLIENT_ID="COLOCA_TU_CLIENT_ID_AQUI"
```
Ejecuta el comando para levantar el servidor de desarrollo:
```bash
npm run dev
```

## Despliega en Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
