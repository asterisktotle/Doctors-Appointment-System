import {z} from 'zod'
import 'dotenv/config'


const envSchema = z.object({
    
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    
    PORT: z.coerce.number()
    .min(1000, { message: 'PORT must be >= 1000' })
    .default(5000),

    ALLOWED_ORIGINS:z.string().transform(val => val.split(',')),

    //Database
    MONGODB_URI: z.string().url({
        message: 'MONGO_URI mus be valid URL'
    })

    /// ADD JWT
})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;