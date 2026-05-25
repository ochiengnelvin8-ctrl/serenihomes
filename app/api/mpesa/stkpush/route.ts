import { NextResponse } from "next/server"
import { getMpesaAccessToken } from "@/lib/mpesa"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const { phone, amount } = body

    const token = await getMpesaAccessToken()

    const timestamp =
      new Date()
        .toISOString()
        .replace(/[-:.TZ]/g, "")
        .slice(0, 14)

    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64")

    const response = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          BusinessShortCode:
            process.env.MPESA_SHORTCODE,

          Password: password,

          Timestamp: timestamp,

          TransactionType:
            "CustomerPayBillOnline",

          Amount: amount,

          PartyA: phone,

          PartyB:
            process.env.MPESA_SHORTCODE,

          PhoneNumber: phone,

          CallBackURL:
            process.env.MPESA_CALLBACK_URL,

          AccountReference:
            "Sereni Homes",

          TransactionDesc:
            "Membership Payment",
        }),
      }
    )

    const data = await response.json()

    return NextResponse.json(data)

  } catch (error) {

    return NextResponse.json(
      {
        error: "STK Push Failed",
      },
      {
        status: 500,
      }
    )
  }
}