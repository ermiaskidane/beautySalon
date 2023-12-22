import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = auth();

  // console.log("sZZZZZZZZZZZZZZ", userId)

  if (!userId) {
    return null;
  }

  const useProfile = await db.user.findUnique({
    where: {
      userId
    }
  });

  // console.log("DDDDDDDDDDDDDDDDDDDDDDDDDD", useProfile)

  return useProfile;
}