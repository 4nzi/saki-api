import * as functions from 'firebase-functions'
import * as express from 'express'

const app = express()

export const api = functions.https.onRequest(app)
