import { generateAccessToken } from "@/actions/get-paypal-token";
import { NextResponse } from "next/server";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID as string;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET as string;
const base = process.env.PAYPAL_BASEURL as string;

export async function POST(req: Request) {
    try {

        const { price } = await req.json();

        /**
         * Create an order to start the transaction.
         * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
         */
        const createOrder = async () => {
    
            const accessToken = await generateAccessToken(base, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
            const url = `${base}/v2/checkout/orders`;
            const payload = {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: price,
                        },
                    },
                ],
            };

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                method: "POST",
                body: JSON.stringify(payload),
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


        const { jsonResponse } = await createOrder();


        return NextResponse.json(jsonResponse);

    } catch (error) {
        console.log("[PAYPAL_SUBSCRIPTION]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}