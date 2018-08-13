import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Button, Segment, Divider } from 'semantic-ui-react'

export default ({
  handleCheckout,
  totalPrice: { amountInCents, formatted, currency },
}) => (
  <div>
    <Divider />
    <Segment clearing size="large">
      <strong>Summe:</strong> {formatted}
      <StripeCheckout
        name="Imkerei Hoffmann Shop"
        amount={amountInCents} // cents
        locale="de"
        currency={currency || 'EUR'}
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY || ''}
        shippingAddress
        billingAddress
        zipCode
        token={handleCheckout}
        reconfigureOnUpdate={false}
        triggerEvent="onClick"
      >
        <Button color="black" floated="right" disabled={amountInCents === 0}>
          Zur Kasse
        </Button>
      </StripeCheckout>
    </Segment>
  </div>
)
