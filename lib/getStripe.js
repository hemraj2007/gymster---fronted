import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        // stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
        stripePromise = loadStripe("pk_test_51RE1roFbfkPbk0wGQFLS8RfUHcASng6TeXTQyX9UfwVjlHUPkMWtb3KjsaNlIesCxmNlMQ2fofJ5s88EPmBvNjIO00iZ1InPrh");
    }

    return stripePromise;
}

export default getStripe;