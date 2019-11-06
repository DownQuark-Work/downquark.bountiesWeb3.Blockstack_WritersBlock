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
  
  let interval = null,
        isActive = activeSet.length === 1 && activeSet[0] === true
    if (isActive)
    {
      interval = setInterval(() => 
      {
        interval && isActiveCallback(interval)
      }, ms)
    }
    else if (!isActive && hasStartedBoolean)
    {
      clearInterval(interval)
      isNotActiveCallback()
    }
}