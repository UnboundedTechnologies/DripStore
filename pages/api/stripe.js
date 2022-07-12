import {Stripe} from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                mode : 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    {shipping_rate:'shr_1LKq9xIxe09MG8T5ltN6DtoE'},
                    {shipping_rate:'shr_1LKqC0Ixe09MG8T548ZOpeBa'}
                ],
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImg = img.replace('image-', 'https://cdn.sanity.io/images/7iov4l55/production/').replace('-png', '.png');

                    return {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: item.name,
                                images: [newImg],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity,
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled=true`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}