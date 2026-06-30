import MemoPost from "./components/memo/Post";
import MemoList from "./components/memo/List";
import Exception from "./components/Exception";
import FileUpload from "./components/updownload/Upload";
import FileList from "./components/updownload/List";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to="/memo/post">MEMO POST</Link><br/>
          <Link to="/memo/list">MEMO LIST(EXCEPTION TEST)</Link><br/>
          <Link to="/file/upload">FILE UPLOAD</Link><br/>
          <Link to="/file/list">FILE LIST</Link><br/>
          <hr/>
        </div>
        <Routes>
          {/* Route 설정 */}
          <Route path="/memo/post" element={<MemoPost/>}/>
          <Route path="/memo/list" element={<MemoList/>}/>
          <Route path="/exception" element={<Exception/>}/>
          <Route path="/file/upload" element={<FileUpload/>}/>
          <Route path="/file/list" element={<FileList/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
