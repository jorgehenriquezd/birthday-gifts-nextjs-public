"use client"

import React, { useContext, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { formatPrice } from "@/utils/formatPrice";
import { LoaderCircle } from "lucide-react";

interface PaymentButtonProps {
    products: any[]
    amount: number;
    buttonText: string;
}

// ==== PROD ====
const PAYPAL_CLIENT_ID="COLOCA_TU_CLIENT_ID_AQUI"

const PaymentButton = ({ amount, products, buttonText }: PaymentButtonProps) => {
    const initialOptions: ReactPayPalScriptOptions = {
        "clientId": PAYPAL_CLIENT_ID,
        "enable-funding": "card",
        "disable-funding": "paylater,venmo",
        "data-sdk-integration-source": "integrationbuilder_sc",
    };

    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);


    // Función separada para crear la orden - debe retornar Promise<string>
    const createOrder = async (): Promise<string> => {
        try {

            const response = await fetch("/api/paypal-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ price: amount }),
            });

            const orderData = await response.json();

            if (orderData.id) {
                return orderData.id; // Retorna el ID de la orden
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            toast.error(`Ha ocurrido un error, intenta de nuevo`);
            throw error; // Importante: relanzar el error
        }
    }

    // Función para el botón inicial - maneja la apertura del modal
    const handleInitialClick = async () => {
        setIsLoading(true);
        try {
            await createOrder(); // Creamos la orden
            setOpenModal(true); // Abrimos el modal si todo sale bien
        } catch (error) {
            // El error ya fue manejado en createOrder
        } finally {
            setIsLoading(false);
        }
    }

    // Función para manejar la compra exitosa
    const handleSuccessfulPayment = async (orderData: any, transaction: any) => {
        try {
            const purchaseData = {
                orderId: orderData.id,
                total: amount,
                name: `${orderData.payer.name.given_name} ${orderData.payer.name.surname}`,
                email: orderData.payer.email_address,
                products,
            }

    
             toast.success('Yorch ha recibido tu regalo. ¡Muchas gracias!');

        } catch (error) {
            console.error('Error processing purchase:', error);
            toast.error('Error al procesar la compra');
        }
    }

    return (
        <>
            <Dialog onOpenChange={(e) => setOpenModal(e)} open={openModal}>
                <button
                    onClick={handleInitialClick}
                    disabled={isLoading}
                    className="w-full glass cursor-pointer text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-white/30 active:scale-95 text-base shadow-lg"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <LoaderCircle className="w-4 h-4 animate-spin mr-2"/>
                            Procesando...
                        </div>
                    ) : (
                        <div className="px-6">{buttonText}</div>
                    )}
                </button>

                <DialogContent className="lg:w-md md:w-md w-full">
                    <DialogHeader>
                        <DialogTitle>Enviar Regalo</DialogTitle>
                    </DialogHeader>

                    <div className="text-center py-6">
                        <p className="text-2xl">Monto</p>
                        <h4 className="text-[35px] font-semibold">{formatPrice(amount)}</h4>
                    </div>

                    {/* ======== PAYPAL ======== */}
                    <div className="mb-4">
                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons
                                style={{
                                    shape: "pill",
                                    layout: "vertical",
                                    color: "silver",
                                    label: "pay"
                                }}
                                createOrder={createOrder}
                                onApprove={async (data, actions) => {
                                    try {
                                        const response = await fetch(
                                            `/api/paypal-checkout/${data.orderID}`,
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                            },
                                        );

                                        const orderData = await response.json();
                                        const errorDetail = orderData?.details?.[0];

                                        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                            return actions.restart();
                                        } else if (errorDetail) {
                                            throw new Error(
                                                `${errorDetail.description} (${orderData.debug_id})`,
                                            );
                                        } else {
                                            const transaction = orderData.purchase_units[0].payments.captures[0];

                                            // Procesar la compra exitosa
                                            await handleSuccessfulPayment(orderData, transaction);
                                            
                                        }


                                    } catch (error) {
                                        console.error('Payment error:', error);
                                        toast.error('Ha ocurrido un error, intenta de nuevo');
                                    }
                                }}
                                onError={(error) => {
                                    console.error('PayPal error:', error);
                                    toast.error('Error en el proceso de pago');
                                }}
                                onCancel={() => {
                                    toast.error('Pago cancelado');
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default PaymentButton;