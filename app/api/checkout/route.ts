import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';

import { stripe } from "@/lib/stripe";
import {db} from "@/lib/db";
import { User } from "@prisma/client";

export async function POST(
  req: Request,
){
  const { userId } = auth()

  const {productIds} = await req.json();

  if(!productIds || productIds.length === 0){
    return new NextResponse("PRoduct ids are required", { status: 400})
  }

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  const user = await db.user.findFirst({
    where: {
      userId,
    }
  }) as User
  // console.log("kkkkkkkkkkkkk", UserAdmin)

  // if (UserAdmin?.role !== "ADMIN"){
  //   return new NextResponse("Unauthorized", { status: 405 });
  // }


  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  })

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price: product.priceId!.toString(),
      // we can use this method if we have not add the stripeId and priceId 
      // when created the product
      // price_data: {
      //   currency: "USD",
      //   product_data: {
      //     name: product.name
      //   },
      //   unit_amount: product.price * 100,
      //   // unit_amount: product.price.toNumber() * 100, // Convert to the nearest cent.
      // }
    })
  })

  line_items.push({
    price: "price_1OOkKSHYPeXn9RHVUMTzc8nS",
    quantity: 1,
    adjustable_quantity: {
      enabled: false,
    }
  })

  const order = await db.order.create({
    data: {
      isPaid: false,
      userId: user?.id,
      orderItems: {
        create : productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  })


  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.REACT_APP_CURRENT_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.REACT_APP_CURRENT_URL}/cart`,
    payment_method_types: ["card", "paypal"],
    mode: "payment",
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    metadata: {
      userId: user!.id,
      orderId: order.id
    },
    line_items,
  })

  return NextResponse.json({url: session.url})
  // console.log("AAAAAAAAAA", productIds)
}


export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const queryOrderId = searchParams.get('orderId');

    if (!queryOrderId) {
      return new NextResponse("queryOrderId is required", { status: 400 });
    }

    console.log("::::::::::", queryOrderId)

    const pollOrderStatus = await db.order.findUnique({
      where: {
        id: queryOrderId
      }
    })

    return NextResponse.json(pollOrderStatus?.isPaid);
  } catch(err) {
    console.log("[PAYMENT_ROUTES]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

