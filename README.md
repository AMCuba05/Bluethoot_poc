## Up in local

- Install package manager yarn
- `yarn`
- Then run the installation with
- `yarn install`

- `yarn start`
- `yarn ios` running on iOS simulator
- `yarn android` running on Android emulator

### iOS
- For Apple Silicon, might be necessary to use `arch -x86_64` before `pod install`
- In Podfile, disable `use_flipper`
- To install pods
- `cd ios && pod install --repo-update && cd ..`
