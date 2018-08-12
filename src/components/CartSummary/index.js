import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Button, Segment, Divider } from 'semantic-ui-react'

export default ({ handleCheckout, totalPrice: { amount, formatted, currency } }) => (
  <div>
    <Divider />
    <Segment clearing size="large">
      <strong>Gesamtsumme:</strong> {formatted}
      <StripeCheckout
        name="Imkerei Hoffmann Shop"
        amount={amount}
        currency={currency || 'EUR'}
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY || ''}
        shippingAddress={false}
        billingAddress
        zipCode
        token={handleCheckout}
        reconfigureOnUpdate={false}
        triggerEvent="onClick"
      >
        <Button color="black" floated="right">
          Zur Kasse
        </Button>
      </StripeCheckout>
    </Segment>
  </div>
)
