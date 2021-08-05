const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async(req,res)=>{
    const {items , email} = req.body;
    const transformedItems = items.map(items =>({
        description:items.description,
        quantity:1,
        price_data :{
            currency : 'inr',
            unit_amount : items.price*100,
            product_data :{
                name:items.title,
                images:[items.image]
            },

        }
    }))
    const session =await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        shipping_rates:['shr_1J4VD2SHp55AjiON445WTl6W'],
        shipping_address_collection:{
            allowed_countries:["IN","GB","US"]
        },
        line_items:transformedItems,
        mode:'payment',
        success_url:`${process.env.HOST}/success`,
        cancel_url:`${process.env.HOST}/checkout`,
        metadata:{
            email,
            images:JSON.stringify(items.map(item=>item.image))
        },
    });
    res.status(200).json({id:session.id})
}