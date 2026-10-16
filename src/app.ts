import express from 'express';
import cors from 'cors';
import taskRouter from './routes/task.routes'

const app = express();
app.use(cors());


app.use(express.json());
app.use("/api/tasks", taskRouter)

app.listen(3000, () => {
    console.log(`server running on http://localhost:3000`)
})