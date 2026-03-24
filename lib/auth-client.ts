import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient();

await authClient.signIn.email({
    email: 'test@user.com',
    password: 'password1234',
});

export const { signIn, signUp, signOut, useSession } = createAuthClient();
