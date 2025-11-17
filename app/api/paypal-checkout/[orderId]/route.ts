import { generateAccessToken } from "@/actions/get-paypal-token";
import { NextResponse } from "next/server";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID as string;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET as string;
const base = process.env.PAYPAL_BASEURL as string;

export async function POST(req: Request, { params: { orderId } }: { params: { orderId: string } }) {
    try {

        /**
         * Capture payment for the created order to complete the transaction.
         * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
         */
        const captureOrder = async (orderID: string) => {
            const accessToken = await generateAccessToken(base, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
            const url = `${base}/v2/checkout/orders/${orderID}/capture`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return handleResponse(response);
        };

        const handleResponse = async (response: any) => {
            try {
                const jsonResponse = await response.json();
                return {
                    jsonResponse,
                    httpStatusCode: response.status,
                };
            } catch (err) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        };


        const { jsonResponse } = await captureOrder(orderId);


        return NextResponse.json(jsonResponse);

    } catch (error) {
        console.log("[PAYPAL_CAPTURE_ORDER]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}