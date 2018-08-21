# Tip calculator - native

This is a small react-native project building upon an application I built while on vacation. Take a look at the repo for the [original project](https://github.com/frebliklo/lazytourist-backend). The projects now also have their own backend which you can find [here](https://github.com/frebliklo/tip-calculator).

Also remember to check out the app on [Google Play](https://play.google.com/store/apps/details?id=com.frebliklo.tipcalc)! If you want the app on iOS then please MobilePay me for an Apple developer license or have patience until I accuire one myself.

## Currency

The app currently converts USD to DKK. On load the app checks for internet connection and then checks the [APIs USD endpoint](http://api.lazytourist.xyz/currencies/usd) to fetch the lates exchange rate.

## Distribution

Since the app runs on expo they handle the heavy-lifting when building. The only thing one needs to build is the expo cli. Prior to building the latest changes must be published.

```bash
exp publish
exp build:android
```
