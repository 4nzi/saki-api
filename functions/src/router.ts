import * as admin from 'firebase-admin'
import * as express from 'express'
import { CHARACTER, SCHOOL } from './types'

admin.initializeApp()
const db = admin.firestore()
const router = express.Router()

router.route('/characters').get(async (req, res) => {
  const payload: CHARACTER[] = []
  const { docs } = await db.collection('characters').get()

  docs.forEach((doc) => {
    payload.push({
      id: Number(doc.id),
      name: doc.data().name,
      kana: doc.data().kana,
      school: doc.data().school,
      grade: doc.data().grade,
      role: doc.data().role,
      height: doc.data().height,
      date_of_birth: doc.data().date_of_birth,
    })
  })

  res.json(
    payload.sort((a, b) => {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
  )
})

router.route('/characters/:id').get(async (req, res) => {
  const id = req.params.id
  const doc = await db.collection('characters').doc(id).get()

  const payload: CHARACTER = {
    id: Number(doc.id),
    name: doc.data()!.name,
    kana: doc.data()!.kana,
    school: doc.data()!.school,
    grade: doc.data()!.grade,
    role: doc.data()!.role,
    height: doc.data()!.height,
    date_of_birth: doc.data()!.date_of_birth,
  }

  res.json(payload)
})

router.route('/schools').get(async (req, res) => {
  const payload: SCHOOL[] = []
  const { docs } = await db.collection('schools').get()

  for (const doc of docs) {
    const school: SCHOOL = {
      id: Number(doc.id),
      name: doc.data().name,
      location: doc.data().location,
      sempo: '',
      jiho: '',
      chuken: '',
      fukusho: '',
      taisho: '',
    }

    const players = await db
      .collection('characters')
      .where('school', '==', doc.data().name)
      .select('name', 'role')
      .get()

    players.docs.forEach((doc) => {
      if (doc.data().role === '先鋒') {
        school.sempo = doc.data().name
      } else if (doc.data().role === '次鋒') {
        school.jiho = doc.data().name
      } else if (doc.data().role === '中堅') {
        school.chuken = doc.data().name
      } else if (doc.data().role === '副将') {
        school.fukusho = doc.data().name
      } else if (doc.data().role === '大将') {
        school.taisho = doc.data().name
      } else console.log('erro')
    })
    payload.push(school)
  }

  res.json(payload)
})

router.route('/schools/:id').get(async (req, res) => {
  const id = req.params.id
  const doc = await db.collection('schools').doc(id).get()

  const payload: SCHOOL = {
    id: Number(doc.id),
    name: doc.data()!.name,
    location: doc.data()!.location,
    sempo: '',
    jiho: '',
    chuken: '',
    fukusho: '',
    taisho: '',
  }

  const players = await db
    .collection('characters')
    .where('school', '==', doc.data()!.name)
    .select('name', 'role')
    .get()

  players.docs.forEach((doc) => {
    if (doc.data().role === '先鋒') {
      payload.sempo = doc.data().name
    } else if (doc.data().role === '次鋒') {
      payload.jiho = doc.data().name
    } else if (doc.data().role === '中堅') {
      payload.chuken = doc.data().name
    } else if (doc.data().role === '副将') {
      payload.fukusho = doc.data().name
    } else if (doc.data().role === '大将') {
      payload.taisho = doc.data().name
    } else console.log('erro')
  })

  res.json(payload)
})

export default router
