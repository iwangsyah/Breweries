# Breweries List App

### Run project in development

1. Clone the repo
   ```sh
   git clone https://github.com/iwangsyah/Breweries.git
   ```
2. Install dependencies
   ```sh
   npm install
   ```
   or
   
   ```sh
   yarn install
   ```
3. Install Podfile for iOS
   ```sh
   npx pod-install
   ```
    or
  
   ```sh
   cd ios && pod install
   ```
4. Start the app
  - Run on Android: `npx react-native run-android` (or `yarn android`)  (or `npm run android`).

  - Run on iOS: `npx react-native run-android` (or `yarn ios`) (or `npm run ios`).


# Generating the APK
Run the following in a terminal:

```
$ cd android
$ ./gradlew assembleRelease
```

The generated APK can be found under:
```
android/app/build/outputs/apk/release/app-release.apk
```
