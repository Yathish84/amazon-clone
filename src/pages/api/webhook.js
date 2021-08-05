import { buffer } from "micro"
import * as admin from "firebase-admin"


// secure connection to firebase backend
const serviceaccount = require('../../../permissions.json');

                        // bcoz of optional chaining used if if true
const app = !admin.apps.length ? admin.initializeApp({    
    credential:admin.credential.cert(serviceaccount)
})
:admin.app();          //  here : else part is used

// establish connection to stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//end point secrets 
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillorder = async (session)=>{
    console.log('fullfill order',session)
    return app
    .firestore()
    .collection('users').doc(session.metadata.email)
    .collection('orders').doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping:session.total_details.amount_shipping / 100,
        images:JSON.parse(session.metadata.images),
        timestamp:admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() =>{
        console.log(`success: Order ${session.id} is added to db`)
    })
}

export default async (req,res)=>{
    if(req.method==="POST"){
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig =req.headers["stripe-signature"];
        let event;
        // verify that the event is from stripe
        try{
            event=stripe.webhooks.constructEvent(payload,sig,endpointSecret)
        }catch(err){
           return res.status(400).send(`Wehook error ${err.message}`);
        }

    //   handle the checkout.session.completed event
    if(event.type ==='checkout.session.completed'){
        const session = event.data.object;
       console.log(session);
        // full fill the order in data base
        return fullfillorder(session).then(() =>res.status(200))
        .catch((err) =>res.status(400).send(`webhook errr ${err.message}`))
    }  
}   
}

export const config ={
    api:{
        bodyParser:false,
        externalResolver:true
    }
}
