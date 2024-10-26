export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // Здесь логика аутентификации
  console.log({ email, password });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
