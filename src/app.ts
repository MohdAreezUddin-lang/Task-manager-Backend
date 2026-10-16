import express from 'express';
import cors from 'cors';
import taskRouter from './routes/task.routes'

const app = express();
// Cors is important for forming an connection between frontend and backend
app.use(cors());


app.use(express.json());
app.use("/api/tasks", taskRouter)

app.listen(3000, () => {
    console.log(`server running on http://localhost:3000`)
})