# Connecting Mindbody booking to the site

This branch (`mindbody-integration`) has the booking section scaffolded and
ready, but inert, until the studio has a live Mindbody account. Nothing here
affects the live site until it's merged.

## What to do in Mindbody

1. Sign up for **Mindbody Starter** (or confirm the account is active).
2. Note your **Site ID** — assigned when your Mindbody account is set up.
3. In the Mindbody Business dashboard, go to **Marketing → Branded Web**.
4. Create a **Schedule** widget (shows classes and lets clients book).
5. Open the widget, scroll to **"Deploy Your Widget"**, and copy the widget
   code. It'll look like:

   ```html
   <script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script>
   <healcode-widget
     data-type="schedules"
     data-widget-partner="object"
     data-widget-id="XXXXXXXXXX"
     data-widget-version="0">
   </healcode-widget>
   ```

   The `data-widget-id` value is the only part that's unique to the studio.

6. Optional: in the widget's style settings, set the accent color to
   `#C1863F` (amber gold) so it roughly matches the site instead of
   Mindbody's default blue.

## What to send back

Just the `data-widget-id` value (and the full snippet if it looks different
from the example above — Mindbody's widget format has changed before).

## What happens on the code side once we have it

1. Uncomment the `healcode.js` `<script>` tag in `index.html`'s `<head>`.
2. Uncomment the `<healcode-widget>` block in the booking section and
   replace `YOUR_WIDGET_ID` with the real ID.
3. Decide whether to keep the "Booking Opens Soon" copy/buttons above the
   widget as a fallback, or remove them now that booking is live.
4. Test locally, then merge this branch into the live branch to publish.
