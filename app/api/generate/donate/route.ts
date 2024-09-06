import dbConnect from '@/db/dbConnect'
import DonateBlink from '@/db/models/DonateBlink'
import console, { Console } from 'console'

export const POST = async (req: Request) => {
  try {
    // {
    //   blinkId: 2,
    //   title: 'Donate Me',
    //   description: 'Donation for me',
    //   label: 'Donate SOL',
    //   icon: 'https://i.seadn.io/gae/ulTNkL1s8SxAEkwH4pxkHxMYh2r5HJeBRcURychonbbelmY7Yg1mFkJUS_toAPVTTBGqDtuc1dq5ZwsJv9fUQ0h12f5M919x10wmaUU?auto=format&dpr=1&w=1000',
    //   toPubKey: '2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW',
    //   actions: [
    //     {
    //       label: 'Donate 0.2 SOL',
    //       href: 'http://localhost:3000/api/actions/donate?id=2&to=2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW&amount=0.2'
    //     },
    //     {
    //       label: 'Donate 0.5 SOL',
    //       href: 'http://localhost:3000/api/actions/donate?id=2&to=2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW&amount=0.5'
    //     },
    //     {
    //       label: 'Donate SOL',
    //       href: 'http://localhost:3000/api/actions/donate?id=2&to=2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW&amount={amount}',
    //       parameters: [
    //         {
    //           name: 'amount',
    //           label: 'Enter the SOL',
    //           required: true
    //         }
    //       ]
    //     }
    //   ]
    // },
    const reqUrl = new URL(req.url)
    const baseUrl = reqUrl.origin

    const body = await req.json()
    const { blinkId, title, description, icon, label, toPubKey } = body

    const actions = body.actions.map((action: any) => {
      if (action.parameters) {
        const parameters = action.parameters.map((parameter: any) => {
          return {
            name: parameter.name,
            label: parameter.label,
            required: parameter.required
          }
        })
        return {
          label: `Donate SOL`,
          href: `${baseUrl}/api/actions/donate?id=${blinkId}&to=${toPubKey}&amount={amount}`,
          parameters
        }
      }
      return {
        label: `Donate ${action.amount} SOL`,
        href: `${baseUrl}/api/actions/donate?id=${blinkId}&to=${toPubKey}&amount=${action.amount}`
      }
    })

    const payload = {
      blinkId,
      title,
      description,
      label: 'Donate SOL',
      icon,
      toPubKey,
      actions
    }

    await dbConnect()

    const donateBlink = new DonateBlink(payload)
    await donateBlink.save()
    console.log('DONATE BLINK created', donateBlink)

    const blink = `${baseUrl}/donate?id=${blinkId}`
    const xBlink = `${baseUrl}/api/actions/donate?id=${blinkId}`

    return Response.json({ message: 'success', blink, xBlink })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
