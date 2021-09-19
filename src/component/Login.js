import React from "react";
import {FaThumbsUp, FaThumbsDown} from "react-icons/fa";
import Modal from "react-modal";
import "./login.css";

Modal.setAppElement("#root");

function Login(){
    let [inputName,setInputName] = React.useState("");
    let [inputPass, setInputPass] = React.useState("")
    let [nameDisplay,setNameDisplay] = React.useState("invalid");
    let [passUpper, setPassUpper] = React.useState("invalid");
    let [passLower, setPassLower] = React.useState("invalid");
    let [passNumber, setPassNumber] = React.useState("invalid");
    let [passChar, setPassChar] = React.useState("invalid");
    let [passLength, setPassLength] = React.useState("invalid");
    let [namBox , setNamBox] = React.useState("");
    let [passBox, setPassBox] = React.useState("");
    let [passType, setPassType] = React.useState(true);
    let [modalOpen , setModalOpen] = React.useState({
        successModal : false,
        errorModal : false
    });
    
    // let [passDisplay,setPassDisplay] = React.useState({
    //     upper:"invalid",
    //     lower:"invalid",
    //     number:"invalid",
    //     splChar:"invalid",
    //     length : "invalid"
    // });

    function reSet(){
        setInputName("");
        setInputPass("");
        setNameDisplay("invalid");
        setPassUpper("invalid");
        setPassLower("invalid");
        setPassNumber("invalid");
        setPassChar("invalid");
        setPassLength("invalid");
        setNamBox("");
        setPassBox("");
        setModalOpen({...modalOpen,
            successModal : false,
            errorModal:false
        });
    }

    function handelName(e){

        setInputName(inputName = e.target.value);
        //(/[\w.]+/g).test(input.name) && input.name.length > 0 ? setNameDisplay(nameDisplay="namValid") : setNameDisplay(nameDisplay="namInvalid");   
        if((/^[a-zA-Z0-9_.]+$/g).test(inputName))  {
            setNameDisplay(nameDisplay="valid");
        }
        else{
            setNameDisplay(nameDisplay="invalid");
        }
    }
    function handelPassword(e){
        setInputPass(inputPass = e.target.value);
        if(/[A-Z]/g.test(inputPass)){
            setPassUpper("valid");
            //console.log("upper->",passUpper);
        }else{
            setPassUpper("invalid");
            //console.log("upper->",passUpper);
        }
        
        if(/[a-z]/g.test(inputPass)){
            setPassLower("valid");
            //console.log("lower->",passLower);
        }else{
            setPassLower("invalid");
            //console.log("lower->",passLower);
        }
        
        /[0-9]/g.test(inputPass) ? setPassNumber("valid") : setPassNumber("invalid");
        
        /[_.@$!&#*-+=%^;:'~/]/g.test(inputPass) ? setPassChar("valid") : setPassChar("invalid");

        inputPass.length >= 7 ? setPassLength("valid") : setPassLength("invalid" );
    }

    function handelBox(e){
        if(e.target.id === "username"){
            if(inputName.length == 0){
                setNamBox("");
            }
            else if(nameDisplay === "valid"){
                setNamBox(namBox = "success");
            }
            else if(nameDisplay === "invalid"){
                setNamBox(namBox = "error");
            }
        }
        else if(e.target.id === "password"){
            if(inputPass.length == 0){
                setPassBox(passBox = "");
            }
            else if(passLower === "valid" && passUpper === "valid" && passNumber === "valid" && passChar === "valid" && passLength === "valid"){
                setPassBox(passBox = "success");
                //console.log("yes");
            }
            else{
                setPassBox(passBox = "error");
            }
        }
       
        
    }

    function handelSubmit(){
      if(nameDisplay == "valid" && passLower === "valid" && passUpper === "valid" && passNumber === "valid" && passChar === "valid" && passLength === "valid"){
            setModalOpen({...modalOpen,
                successModal : true,
                errorModal:false
            });
        }
        else{
            setModalOpen({...modalOpen,
                successModal : false,
                errorModal:true
            });
        }
    }

    function handelBack(){
        setModalOpen({...modalOpen,
            successModal : false,
            errorModal:false
        });
    }
   
    function showError(e){
        e.preventDefault();
        setModalOpen({...modalOpen,
            successModal : false,
            errorModal:true
        });
    }

    

    return <div className="form-box">
        <h1 id= "header" >Login Page</h1>
        <form className="log-form" onSubmit = {(e)=>e.preventDefault()}>
            <label>
                Username :
                <br/>
                <input type="text" className={namBox} id="username" value={inputName} onChange={(e)=>{handelName(e); handelBox(e)}} required/>
                {namBox ? namBox === "success" ? <button title="Strong UserName" style={{backgroundColor:"transparent",border:"none"}}><FaThumbsUp color="green"/></button > : <button title="Click Here To Know More" style={{backgroundColor:"transparent",border:"none",cursor:"pointer"}} onClick={showError}><FaThumbsDown color="red"/></button> : null}
            </label>
            <br/>
            
            <label>
                Password :
                <br/>
                <input type={passType ? "password" : "text"} className={passBox} id="password" value={inputPass} onChange={(e)=>{handelPassword(e); handelBox(e)}} required />
                {passBox ? passBox === "success" ? <button  title="Strong Password" style={{backgroundColor:"transparent",border:"none"}}><FaThumbsUp color="green"/></button> : <button title="Click Here To Know More" style={{backgroundColor:"transparent",border:"none",cursor:"pointer"}} onClick={showError}><FaThumbsDown color="red"/></button> : null}
             </label>
             
              <br/><input type="checkbox" onChange={()=>setPassType(!passType)}style={{width:"auto", marginBottom:"20px"}}/><span style={{fontSize:"10px",verticalAlign:"20%"}}> Show Password </span>     
            
            <br/>
           
            <div style = {{textAlign:"center"}}><button className = "btn" onClick = {()=>{
                if(inputName.length > 0 && inputPass.length > 0){
                    handelSubmit();
                    }}
                }>Submit
            </button></div>
        </form>

        <Modal isOpen={modalOpen.errorModal} 
                onRequestClose={()=>setModalOpen({...modalOpen,
                    successModal : false,
                    errorModal:false
                })}
             style={
                {
                    overlay : {
                        backgroundColor:"grey"
                    },
                    content:{
                        
                        paddingTop : "100px",
                        border:"10px solid red",
                        backgroundColor:"#ffebe6",
                        width : "350px",
                        marginLeft: "auto",
                        marginRight:"auto",
                        
                    }
                }
            }
        >
        <div className="modal-box">
            <h3 style={{textAlign:"start"}}>User Name should only have : </h3>
            <div className="error-box" ><p id="unam" className ={nameDisplay}><b>alpha-numeric or "_" or "."</b> characters</p></div>
            

            <h3 style={{textAlign:"start"}}>Password must contain the following:</h3>
            <div className="error-box">
                <p id="letter" className={passLower}>A <b>lowercase</b> letter</p>
                <p id="capital" className={passUpper}>A <b>capital (uppercase)</b> letter</p>
                <p id="number" className={passNumber}>A <b>number</b></p>
                <p id="splChar" className={passChar}>A <b>Spechial Character</b> character</p>
                <p id="length" className={passLength}>Minimum <b>8 characters</b></p>
            </div>
        </div>
        <div style={{textAlign:"center"}}><button style={{cursor:"pointer",borderRadius:"10px",backgroundColor:"#00ffff",fontWeight:"700"}} onClick ={handelBack}> Back </button></div>
        </Modal>

        <Modal isOpen={modalOpen.successModal} 
            onRequestClose={()=>setModalOpen({...modalOpen,
                successModal : false,
                errorModal:false
            })}
            style={
                {
                    overlay : {
                        backgroundColor:"grey"
                    },
                    content:{
                        textAlign:"center",
                        paddingTop : "100px",
                        border:"10px solid green",
                        backgroundColor:"#f2ffe6",
                        width : "300px",
                        marginLeft: "auto",
                        marginRight:"auto",
                        height: "300px"
                    }
                }
            }
        >
            <div className="success-box">
                <h1>Congratulation......</h1>
                <h4>You have successfully Loged in</h4>
                <button style={{cursor:"pointer",borderRadius:"10px",backgroundColor:"#00ffff",fontWeight:"700"}} onClick ={reSet}> Log Out </button>
            </div>
        </Modal>
    </div>
}

export default Login;