import type {TimeInteractionActionPropsType} from '../../../flow/context/ActionsType'

export default (props:TimeInteractionActionPropsType) =>
{
  const { hasStartedBoolean,
          isActiveBooleans,
          isActiveCallback,
          isNotActiveCallback,
          ms } = props,
          activeSet = [...new Set(isActiveBooleans)],
          ext = props.extended || {}
  console.log('activeSet',activeSet)
  
  let interval = null,
        isActive = activeSet.length === 1 && activeSet[0] === true
    if (isActive)
    {
      interval = setInterval(() => 
      {
        console.log('starting interval',interval)
        interval && isActiveCallback(interval)
      }, ms)
    }
    else if (!isActive && hasStartedBoolean)
    {
      console.log('clearing interval',interval)
      clearInterval(interval)
      isNotActiveCallback()
    }
}