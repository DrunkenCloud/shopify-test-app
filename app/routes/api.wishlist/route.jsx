import { json } from "@remix-run/node";
import db from '../../db.server'

export function loader() {
    return json({
        ok: true,
        message: "Hello from API"
    })
}

export async function action({ request }) {
    const method = request.method;
    let data = await request.formData()

    data = Object.fromEntries(data);
    const customerId = data.customerId;
    const productId = data.productId;
    const shop = data.shop;

    if (!customerId || !productId | !shop) {
        return {
            message: "Missing Data! Required Data: cusomterId, productId, shop",
            method: method
        }
    }

    switch (method) {
        case "POST":
            const wishlist = await db.wishlist.create({
                data: {
                    customerId,
                    productId,
                    shop
                }
            })

            const response = json({ message: "Product added to wishlist.", method: "POST", wishlist: wishlist });
            return response
        case "PATCH":
            return json({ message: "Success", method: "PATCH"})
        default:
            return new Response("Method not allowed!", { status: 405 })
    }
}