import express from "express";
import cors from "cors";
import uploadTLCLibrary from "./routes/uploadTLCLibrary.js";
import uploadTLCUser from './routes/uploadTLCUsers.js'
import exportTable from './routes/exportTable.js'
import sampleTable from './routes/sampleTable.js'

const app = express();
app.use(express.json());
app.use(cors());




app.use("/api/uploadLibrary2",uploadTLCLibrary);
app.use('/api/uploadUser', uploadTLCUser)
app.use('/api/result/',exportTable)
app.use('/api/sampleTable/',sampleTable)

app.listen(5000, () => {
  console.log(`Connected to the backend on port http://localhost:${5000}`);
});
