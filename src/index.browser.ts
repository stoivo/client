import envMiddleware from './http/browserMiddleware'
import {defineHttpRequest} from './http/request'
import {SanityClient} from './SanityClient'
import type {ClientConfig} from './types'
import {printNoDefaultExport} from './warnings'

export * from './data/patch'
export * from './data/transaction'
export {ClientError, ServerError} from './http/errors'
export * from './SanityClient'
export * from './types'

// Set the http client to use for requests, and its environment specific middleware
const httpRequest = defineHttpRequest(envMiddleware, {})
/** @public */
export const requester = httpRequest.defaultRequester

/** @public */
export const createClient = (config: ClientConfig) =>
  new SanityClient(
    defineHttpRequest(envMiddleware, {
      maxRetries: config.maxRetries,
      retryDelay: config.retryDelay,
    }),
    config
  )

/**
 * @public
 * @deprecated Use the named export `createClient` instead of the `default` export
 */
export default function deprecatedCreateClient(config: ClientConfig) {
  printNoDefaultExport()
  return new SanityClient(httpRequest, config)
}

/** @alpha */
export {adapter as unstable__adapter, environment as unstable__environment} from 'get-it'
