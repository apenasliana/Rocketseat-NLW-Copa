import Fastify from "fastify";
import cors from "@fastify/cors"
import {PrismaClient} from '@prisma/client'
import {z} from 'zod'
import ShortUniqueId from "short-unique-id";


const prisma = new PrismaClient({
  log: ['query'],
})










async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })  

  await fastify.register(cors, {
    origin: true,
  })

  //http://127.0.0.1:3333
  //http://localhost:3333


  fastify.get('/pools/count', async () => {
    const pools = await prisma.pool.count()
    return {pools}
  })


  fastify.get('/user/count', async () => {
    const pools = await prisma.pool.count()
    return {pools}
  })

  fastify.get('/guesses/count', async () => {
    const pools = await prisma.pool.count()
    return {pools}
  })

  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string()
    })
    const {title} = createPoolBody.parse(request.body)

    const generate = new ShortUniqueId({length: 6})
    const code =  String(generate()).toUpperCase()

    await prisma.pool.create({
      data:{
        title,
        code
      }
    })

    return reply.status(201).send({code}) 
  })
  
  






  
  await fastify.listen({port: 3333, host: '0.0.0.0'})
}



bootstrap()