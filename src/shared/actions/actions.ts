/* eslint-disable no-promise-executor-return */

'use server';

import { simulateLoginRequest } from '../endpoints/test';

export async function handleLogin(formData: FormData): Promise<void> {
  const email = formData.get('email');
  const password = formData.get('password');
  const remember = formData.get('remember');

  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Remember:', remember);

  if (!email || !password) {
    throw new Error('Missing email or password');
  }

  await simulateLoginRequest(email, password);
}
