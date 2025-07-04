import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3, {message: "Name must be at least 3 characters."}).max(32, 
        {message: "Name must be less than 32 characters."}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters."}).max(32, 
        {message: "Password may not exceed 32 characters."})
});

export default schema;