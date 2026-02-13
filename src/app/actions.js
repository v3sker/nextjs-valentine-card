'use server'

export async function submitDateDetails(formData) {
  const hour = formData.get('hour');
  const address = formData.get('address');

  console.log('=== Valentine Date Details ===');
  console.log('Hour:', hour);
  console.log('Address:', address);
  console.log('=============================');

  return { success: true };
}
