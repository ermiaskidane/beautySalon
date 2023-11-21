import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
 
export const initialProfile = async () => {
  
  const user = await currentUser();


  if (!user) {
    return redirectToSignIn();
  }

  const userProfile = await db.user.findUnique({
    where: {
      userId: user.id
    }
  });

  if (userProfile) {
    return userProfile;
  }

  const newProfile = await db.user.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return newProfile;
};
