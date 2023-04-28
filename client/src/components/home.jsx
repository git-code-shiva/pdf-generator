import React, { useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(null);
  const [school, setSchool] = useState("");
  const [cls, setCls] = useState("");
  const [roll, setRoll] = useState(null);
  const [address, setAddress] = useState("");
  const [showForm, setShowForm] = useState(true);
//   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8081/api/saveData", {
        name,
        phone,
        school,
        cls,
        roll,
        address,
      })
      .then((res) => console.log(res.data))
      setShowForm(false)
      .catch((err) => console.log(err));

    //   navigate("/admitCard")

  };

  const handleDownload=async()=>{
    await axios.get(`http://localhost:8081/api/getData/${roll}`,{responseType:"blob"}).then(res=>{
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download','admit_card.pdf');
        document.body.appendChild(link);
        link.click();
    }).catch(err=>console.log(err));
}
  
  return (
    <>
      <div className="main_container">
        {showForm?(
            <div className="form_container">
            <h1>Enter Details</h1>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Phone:</label>
              <input
                type="text"
                placeholder="Enter Phone"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>School:</label>
              <input
                type="text"
                placeholder="Enter School"
                name="school"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
              <label>Class:</label>
              <input
                type="text"
                placeholder="Enter Class"
                name="cls"
                required
                value={cls}
                onChange={(e) => setCls(e.target.value)}
              />
              <label>Roll Number:</label>
              <input
                type="text"
                placeholder="Enter Roll Number"
                name="roll"
                required
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
              <label>Address:</label>
              <input
                type="text"
                placeholder="Enter Address"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
            </div>
        ):(
                <div className="admit_card_container">
                    <h1>Admit Card</h1>
                    <span className="card_label">Name:</span><span className="card_data">{name}</span><br/>
                    <span className="card_label">Phone:</span><span className="card_data">{phone}</span><br/>
                    <span className="card_label">School:</span><span className="card_data">{school}</span><br/>
                    <span className="card_label">Class:</span><span className="card_data">{cls}</span><br/>
                    <span className="card_label">Roll Number:</span><span className="card_data">{roll}</span><br/>
                    <span className="card_label">Address:</span><span className="card_data">{address}</span><br/>
                    <button className="btn" onClick={handleDownload}>Download</button>
                </div>
            )}
      </div>
    </>
  );
};
export default Home;
