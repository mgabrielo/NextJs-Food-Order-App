
export async function POST(req) {
  const data = await req.formData()
  // console.log(data)
  if (data.get('files')) {
    console.log(data.get('files '))
  }
  return Response.json(true);
}
