import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import uniqid from 'uniqid'

export async function POST(req) {
  const data = await req.formData()
  // console.log(data)
  const file = data.get('files')
  const s3Client = new S3Client({
    region: 'eu-west-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY
    }
  })
  const ext = file.name.split('.').slice(-1)[0]
  const fileName = uniqid() + '.' + ext
  // console.log(fileName)
  const chunks = []
  for await (const chunk of file.stream()) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)
  const bucket = 'nextjs-food-order'
  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      ACL: 'public-read',
      ContentType: file.type,
      Body: buffer
    }))
    const link = 'https://' + bucket + '.s3.amazonaws.com/' + fileName
    return new Response(link, { status: 200 });
  } catch (error) {
    console.log(error)
  }
}
