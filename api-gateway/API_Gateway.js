import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app=express();
const PORT=8000;
app.use(cors());
app.use('/api/users',createProxyMiddleware({
    target: 'http://localhost:8001',
    changeOrigin: true,
    pathRewrite:{
        '^/api/users': '',
    },
}));

app.listen(PORT,()=>{
    console.log(`API Gateway running at http://localhost:${PORT}`);
})


