import AsyncStorage from "@react-native-community/async-storage"
import { HookState, createUseHookState } from "../utils/hook-state"

const ApplicationStateKey = '@applicationState'
type valueof<T> = T[keyof T]
interface ApplicationStateData {
  isPassedOnboarding?: boolean
  isRegistered?: 'success' | boolean
  isVerified?: 'success' | boolean
  skipRegistration?: boolean
}
class ApplicationState extends HookState {
  data: ApplicationStateData
  constructor() {
    super('ApplicationState')
  }
  async load() {
    const appStateString = await AsyncStorage.getItem(ApplicationStateKey)
    if (appStateString) {
      const appState = JSON.parse(appStateString)
      this.data = appState
    } else {
      this.data = {
        isPassedOnboarding: false,
        isRegistered: false,
        skipRegistration: false
      }
    }
  }
  save() {
    super.save()
    return AsyncStorage.setItem(ApplicationStateKey, JSON.stringify(this.data))
  }
  setData(key: keyof ApplicationStateData, value: valueof<ApplicationStateData>) {
    this.data[key] = value
    return this.save()
  }
  getData(key: keyof ApplicationStateData) {
    return this.data[key]
  }
}

export const applicationState = new ApplicationState()
export const useApplicationState = createUseHookState<ApplicationStateData>(applicationState)