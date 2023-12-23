import {db} from '@/lib/db'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs';
import { stripe } from '@/lib/stripe';

// // UPDATE A PRODUCT
export const PATCH = async (req: Request, {params}: {params: {productId: string}}) => {
  try {
  // check if there is user

  
  const {userId} = auth()

  console.log("WWWWWWWWWWWWWW", userId)
 
  const body = await req.json();

  // const body = await req.json();
  // console.log('Request Body:', body);

  const {name, description, price,} = body

  console.log("HFDGBFDBf productId", body)

  
  if(!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  if(!name) {
    return new NextResponse("name is required", { status: 400 });
  }

  if(!description) {
    return new NextResponse("description is required", { status: 400 });
  }

  if(!price) {
    return new NextResponse("price is required", { status: 400 });
  }

  if(!params.productId) {
    return new NextResponse("product id is required", { status: 400 });
  }

  // if(!imageUrl) {
  //   return new NextResponse("imageUrl is required", { status: 400 });
  // }
  const user = await db.user.findFirst({
    where: {
      userId
    }
  });

  // Handle the possibility that user?.email is undefined
  // const userEmail = user?.email || "default@example.com";

  console.log("***************", user)

  if(user?.role !== "ADMIN") {
    return new NextResponse("userEmail can not be null", { status: 400 });
  }

  const product = await db.product.update({
    where: {
      id: params.productId
    },
    data: {
      name,
      description,
      price,
    }
  })

  console.log("FFFFFFFFF", product)

  // note: to change the price on stripe either we have to use
  // create method or manully chnage it in the stripe product category
  const updateStripeProduct = await stripe.products.update(product.stripeId!, {
    name: product.name,
    default_price: product.priceId!,
  })

  // const productOnStripe = await stripe.products.create({
  //   name,
  //   default_price_data: {
  //     currency: 'USD',
  //     unit_amount: Math.round(price * 100),
  //   }
  // })

  // for update use 
  // const updatedProduct =
  //           await stripe.products.update(data.stripeId!, {
  //             name: data.name,
  //             default_price: data.priceId!,
  //           })

  //         const updated: Product = {
  //           ...data,
  //           stripeId: updatedProduct.id,
  //           priceId: updatedProduct.default_price as string,
  //         }

  // console.log("productOnStripe", productOnStripe.id, productOnStripe.default_price as string)
  
  // const product = await db.product.create({
  //   data: {
  //     name,
  //     price,
  //     description,
  //     image: imageUrl,
  //     stripeId: productOnStripe.id, 
  //     priceId: productOnStripe.default_price as string
  //   }
  // })

  // console.log("product", product)
  //   return NextResponse.json(product);

  } catch (err) {
    console.log('[COMMENT_POST]', err)
    return new NextResponse("Internal Error", {status: 500})
  }
}