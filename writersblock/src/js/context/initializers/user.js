import type { ContextInitializerUserType } from '../../../flow/context/InitializersType'

import { WRITERS_BLOCK_VERSION } from '../../utils/blockstack'

const userContextDefault: ContextInitializerUserType = {
    semver: {
      mostRecentAcknowledgedVersion: WRITERS_BLOCK_VERSION,
      changelog: []
    },
    settings: {
      pseudonym: '',
      publish: 'private',
      pageview: 'default'
    },
    integrations: {}
}
export default userContextDefault